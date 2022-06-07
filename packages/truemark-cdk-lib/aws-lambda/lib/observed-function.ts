import {Function, FunctionProps} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {FunctionAlarms, FunctionAlarmsOptions} from "./function-alarms";

/**
 * Properties for ObservedFunction.
 */
export interface ObservedFunctionProps extends FunctionProps, FunctionAlarmsOptions {}

/**
 * Lambda Function with CloudWatch alarms.
 */
export class ObservedFunction extends Function {

  readonly functionAlarms: FunctionAlarms;

  constructor(scope: Construct, id: string, props: ObservedFunctionProps) {
    super(scope, id, props);

    this.functionAlarms = new FunctionAlarms(this, 'Monitoring', {
      function: this,
      logGroup: this.logGroup,
      ...props
    });
  }
}
