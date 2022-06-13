import {Stack, StackProps, Stage} from "aws-cdk-lib";
import {Construct} from "constructs";
import {ParameterStore} from "../../aws-ssm";
import {StringParameter} from "aws-cdk-lib/aws-ssm";

export interface ExportedStackOptions {
  parameterExportsPrefix?: string;
}

export interface ExportedStackProps extends ExportedStackOptions, StackProps {}

/**
 * Provides functionality to export parameters to support cross region pipelines.
 */
export class ExportedStack extends Stack {

  readonly parameterExportsPrefix: string;
  readonly parameterExports: ParameterStore;

  constructor(scope: Construct, id: string, props?: ExportedStackProps) {
    super(scope, id, props);
    const stageName = Stage.of(this)?.stageName
    this.parameterExportsPrefix = props?.parameterExportsPrefix??(stageName === undefined ? "" : `/${stageName}`) + `/${id}/Exports/`
    this.parameterExports = new ParameterStore(this, "ParameterExports", {
      prefix: this.parameterExportsPrefix
    });
  }

  exportParameter(name: string, value: string): StringParameter {
    return this.parameterExports.write(name, value);
  }
}
