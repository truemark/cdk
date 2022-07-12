import {AwsCustomResource, AwsSdkCall} from "aws-cdk-lib/custom-resources";
import {Construct} from "constructs";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";

/**
 * Properties for ParameterReader
 */
export interface ParameterReaderProps {
  readonly parameterName: string;
  readonly region: string;
}

/**
 * Custom resource allowing SSM parameter strings to be read across regions.
 */
export class ParameterReader extends AwsCustomResource {

  constructor(scope: Construct, id: string, props: ParameterReaderProps) {
    const call: AwsSdkCall = {
      service: "SSM",
      action: "getParameter",
      parameters: {
        Name: props.parameterName
      },
      region: props.region,
      physicalResourceId: { id: Date.now().toString() }
    };

    super(scope, id, {
      onUpdate: call,
      policy: {
        statements: [new PolicyStatement({
          resources: ["*"],
          actions: ["ssm:GetParameter"],
          effect: Effect.ALLOW
        })]
      }
    });
  }

  stringValue(): string {
    return this.getResponseField("Parameter.Value").toString();
  }
}
