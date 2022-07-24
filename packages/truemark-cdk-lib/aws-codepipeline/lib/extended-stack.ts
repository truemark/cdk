/**
 * Options for ExtendedStackProps.
 */
import {CfnOutput, Stack, StackProps, Stage} from "aws-cdk-lib";
import {ParameterStore, ParameterStoreOptions} from "../../aws-ssm";
import {Construct} from "constructs";
import {StringParameter} from "aws-cdk-lib/aws-ssm";

export interface ExtendedStackOptions {

  readonly parameterExportsPrefix?: string;

}

export interface ExtendedStackProps extends ExtendedStackOptions, StackProps {}

/**
 * Extended version of Stack providing functionality for parameter exports and
 */
export class ExtendedStack extends Stack {

  protected readonly parameterExports: ParameterStore;
  readonly parameterExportOptions: ParameterStoreOptions;

  constructor(scope: Construct, id: string, props?: ExtendedStackProps) {
    super(scope, id, props);
    const stageName = Stage.of(this)?.stageName
    this.parameterExportOptions = {
      prefix: props?.parameterExportsPrefix??(stageName === undefined ? "" : `/${stageName}`) + `/${id}/Exports/`,
      region: this.region
    }
    this.parameterExports = new ParameterStore(this, "ParameterExports", this.parameterExportOptions);
  }

  /**
   * Exports a parameter as an SSM Parameter.
   *
   * @param name the parameter name
   * @param value the parameter value
   */
  exportParameter(name: string, value: string): StringParameter {
    return this.parameterExports.write(name, value);
  }

  /**
   * Outputs a parameter as a CfnOutput.
   *
   * @param name the parameter name
   * @param value the parameter value
   */
  outputParameter(name: string, value: string): CfnOutput {
    return new CfnOutput(this, name, {
      value
    });
  }

}
