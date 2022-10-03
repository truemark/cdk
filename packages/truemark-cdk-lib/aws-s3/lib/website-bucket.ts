import {Construct} from "constructs";
import {Bucket, BucketEncryption, RedirectTarget, RoutingRule} from "aws-cdk-lib/aws-s3";
import {DomainName, LatencyARecord, WeightedARecord, WeightedLatencyARecord} from "../../aws-route53";
import {ARecord, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {BucketWebsiteTarget} from "aws-cdk-lib/aws-route53-targets";
import {RemovalPolicy, Duration} from "aws-cdk-lib";
import {BucketDeployment, CacheControl, Source} from "aws-cdk-lib/aws-s3-deployment";


/**
 * Domain name properties for a bucket based website.
 */
export interface WebsiteDomainNameProps {

  readonly prefix?: string;

  readonly zone: string | IHostedZone;

  readonly weight?: number;

  readonly latency?: boolean;

  readonly create?: boolean;

}

/**
 * Properties for WebsiteBucket.
 */
export interface WebsiteBucketProps {

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

  readonly domainName?: WebsiteDomainNameProps;

  readonly websiteIndexDocument?: string;

  readonly websiteErrorDocument?: string;

  readonly websiteRedirect?: RedirectTarget;

  readonly websiteRoutingRules?: RoutingRule[];
}

/**
 * Simple Construct for creating buckets that will be accessed directly as a website.
 */
export class WebsiteBucket extends Construct {

  readonly bucket: Bucket;
  readonly bucketName: string;
  readonly bucketWebsiteUrl: string;
  readonly bucketWebsiteDomainName: string;
  readonly record: ARecord | WeightedARecord | LatencyARecord | WeightedLatencyARecord;

  constructor(scope: Construct, id: string, props: WebsiteBucketProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.RETAIN;
    const autoDeleteObjects = (props.autoDeleteObjects ?? false) && removalPolicy === RemovalPolicy.DESTROY;

    const domainName = props.domainName === undefined ? undefined : new DomainName({
      prefix: props.domainName.prefix,
      zone: props.domainName.zone
    });

    this.bucket = new Bucket(this, "Default", {
      bucketName: domainName?.toString(),
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: true,
      websiteIndexDocument: props.websiteIndexDocument ?? "index.html",
      websiteErrorDocument: props.websiteErrorDocument ?? "error.html",
      websiteRedirect: props.websiteRedirect,
      websiteRoutingRules: props.websiteRoutingRules,
      removalPolicy,
      autoDeleteObjects,
    });
    this.bucketName = this.bucket.bucketName;
    this.bucketWebsiteUrl = this.bucket.bucketWebsiteUrl;
    this.bucketWebsiteDomainName = this.bucket.bucketWebsiteDomainName;

    if (domainName !== undefined && (props.domainName?.create ?? true)) {
      const target = RecordTarget.fromAlias(new BucketWebsiteTarget(this.bucket));
      if (props.domainName?.latency !== undefined && props.domainName.weight !== undefined) {
        this.record = domainName.createWeightedLatencyARecord(this, target, props.domainName.weight)
      } else if (props.domainName?.latency !== undefined) {
        this.record = domainName.createLatencyARecord(this, target);
      } else if (props.domainName?.weight !== undefined) {
        this.record = domainName.createWeightedARecord(this, target, props.domainName.weight);
      } else {
        this.record = domainName.createARecord(this, target);
      }
    }
  }

  /**
   * Helper method to deploy local assets to the created bucket. Ths function assumes
   * CloudFront invalidation requests will be sent for mutable files to serve new content.
   * For more complicated deployments, use BucketDeployment directly.
   *
   * @param path the path to the local assets
   * @param maxAge the length of time to browsers will cache files; default is Duration.minutes(15)
   * @param sMaxAge the length of time CloudFront will cache files; default is Duration.days(7)
   * @param prune
   */
  deploy(path: string, maxAge?: Duration, sMaxAge?: Duration, prune?: boolean): BucketDeployment {
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
}
