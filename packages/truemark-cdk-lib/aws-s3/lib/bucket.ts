import * as s3 from 'aws-cdk-lib/aws-s3';
import {Construct} from "constructs";
import {BlockPublicAccess, BucketEncryption} from "aws-cdk-lib/aws-s3";
import {RemovalPolicy} from "aws-cdk-lib";
import {BucketAlarms} from "./bucket-alarms";

/**
 * Properties of Bucket.
 */
export interface BucketProps extends s3.BucketProps {}

/**
 * Extended version of Bucket that changes defaults.
 */
export class Bucket extends s3.Bucket {

  readonly alarms: BucketAlarms;

  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id, {
      encryption: props?.encryptionKey?BucketEncryption.KMS:BucketEncryption.S3_MANAGED,
      removalPolicy: props?.removalPolicy??RemovalPolicy.RETAIN,
      autoDeleteObjects: props?.removalPolicy === undefined || props.removalPolicy !== RemovalPolicy.RETAIN,
      versioned: props?.versioned??false,
      publicReadAccess: props?.publicReadAccess??false,
      blockPublicAccess: props?.blockPublicAccess??BlockPublicAccess.BLOCK_ALL,
      ...props
      // TODO Look at adding easy support for bucket access logs
    });

    this.alarms = new BucketAlarms(this, "Alarms", {
      bucket: this,
      ...props
    });
  }
}
