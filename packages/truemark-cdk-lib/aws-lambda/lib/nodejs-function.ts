import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs"
import {Construct} from "constructs";
import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";
import {FunctionDeployment} from "./function-deployment";
import {DeployedFunctionOptions} from "./deployed-function";

export interface NodejsFunctionProps extends nodejs.NodejsFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {}

export class NodejsFunction extends nodejs.NodejsFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment: FunctionDeployment;

  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, {
      ...props
    });

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
    }
    if (props.deploymentOptions?.includeCriticalAlarms??true) {
      this.deployment.addAlarms(...this.alarms.getCriticalAlarms());
    }
    if (props.deploymentOptions?.includeWarningAlarms??false) {
      this.deployment.addAlarms(...this.alarms.getWarningAlarms());
    }
  }

}
