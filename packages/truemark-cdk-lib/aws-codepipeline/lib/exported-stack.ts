import {CfnOutput, Stack, StackProps, Stage} from "aws-cdk-lib";
import {Construct} from "constructs";
import {ParameterStore, ParameterStoreOptions} from "../../aws-ssm";
import {StringParameter} from "aws-cdk-lib/aws-ssm";

/**
 * Options for ExportedStackProps.
 */
export interface ExportedStackOptions {
  readonly parameterExportsPrefix?: string;
}

/**
 * Properties for ExportedStack.
 */
export interface ExportedStackProps extends ExportedStackOptions, StackProps {}

/**
 * Provides functionality to export parameters to support cross region pipelines.
 */
export class ExportedStack extends Stack {

  protected readonly parameterExports: ParameterStore;
  readonly parameterExportOptions: ParameterStoreOptions;

  constructor(scope: Construct, id: string, props?: ExportedStackProps) {
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
   * @param includeOutput true to include as a CfnOutput instance
   */
  exportParameter(name: string, value: string, includeOutput?: boolean): StringParameter {
    if (includeOutput) {
      this.outputParameter(name, value);
    }
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
