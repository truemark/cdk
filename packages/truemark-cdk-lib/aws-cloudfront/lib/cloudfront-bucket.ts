import {Construct} from "constructs";
import {ExtendedBucket} from "../../aws-s3";
import {BlockPublicAccess, Bucket, BucketEncryption} from "aws-cdk-lib/aws-s3";
import {RemovalPolicy} from "aws-cdk-lib/core";
import {OriginAccessIdentity} from "aws-cdk-lib/aws-cloudfront";

export interface CloudFrontBucketProps {

  /**
   * Policy to apply when the bucket is removed from this stack.
   * @default RemovalPolicy.RETAIN
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Whether all objects should be automatically deleted when the bucket is removed from the stack or when the stack is deleted.
   * Requires the removalPolicy to be set to RemovalPolicy.DESTROY.
   *
   * @default false
   */
  readonly autoDeleteObjects?: boolean;
}

export class CloudFrontBucket extends Construct {

  readonly bucket: Bucket;
  readonly originAccessIdentity: OriginAccessIdentity;
  readonly bucketName: string;
  readonly originAccessIdentityId: string;

  constructor(scope: Construct, id: string, props: CloudFrontBucketProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.RETAIN;

    this.bucket = new ExtendedBucket(this, "Default", {
      encryption: BucketEncryption.S3_MANAGED, // CloudFront can use KMS with S3
      removalPolicy,
      autoDeleteObjects: (props.autoDeleteObjects ?? false) && removalPolicy === RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL, // Recommended to avoid permissions issues
    });

    this.bucketName = this.bucket.bucketName;

    this.originAccessIdentity = new OriginAccessIdentity(this, "Access");
    this.bucket.grantRead(this.originAccessIdentity);

    this.originAccessIdentityId = this.originAccessIdentity.originAccessIdentityId;
  }
}
