import {Bucket, BucketEncryption, BlockPublicAccess} from "aws-cdk-lib/aws-s3";
import {Construct} from "constructs";
import * as kms from "aws-cdk-lib/aws-kms";
import {RemovalPolicy} from "aws-cdk-lib";

export interface StandardBucketProps {
  /**
   * Key to be used for encryption. If left empty, encryption will be S3_MANAGED.
   */
  readonly encryptionKey?: kms.IKey;

  /**
   * Removal policy for this bucket.
   *
   * @default RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Whether this bucket should have versioning turned on or not.
   *
   * @default false
   */
  readonly versioned?: boolean;

  /**
   * Grants public read access to all objects in the bucket. Similar to calling bucket.grantPublicAccess()
   *
   * @default false
   */
  readonly publicReadAccess?: boolean;

  /**
   * The block public access configuration of this bucket.
   *
   * @default BlockPublicAccess.BLOCK_ALL
   */
  readonly blockPublicAccess?: BlockPublicAccess

  /**
   * Physical name of this bucket.
   *
   * @default - Assigned by CloudFormation (recommended).
   */
  readonly bucketName?: string;
}

export class StandardBucket extends Bucket {

  constructor(scope: Construct, id: string, props?: StandardBucketProps) {
    super(scope, id, {
      ...props,
      encryption: props?.encryptionKey?BucketEncryption.KMS:BucketEncryption.S3_MANAGED,
      removalPolicy: props?.removalPolicy??RemovalPolicy.DESTROY,
      autoDeleteObjects: props?.removalPolicy === undefined || props.removalPolicy !== RemovalPolicy.RETAIN,
      versioned: props?.versioned??false,
      publicReadAccess: props?.publicReadAccess??false,
      blockPublicAccess: props?.blockPublicAccess??BlockPublicAccess.BLOCK_ALL,
    });
  }
}
