import {
  PythonFunction,
  PythonFunctionProps,
} from '@aws-cdk/aws-lambda-python-alpha';
import {FunctionAlarms, FunctionAlarmsOptions} from './function-alarms';
import {DeployedFunctionOptions} from './extended-function';
import {FunctionDeployment} from './function-deployment';
import {Construct} from 'constructs';
import {LoggingFormat} from 'aws-cdk-lib/aws-lambda';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';
import {RemovalPolicy} from 'aws-cdk-lib';
import {FunctionLogOptions} from './function-log-options';

/**
 * Properties for PythonFunctionAlpha
 */
export interface ExtendedPythonFunctionProps
  extends PythonFunctionProps,
    FunctionAlarmsOptions,
    DeployedFunctionOptions,
    FunctionLogOptions {}

/**
 * Extended version of the alpha PythonFunction that supports alarms and deployments.
 */
export class ExtendedPythonFunction extends PythonFunction {
  readonly alarms: FunctionAlarms;
  readonly deployment?: FunctionDeployment;

  constructor(
    scope: Construct,
    id: string,
    props: ExtendedPythonFunctionProps,
  ) {
    if (props.logGroup && props.logConfig) {
      throw new Error('Cannot specify both logGroup and logConfig.');
    }

    if (props.logRetention && props.logConfig) {
      throw new Error('Cannot specify both logRetention and logConfig.');
    }

    let logGroup = props.logGroup;
    if (!logGroup && !props.logRetention) {
      logGroup = new LogGroup(scope, `${id}LogGroup`, {
        retention: props.logConfig?.retention ?? RetentionDays.THREE_DAYS,
        logGroupName: props.logConfig?.logGroupName,
        removalPolicy: RemovalPolicy.DESTROY,
      });
    }

    super(scope, id, {
      logGroup,
      ...props,
      loggingFormat: props.loggingFormat ?? LoggingFormat.JSON,
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
