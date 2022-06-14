import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";
import {DeployedFunctionOptions} from "./deployed-function";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {FunctionDeployment} from "./function-deployment";

/**
 * Properties for Function
 */
export interface FunctionProps extends lambda.FunctionProps,  FunctionAlarmsOptions,DeployedFunctionOptions {

}

/**
 * Extended version of Function that supports alarms and deployments.
 */
export class Function extends lambda.Function {

  readonly alarms: FunctionAlarms;
  readonly deployment: FunctionDeployment;

  constructor(scope: Construct, id: string, props: FunctionProps) {
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
