import * as python from "@aws-cdk/aws-lambda-python-alpha";
import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";
import {DeployedFunctionOptions} from "./deployed-function";
import {FunctionDeployment} from "./function-deployment";
import {Construct} from "constructs";

/**
 * Properties for PythonFunctionAlpha
 */
export interface PythonFunctionAlphaProps extends python.PythonFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {

}

/**
 * Extended version of the alpha PythonFunction that supports alarms and deployments.
 */
export class PythonFunctionAlpha extends python.PythonFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment: FunctionDeployment;

  constructor(scope: Construct, id: string, props: PythonFunctionAlphaProps) {
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
