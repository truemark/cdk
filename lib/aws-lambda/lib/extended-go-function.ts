import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";
import {FunctionDeployment} from "./function-deployment";
import {Construct} from "constructs";
import {DeployedFunctionOptions} from "./extended-function";
import {GoFunction, GoFunctionProps} from "@aws-cdk/aws-lambda-go-alpha";

/**
 * Properties for ExtendedGoFunction.
 */
export interface ExtendedGoFunctionProps extends GoFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {

}

/**
 * Extended version of the GoFunction that supports alarms and deployments.
 */
export class ExtendedGoFunction extends GoFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment: FunctionDeployment;

  constructor(scope: Construct, id: string, props: ExtendedGoFunctionProps) {
    super(scope, id, props);

    this.alarms = new FunctionAlarms(this, "Alarms", {
      function: this,
      logGroup: this.logGroup,
      ...props
    });

    if (props.deploymentOptions?.createDeployment??true) {
      this.deployment = new FunctionDeployment(this, "Deployment", {
        ...props.deploymentOptions,
        function: this
      });
      if (props.deploymentOptions?.includeCriticalAlarms??true) {
        this.deployment.addAlarms(...this.alarms.getCriticalAlarms());
      }
      if (props.deploymentOptions?.includeWarningAlarms??false) {
        this.deployment.addAlarms(...this.alarms.getWarningAlarms());
      }
    }
  }
}
