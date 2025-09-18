import {FunctionAlarms, FunctionAlarmsOptions} from './function-alarms';
import {FunctionDeployment} from './function-deployment';
import {Construct} from 'constructs';
import {DeployedFunctionOptions} from './extended-function';
import {GoFunction, GoFunctionProps} from '@aws-cdk/aws-lambda-go-alpha';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';
import {Architecture, LoggingFormat, Runtime} from 'aws-cdk-lib/aws-lambda';
import {Duration, RemovalPolicy} from 'aws-cdk-lib';
import * as process from 'process';

/**
 * Properties for ExtendedGoFunction.
 */
export interface ExtendedGoFunctionProps
  extends GoFunctionProps,
    FunctionAlarmsOptions,
    DeployedFunctionOptions {}

/**
 * Extended version of the GoFunction that supports alarms and deployments.
 */
export class ExtendedGoFunction extends GoFunction {
  readonly alarms: FunctionAlarms;
  readonly deployment?: FunctionDeployment;

  constructor(scope: Construct, id: string, props: ExtendedGoFunctionProps) {
    let logGroup = props.logGroup;
    if (!logGroup && !props.logRetention) {
      logGroup = new LogGroup(scope, `${id}LogGroup`, {
        retention: RetentionDays.THREE_DAYS,
        removalPolicy: RemovalPolicy.DESTROY,
      });
    }

    super(scope, id, {
      logGroup,
      architecture: Architecture.ARM_64,
      memorySize: 768,
      timeout: Duration.seconds(30),
      runtime: Runtime.PROVIDED_AL2023,
      ...props,
      loggingFormat: props.loggingFormat ?? LoggingFormat.JSON,
      bundling: {
        environment: {
          GOOS: process.env.GOOS || 'linux',
          GOARCH: process.env.GOARCH || 'arm64',
          ...props.environment,
        },
        ...props.bundling,
      },
    });

    this.alarms = new FunctionAlarms(this, 'Alarms', {
      function: this,
      logGroup: this.logGroup,
      ...props,
    });

    if (props.deploymentOptions?.createDeployment ?? true) {
      this.deployment = new FunctionDeployment(this, 'Deployment', {
        ...props.deploymentOptions,
        function: this,
      });
      if (props.deploymentOptions?.includeCriticalAlarms ?? true) {
        this.deployment.addAlarms(...this.alarms.getCriticalAlarms());
      }
      if (props.deploymentOptions?.includeWarningAlarms ?? false) {
        this.deployment.addAlarms(...this.alarms.getWarningAlarms());
      }
    }
  }
}
