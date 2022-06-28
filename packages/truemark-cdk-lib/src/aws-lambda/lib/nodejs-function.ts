import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { DeployedFunctionOptions } from './function';
import { FunctionAlarms, FunctionAlarmsOptions } from './function-alarms';
import { FunctionDeployment } from './function-deployment';

/**
 * Properties for NodejsFunction
 */
export interface NodeJSFunctionProps extends NodejsFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {

}

/**
 * Extended version of the NodejsFunction that supports alarms and deployments.
 */
export class NodeJSFunction extends NodejsFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment!: FunctionDeployment;

  constructor(scope: Construct, id: string, props: NodejsFunctionProps) {
    super(scope, id, props);

    this.alarms = new FunctionAlarms(this, 'Alarms', {
      function: this,
      logGroup: this.logGroup,
      ...props,
    });

    // if (props.deploymentOptions?.createDeployment??true) {
    //   this.deployment = new FunctionDeployment(this, 'Deployment', {
    //     ...props.deploymentOptions,
    //     function: this,
    //   });
    //   if (props.deploymentOptions?.includeCriticalAlarms??true) {
    //     this.deployment.addAlarms(...this.alarms.criticalAlarms());
    //   }
    //   if (props.deploymentOptions?.includeWarningAlarms??false) {
    //     this.deployment.addAlarms(...this.alarms.warningAlarms());
    //   }
    // }
  }
}
