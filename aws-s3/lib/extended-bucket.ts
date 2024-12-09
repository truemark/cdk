import {RemovalPolicy} from 'aws-cdk-lib';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  BucketProps,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';
import {
  BucketDeployment,
  CacheControl,
  ISource,
  Source,
} from 'aws-cdk-lib/aws-s3-deployment';

/**
 * Properties for convenience deploy method in ExtendedBucket.
 */
export interface BucketDeploymentConfig {
  /**
   * The paths or sources to deploy.
   */
  readonly source: string | string[] | ISource | ISource[];

  /**
   * Prefix to add to the deployment path in the bucket.
   */
  readonly prefix?: string;

  /**
   * Paths to exclude from the deployment.
   */
  readonly exclude?: string | string[];

  /**
   * Additional Cache-Control directives to set. Default is none.
   */
  readonly cacheControl?: CacheControl[];

  /**
   * Whether to prune objects that exist in the bucket but not in the assets. Default is false.
   */
  readonly prune?: boolean;
}

export type ExtendedBucketProps = BucketProps;

/**
 * Extension of Bucket with preset defaults that include, disallowing public access,
 * enforcing bucket owner object ownership, S3 managed encryption, and auto deletion
 * of objects when removal policy is set to DESTROY. Also includes convenience methods
 * for things like S3 deployments.
 */
export class ExtendedBucket extends Bucket {
  protected deployCount = 0;
  constructor(scope: Construct, id: string, props: ExtendedBucketProps) {
    super(scope, id, {
      // Do not allow public access
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      // Disables ACLs on the bucket and we use policies to define access
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      // CloudFront cannot use KMS with S3
      encryption: BucketEncryption.S3_MANAGED,
      // Automatically delete contents if removal policy is set to DESTROY
      autoDeleteObjects: props.removalPolicy === RemovalPolicy.DESTROY,
      ...props,
    });
  }

  protected nextDeployCount(): string {
    const current = this.deployCount++;
    return current === 0 ? '' : `${current}`;
  }

  /**
   * Deploys files to the bucket.
   *
   * @param scope the scope to create the BucketDeployment in.
   *
   * @param config the deployment configurations
   */
  deploy(
    scope: Construct,
    config: BucketDeploymentConfig | BucketDeploymentConfig[],
  ) {
    const configs = Array.isArray(config) ? config : [config];
    for (const c of configs) {
      const sources = (Array.isArray(c.source) ? c.source : [c.source]).map(
        (s) => (typeof s === 'string' ? Source.asset(s) : s),
      );
      const exclude = c.exclude
        ? Array.isArray(c.exclude)
          ? c.exclude
          : [c.exclude]
        : [];
      new BucketDeployment(scope, `Deploy${this.nextDeployCount()}`, {
        sources,
        destinationBucket: this,
        destinationKeyPrefix: c.prefix,
        prune: c.prune,
        cacheControl: c.cacheControl,
        exclude,
      });
    }
  }
}
