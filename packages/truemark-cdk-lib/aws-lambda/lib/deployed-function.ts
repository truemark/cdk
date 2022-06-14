import {Construct} from "constructs";
import {ObservedFunction, ObservedFunctionProps} from "./observed-function";
import {FunctionDeployment, FunctionDeploymentOptions} from "./function-deployment";

export interface DeployedFunctionDeploymentOptions extends FunctionDeploymentOptions {
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
 * Properties for DeployedFunction.
 */
export interface DeployedFunctionProps extends ObservedFunctionProps, DeployedFunctionOptions {}

/**
 * Lambda function with CodeDeploy deployment group.
 */
export class DeployedFunction extends ObservedFunction {

  readonly deployment: FunctionDeployment;

  constructor(scope: Construct, id: string, props: DeployedFunctionProps) {
    super(scope, id, props);

    if (props.deploymentOptions?.createDeployment === undefined || props.deploymentOptions.createDeployment) {

      this.deployment = new FunctionDeployment(this, 'Deployment', {
        ...props.deploymentOptions,
        function: this
      });

      if (props.deploymentOptions?.includeCriticalAlarms === undefined || props.deploymentOptions.includeCriticalAlarms) {
        this.deployment.addAlarms(...this.functionAlarms.getCriticalAlarms());
      }
      if (props.deploymentOptions?.includeWarningAlarms) {
        this.deployment.addAlarms(...this.functionAlarms.getWarningAlarms());
      }
    }
  }
}
