import * as go from "@aws-cdk/aws-lambda-go-alpha";
import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";
import {FunctionDeployment} from "./function-deployment";
import {Construct} from "constructs";
import {DeployedFunctionOptions} from "./function";

/**
 * Properties for GoFunctionAlpha
 */
export interface GoFunctionAlphaProps extends go.GoFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {

}

/**
 * Extended version of the alpha GonFunction that supports alarms and deployments.
 */
export class GoFunctionAlpha extends go.GoFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment!: FunctionDeployment;

  constructor(scope: Construct, id: string, props: GoFunctionAlphaProps) {
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
        this.deployment.addAlarms(...this.alarms.criticalAlarms());
      }
      if (props.deploymentOptions?.includeWarningAlarms??false) {
        this.deployment.addAlarms(...this.alarms.warningAlarms());
      }
    }
  }
}
