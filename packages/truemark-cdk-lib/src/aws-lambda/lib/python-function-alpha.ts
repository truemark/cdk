// import * as python from '@aws-cdk/aws-lambda-python-alpha';
import { PythonFunction, PythonFunctionProps } from '@aws-cdk/aws-lambda-python-alpha';

import { Construct } from 'constructs';
import { DeployedFunctionOptions } from './function';
import { FunctionAlarms, FunctionAlarmsOptions } from './function-alarms';
import { FunctionDeployment } from './function-deployment';

/**
 * Properties for PythonFunctionAlpha
 */
export interface PythonFunctionAlphaProps extends PythonFunctionProps, FunctionAlarmsOptions, DeployedFunctionOptions {

}

/**
 * Extended version of the alpha PythonFunction that supports alarms and deployments.
 */
export class PythonFunctionAlpha extends PythonFunction {

  readonly alarms: FunctionAlarms;
  readonly deployment!: FunctionDeployment;

  constructor(scope: Construct, id: string, props: PythonFunctionAlphaProps) {
    super(scope, id, props);

    this.alarms = new FunctionAlarms(this, 'Alarms', {
      function: this,
      logGroup: this.logGroup,
      ...props,
    });

    if (props.deploymentOptions?.createDeployment??true) {
      this.deployment = new FunctionDeployment(this, 'Deployment', {
        ...props.deploymentOptions,
        function: this,
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
