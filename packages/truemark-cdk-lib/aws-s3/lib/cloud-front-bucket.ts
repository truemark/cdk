import {Construct} from "constructs";
import {BlockPublicAccess, Bucket, BucketEncryption, IBucket} from "aws-cdk-lib/aws-s3";
import {OriginAccessIdentity} from "aws-cdk-lib/aws-cloudfront";
import {BucketDeployment, CacheControl, ISource, Source} from "aws-cdk-lib/aws-s3-deployment";
import {Duration, RemovalPolicy} from "aws-cdk-lib";

/**
 * Properties for CloudFrontBucket.
 */
export interface CloudFrontBucketProps {

  /**
   * Policy to apply when the bucket is removed from this stack.
   * @default RemovalPolicy.RETAIN
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Whether all objects should be automatically deleted when the bucket is removed from the stack or when the stack is deleted.
   * Requires the removalPolicy to be set to RemovalPolicy.DESTROY. Default is false.
   *
   * @default false
   */
  readonly autoDeleteObjects?: boolean;

  /**
   * Whether this bucket should have versioning turned on or not. Default is false.
   *
   * @default false
   */
  readonly versioned?: boolean;

  /**
   * Whether this bucket should have transfer acceleration turned on or not. Default is false.
   *
   * @default false
   */
  readonly transferAcceleration?: boolean;
}

/**
 * Simple Construct for creating buckets that will be accessed directly by CloudFront as an Origin.
 */
export class CloudFrontBucket extends Construct {

  readonly bucket: Bucket;
  readonly bucketName: string;
  readonly bucketArn: string;
  readonly originAccessIdentity: OriginAccessIdentity;
  readonly originAccessIdentityId: string;

  constructor(scope: Construct, id: string, props: CloudFrontBucketProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.RETAIN;
    const autoDeleteObjects = (props.autoDeleteObjects ?? false) && removalPolicy === RemovalPolicy.DESTROY;

    this.bucket = new Bucket(this, "Default", {
      encryption: BucketEncryption.S3_MANAGED, // CloudFront cannot use KMS with S3
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy,
      autoDeleteObjects,
      versioned: props.versioned ?? false,
      transferAcceleration: props.transferAcceleration ?? false
    });
    this.bucketName = this.bucket.bucketName;
    this.bucketArn = this.bucket.bucketArn;

    this.originAccessIdentity = new OriginAccessIdentity(this, "Access");
    this.originAccessIdentityId = this.originAccessIdentity.originAccessIdentityId;
    this.bucket.grantRead(this.originAccessIdentity);
  }

  /**
   * Helper method to deploy local assets to the created bucket. Ths function assumes
   * CloudFront invalidation requests will be sent for mutable files to serve new content.
   * For more complicated deployments, use BucketDeployment directly.
   *
   * @param path the path to the local assets
   * @param maxAge the length of time to browsers will cache files; default is Duration.minutes(15)
   * @param sMaxAge the length of time CloudFront will cache files; default is Duration.days(7)
   * @param prune true to prune old files; default is false
   */
  deployPath(path: string, maxAge?: Duration, sMaxAge?: Duration, prune?: boolean): BucketDeployment {
    return new BucketDeployment(this, "Deploy", {
      sources: [Source.asset(path)],
      destinationBucket: this.bucket,
      prune: prune ?? false,
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(maxAge ?? Duration.minutes(15)),
        CacheControl.sMaxAge(sMaxAge ?? Duration.days(7))
      ]
    });
  }

  /**
   * Helper method to assets to the created bucket. This function assumes CloudFront invalidation
   * requests will be sent for mutable files to serve new content.
   * For more complicated deployments, use BucketDeployment directly.
   *
   * @param source the source to deploy
   * @param maxAge the length of time to browsers will cache files; default is Duration.minutes(15)
   * @param sMaxAge the length of time CloudFront will cache files; default is Duration.days(7)
   * @param prune true to prune old files; default is false
   */
  deploySource(source: ISource, maxAge?: Duration, sMaxAge?: Duration, prune?: boolean): BucketDeployment {
    return new BucketDeployment(this, "Deploy", {
      sources: [source],
      destinationBucket: this.bucket,
      prune: prune ?? false,
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(maxAge ?? Duration.minutes(15)),
        CacheControl.sMaxAge(sMaxAge ?? Duration.days(7))
      ]
    })
  }
}
