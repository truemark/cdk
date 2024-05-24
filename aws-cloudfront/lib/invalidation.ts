import {
  AwsCustomResource,
  AwsSdkCall,
  PhysicalResourceId,
} from 'aws-cdk-lib/custom-resources';
import {Construct} from 'constructs';
import {Effect, PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {Duration, Stack} from 'aws-cdk-lib';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';

/**
 * Properties for Invalidation.
 */
export interface InvalidationProps {
  /**
   * Distribution to submit invalidation for.
   */
  readonly distributionId: string;

  /**
   * The paths to invalidate.
   */
  readonly paths: string[];

  /**
   * The caller reference. Default is current timestamp.
   */
  readonly callerReference?: string;

  /**
   * The timeout for the Lambda function. Default is 2 minutes.
   *
   * @default Duration.minutes(2)
   */
  readonly timeout?: Duration;

  /**
   * Log retention days. The default is 5.
   */
  readonly logRetention?: number;
}

/**
 * Creates a CloudFront invalidation.
 */
export class Invalidation extends Construct {
  readonly resource: AwsCustomResource;

  constructor(scope: Construct, id: string, props: InvalidationProps) {
    super(scope, id);

    const now = Date.now().toString();
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html
    const call: AwsSdkCall = {
      service: 'CloudFront',
      action: 'createInvalidation',
      parameters: {
        DistributionId: props.distributionId,
        InvalidationBatch: {
          CallerReference: props.callerReference ?? now,
          Paths: {
            Quantity: props.paths.length,
            Items: props.paths,
          },
        },
      },
      physicalResourceId: PhysicalResourceId.of(now),
    };
    this.resource = new AwsCustomResource(this, 'Default', {
      onUpdate: call,
      logRetention: props.logRetention ?? RetentionDays.FIVE_DAYS,
      installLatestAwsSdk: false,
      policy: {
        statements: [
          new PolicyStatement({
            resources: [
              `arn:aws:cloudfront::${Stack.of(this).account}:distribution/${
                props.distributionId
              }`,
            ],
            actions: ['cloudfront:CreateInvalidation'],
            effect: Effect.ALLOW,
          }),
        ],
      },
      timeout: props.timeout ?? Duration.minutes(2),
    });
  }
}
