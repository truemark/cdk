import {FunctionAlarms, FunctionAlarmsOptions} from './function-alarms';
import {Construct} from 'constructs';
import {
  FunctionDeployment,
  FunctionDeploymentOptions,
} from './function-deployment';
import {Function, FunctionProps, LoggingFormat} from 'aws-cdk-lib/aws-lambda';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';
import {RemovalPolicy} from 'aws-cdk-lib';

export interface DeployedFunctionDeploymentOptions
  extends FunctionDeploymentOptions {
  /**
   * Include Warning CloudWatch alarms.
   *
   * @default false
   */
  readonly includeWarningAlarms?: boolean;

  /**
   * Include Critical CloudWatch alarms.
   *
   * @default true
   */
  readonly includeCriticalAlarms?: boolean;

  /**
   * Setting this to false will prevent the creation of the function alias and
   * deployment group for the function.
   *
   * @default true
   */
  readonly createDeployment?: boolean;
}

export interface DeployedFunctionOptions {
  /**
   * The deployment configuration settings to use. If none are provided a default set is used.
   */
  readonly deploymentOptions?: DeployedFunctionDeploymentOptions;
}

/**
 * Properties for Function
 */
export interface ExtendedFunctionProps
  extends FunctionProps,
    FunctionAlarmsOptions,
    DeployedFunctionOptions {}

/**
 * Extended version of Function adding alarms, deployment and setting loggingFormat to JSON.
 */
export class ExtendedFunction extends Function {
  readonly alarms: FunctionAlarms;
  readonly deployment?: FunctionDeployment;

  constructor(scope: Construct, id: string, props: ExtendedFunctionProps) {
    let logGroup = props.logGroup;
    if (!logGroup && !props.logRetention) {
      logGroup = new LogGroup(scope, `${id}LogGroup`, {
        retention: RetentionDays.THREE_DAYS,
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
