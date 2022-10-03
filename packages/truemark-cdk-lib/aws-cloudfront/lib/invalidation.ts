import {AwsCustomResource, AwsSdkCall} from "aws-cdk-lib/custom-resources";
import {Construct} from "constructs";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {Duration} from "aws-cdk-lib";

/**
 * Properties for Invalidation.
 */
export interface InvalidationProps {
  readonly distributionId: string;
  readonly paths: string[];
  readonly callerReference?: string;
  readonly timeout?: Duration;
}

/**
 * Creates a CloudFront invalidation.
 */
export class Invalidation extends AwsCustomResource {

  constructor(scope: Construct, id: string, props: InvalidationProps) {
    const now = Date.now().toString();
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html
    const call: AwsSdkCall = {
      service: "CloudFront",
      action: "createInvalidation",
      parameters: {
        DistributionId: props.distributionId,
        InvalidationBatch: {
          CallerReference: props.callerReference ?? now,
          Paths: {
            Quantity: props.paths.length,
            Items: props.paths
          }
        }
      },
      region: "us-east-1",
      physicalResourceId: { id: now }
    };
    super(scope, id, {
      onUpdate: call,
      policy: {
        statements: [new PolicyStatement({
          resources: ["*"],
          actions: ["cloudfront:CreateInvalidation"],
          effect: Effect.ALLOW
        })]
      },
      timeout: props.timeout ?? Duration.minutes(1)
    });
  }
}
