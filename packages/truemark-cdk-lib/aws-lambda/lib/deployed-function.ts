import {Construct} from "constructs";
import {Alias, FunctionProps, IFunction} from "aws-cdk-lib/aws-lambda";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {IRole} from 'aws-cdk-lib/aws-iam';
import {
  ILambdaApplication,
  ILambdaDeploymentConfig,
  LambdaDeploymentConfig,
  LambdaDeploymentGroup
} from "aws-cdk-lib/aws-codedeploy";
import {IAlarm} from "aws-cdk-lib/aws-cloudwatch";
import {AutoRollbackConfig} from "aws-cdk-lib/aws-codedeploy/lib/rollback-config";
import {FunctionAlarmProps, ObservedFunction} from "./observed-function";

export interface FunctionDeploymentProps {

  /**
   * The reference to the CodeDeploy Lambda Application that this Deployment Group belongs to.
   *
   * @default - One will be created for you.
   */
  readonly application?: ILambdaApplication;

  /**
   * The physical, human-readable name of the CodeDeploy Deployment Group.
   *
   * @default - An auto-generated name will be used.
   */
  readonly deploymentGroupName?: string;

  /**
   * Deployment configuration to use when deploying this lambda.
   *
   * @default LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES
   */
  readonly deploymentConfig?: ILambdaDeploymentConfig;

  /**
   * Additional CloudWatch alarms to associate with the deployment.
   */
  readonly alarms?: IAlarm[];

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
   * The service Role of this Deployment Group.
   *
   * @default - A new Role will be created.
   */
  readonly role?: IRole;

  /**
   * The Lambda function to run before traffic routing starts.
   *
   * @default - None.
   */
  readonly preHook?: IFunction;

  /**
   * The Lambda function to run after traffic routing starts.
   *
   * @default - None.
   */
  readonly postHook?: IFunction;

  /**
   * Whether to continue a deployment even if fetching the alarm status from CloudWatch failed.
   *
   * @default false
   */
  readonly ignorePollAlarmsFailure?: boolean;

  /**
   * The auto-rollback configuration for this Deployment Group.
   *
   * @default - default AutoRollbackConfig.
   */
  readonly autoRollback?: AutoRollbackConfig;

  /**
   * Name of the alias to create for deployments.
   *
   * @default 'deploy'
   */
  readonly aliasName?: string;
}


export interface FunctionDeploymentGroupProps extends FunctionDeploymentProps {

  readonly lambdaFunction: lambda.Function;

}

export class FunctionDeploymentGroup extends LambdaDeploymentGroup {

  readonly alias: Alias;
  readonly deploymentConfig: ILambdaDeploymentConfig;

  constructor(scope: Construct, id: string, props: FunctionDeploymentGroupProps) {

    const alias = new Alias(scope, 'DeploymentAlias', {
      aliasName: props.aliasName??'deploy',
      version: props.lambdaFunction.currentVersion,
    });

    const deploymentConfig = props.deploymentConfig??LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES;

    super(scope, id, {
      ...props,
      alias,
      deploymentConfig
    });

    this.alias = alias;
    this.deploymentConfig = deploymentConfig;
  }
}

export interface FunctionDeploymentConfig {

  /**
   * Skips creation of the deployment group and associated resources. This
   * does not prevent the lambda from being deployed.
   *
   * @default false
   */
  readonly skipDeploymentConfig?: boolean;

  /**
   * The deployment configuration settings to use. If none are provided a default is used.
   */
  readonly deploymentProps?: FunctionDeploymentProps;
}

/**
 * Properties for DeployedFunction.
 */
export interface DeployedFunctionProps extends FunctionDeploymentConfig, FunctionProps, FunctionAlarmProps {}

/**
 * Lambda function with CodeDeploy deployment group.
 */
export class DeployedFunction extends ObservedFunction {

  /**
   * Generated alias for the deployment group.
   */
  readonly deploymentAlias: Alias;

  /**
   * Generated deployment group.
   */
  readonly deploymentGroup: FunctionDeploymentGroup;

  constructor(scope: Construct, id: string, props: DeployedFunctionProps) {
    super(scope, id, props);

    if (props.skipDeploymentConfig !== undefined && props.skipDeploymentConfig) {
      const alarms: IAlarm[] = [];
      if (props.deploymentProps?.includeCriticalAlarms === undefined || props.deploymentProps.includeCriticalAlarms) {
        alarms.push(...this.functionAlarms.criticalAlarms);
      }
      if (props.deploymentProps?.includeWarningAlarms) {
        alarms.push(...this.functionAlarms.warningAlarms);
      }
      if (props.deploymentProps?.alarms) {
        alarms.push(...props.deploymentProps.alarms);
      }
      this.deploymentGroup = new FunctionDeploymentGroup(this, id, {
        ...props,
        lambdaFunction: this,
        alarms,
      });
      this.deploymentAlias = this.deploymentGroup.alias;
    }
  }
}
