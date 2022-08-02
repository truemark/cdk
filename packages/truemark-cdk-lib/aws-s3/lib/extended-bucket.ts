import {Construct} from "constructs";
import {BucketEncryption} from "aws-cdk-lib/aws-s3";
import {BucketAlarms, BucketAlarmsOptions} from "./bucket-alarms";
import {Bucket, BucketProps} from "aws-cdk-lib/aws-s3";

/**
 * Properties of ExtendedBucket.
 */
export interface ExtendedBucketProps extends BucketProps, BucketAlarmsOptions {}

/**
 * Extended version of Bucket that changes the following defaults.
 */
export class ExtendedBucket extends Bucket {

  readonly alarms: BucketAlarms;

  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id, {
      encryption: props?.encryptionKey ? BucketEncryption.KMS : BucketEncryption.S3_MANAGED, // change default from Unencrypted
      ...props
      // TODO Look at adding easy support for bucket access logs
    });

    this.alarms = new BucketAlarms(this, "Alarms", {
      bucket: this,
      ...props
    });
  }
}
