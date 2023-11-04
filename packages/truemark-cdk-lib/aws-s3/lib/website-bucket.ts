import {Construct} from "constructs";
import {Bucket, BucketEncryption, RedirectTarget, RoutingRule} from "aws-cdk-lib/aws-s3";
import {DomainName, LatencyARecord, WeightedARecord} from "../../aws-route53";
import {ARecord, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {BucketWebsiteTarget} from "aws-cdk-lib/aws-route53-targets";
import {RemovalPolicy, Duration} from "aws-cdk-lib";
import {BucketDeployment, CacheControl, Source} from "aws-cdk-lib/aws-s3-deployment";
import {Grant, IGrantable} from "aws-cdk-lib/aws-iam";
import * as iam from "aws-cdk-lib/aws-iam";


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
  readonly bucketArn: string;
  readonly bucketWebsiteUrl: string;
  readonly bucketWebsiteDomainName: string;
  readonly record: ARecord | WeightedARecord | LatencyARecord;

  constructor(scope: Construct, id: string, props?: WebsiteBucketProps) {
    super(scope, id);

    const removalPolicy = props?.removalPolicy ?? RemovalPolicy.RETAIN;
    const autoDeleteObjects = (props?.autoDeleteObjects ?? false) && removalPolicy === RemovalPolicy.DESTROY;

    const domainName = props?.domainName === undefined ? undefined : new DomainName({
      prefix: props.domainName.prefix,
      zone: props.domainName.zone
    });

    this.bucket = new Bucket(this, "Default", {
      bucketName: domainName?.toString(),
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: true,
      websiteIndexDocument: props?.websiteIndexDocument ?? "index.html",
      websiteErrorDocument: props?.websiteErrorDocument ?? "error.html",
      websiteRedirect: props?.websiteRedirect,
      websiteRoutingRules: props?.websiteRoutingRules,
      removalPolicy,
      autoDeleteObjects,
    });
    this.bucketName = this.bucket.bucketName;
    this.bucketArn = this.bucket.bucketArn;
    this.bucketWebsiteUrl = this.bucket.bucketWebsiteUrl;
    this.bucketWebsiteDomainName = this.bucket.bucketWebsiteDomainName;

    if (domainName !== undefined && (props?.domainName?.create ?? true)) {
      const target = RecordTarget.fromAlias(new BucketWebsiteTarget(this.bucket));
      // TODO Evaluate
      if (props?.domainName?.latency !== undefined) {
        this.record = domainName.createLatencyARecord(this, target);
      } else if (props?.domainName?.weight !== undefined) {
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
      memoryLimit: 512,
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(maxAge ?? Duration.minutes(15)),
        CacheControl.sMaxAge(sMaxAge ?? Duration.days(7))
      ]
    });
  }

  /**
   * Grant read permissions for this bucket and it's contents to an IAM
   * principal (Role/Group/User).
   *
   * If encryption is used, permission to use the key to decrypt the contents
   * of the bucket will also be granted to the same principal.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantRead(identity: IGrantable, objectsKeyPattern?: any): Grant {
    return this.bucket.grantRead(identity, objectsKeyPattern);
  }

  /**
   * Grant write permissions to this bucket to an IAM principal.
   *
   * If encryption is used, permission to use the key to encrypt the contents
   * of written files will also be granted to the same principal.
   *
   * Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
   * which could be used to grant read/write object access to IAM principals in other accounts.
   * If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
   * and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
   * in the `context` key of your cdk.json file.
   * If you've already updated, but still need the principal to have permissions to modify the ACLs,
   * use the `grantPutAcl` method.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   * @param allowedActionPatterns Restrict the permissions to certain list of action patterns
   */
  grantWrite(identity: IGrantable, objectsKeyPattern?: any, allowedActionPatterns?: string[]): Grant {
    return this.bucket.grantWrite(identity, objectsKeyPattern, allowedActionPatterns);
  }

  /**
   * Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.
   *
   * If encryption is used, permission to use the key to encrypt the contents
   * of written files will also be granted to the same principal.
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantPut(identity: IGrantable, objectsKeyPattern?: any): Grant {
    return this.bucket.grantPut(identity, objectsKeyPattern);
  }

  /**
   * Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket.
   *
   * If your application has the '@aws-cdk/aws-s3:grantWriteWithoutAcl' feature flag set,
   * calling `grantWrite` or `grantReadWrite` no longer grants permissions to modify the ACLs of the objects;
   * in this case, if you need to modify object ACLs, call this method explicitly.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantPutAcl(identity: IGrantable, objectsKeyPattern?: string): Grant {
    return this.bucket.grantPutAcl(identity, objectsKeyPattern);
  }

  /**
   * Grants s3:DeleteObject* permission to an IAM principal for objects
   * in this bucket.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantDelete(identity: IGrantable, objectsKeyPattern?: any): Grant {
    return this.bucket.grantDelete(identity, objectsKeyPattern);
  }

  /**
   * Grants read/write permissions for this bucket and it's contents to an IAM
   * principal (Role/Group/User).
   *
   * If an encryption key is used, permission to use the key for
   * encrypt/decrypt will also be granted.
   *
   * Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
   * which could be used to grant read/write object access to IAM principals in other accounts.
   * If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
   * and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
   * in the `context` key of your cdk.json file.
   * If you've already updated, but still need the principal to have permissions to modify the ACLs,
   * use the `grantPutAcl` method.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantReadWrite(identity: IGrantable, objectsKeyPattern?: any): Grant {
    return this.bucket.grantReadWrite(identity, objectsKeyPattern);
  }

  /**
   * Adds a statement to the resource policy for a principal (i.e.
   * account/role/service) to perform actions on this bucket and/or its
   * contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for
   * this bucket or objects.
   *
   * Note that the policy statement may or may not be added to the policy.
   * For example, when an `IBucket` is created from an existing bucket,
   * it's not possible to tell whether the bucket already has a policy
   * attached, let alone to re-use that policy to add more statements to it.
   * So it's safest to do nothing in these cases.
   *
   * @param permission the policy statement to be added to the bucket's
   * policy.
   * @returns metadata about the execution of this method. If the policy
   * was not added, the value of `statementAdded` will be `false`. You
   * should always check this value to make sure that the operation was
   * actually carried out. Otherwise, synthesis and deploy will terminate
   * silently, which may be confusing.
   */
  addToResourcePolicy(permission: iam.PolicyStatement): iam.AddToResourcePolicyResult {
    return this.bucket.addToResourcePolicy(permission);
  }
}
