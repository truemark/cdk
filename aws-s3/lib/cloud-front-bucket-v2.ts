import {Construct} from 'constructs';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  CorsRule,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3';
import {
  IOrigin,
  S3OriginAccessControl,
  Signing,
} from 'aws-cdk-lib/aws-cloudfront';
import {
  BucketDeployment,
  CacheControl,
  ISource,
  Source,
} from 'aws-cdk-lib/aws-s3-deployment';
import {Duration, RemovalPolicy, Stack} from 'aws-cdk-lib';
import {
  ExtendedConstruct,
  ExtendedConstructProps,
  StandardTags,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';
import {S3BucketOrigin} from 'aws-cdk-lib/aws-cloudfront-origins';
import {Effect, Grant, IGrantable, PolicyStatement} from 'aws-cdk-lib/aws-iam';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface CloudFrontBucketV2DeploymentConfig {
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
   * Sets the max-age in the Cache-Control header. Default is 15 minutes.
   */
  readonly maxAge?: Duration;

  /**
   * Sets the s-maxage in the Cache-Control header. Default is 7 days.
   */
  readonly sMaxAge?: Duration;

  /**
   * Additional Cache-Control directives to set. Default is none.
   */
  readonly cacheControl?: CacheControl[];

  /**
   * Whether to prune objects that exist in the bucket but not in the assets. Default is false.
   */
  readonly prune?: boolean;
}

/**
 * Properties for CloudFrontBucketV2.
 */
export interface CloudFrontBucketV2Props extends ExtendedConstructProps {
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

  /**
   * Optional bucket name. If not provided, a name will be generated.
   */
  readonly bucketName?: string;

  /**
   * The CORS configuration of this bucket.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html
   *
   * @default - No CORS configuration.
   */
  readonly cors?: CorsRule[];

  /**
   * Whether to enable EventBridge for this bucket. Default is false.
   */
  readonly eventBridgeEnabled?: boolean;

  /**
   * Set how CloudFront signs requests. Default is Signing.SIGV4_NO_OVERRIDE.
   */
  readonly signing?: Signing;
}

/**
 * Creates a bucket for use with CloudFront using Origin Access Control (OAC).
 */
export class CloudFrontBucketV2 extends ExtendedConstruct {
  private deployCount = 0;

  readonly bucket: Bucket;
  readonly bucketName: string;
  readonly bucketArn: string;
  readonly originAccessControlId: string;

  private nextDeployCount(): string {
    const current = this.deployCount++;
    return current === 0 ? '' : `${current}`;
  }

  constructor(scope: Construct, id: string, props?: CloudFrontBucketV2Props) {
    super(scope, id, {
      standardTags: StandardTags.merge(props?.standardTags, LibStandardTags),
    });

    const removalPolicy = props?.removalPolicy ?? RemovalPolicy.RETAIN;
    const autoDeleteObjects =
      (props?.autoDeleteObjects ?? false) &&
      removalPolicy === RemovalPolicy.DESTROY;

    this.bucket = new Bucket(this, 'Default', {
      bucketName: props?.bucketName,

      // Do not allow public access
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,

      // Disables ACLs on the bucket and we use policies to define access
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,

      // CloudFront cannot use KMS with S3
      encryption: BucketEncryption.S3_MANAGED,

      removalPolicy,
      autoDeleteObjects,
      versioned: props?.versioned ?? false,
      transferAcceleration: props?.transferAcceleration ?? false,
      eventBridgeEnabled: props?.eventBridgeEnabled ?? false,
      cors: props?.cors,
    });
    this.bucketName = this.bucket.bucketName;
    this.bucketArn = this.bucket.bucketArn;

    // Grant read access to CloudFront distributions in this account
    this.bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        actions: ['s3:GetObject'],
        resources: [this.bucket.arnForObjects('*')],
        conditions: {
          ArnLike: {
            'aws:SourceArn': `arn:aws:cloudfront::${Stack.of(this).account}:distribution/*`,
          },
        },
      }),
    );

    const oac = new S3OriginAccessControl(this, 'AccessControl', {
      signing: props?.signing ?? Signing.SIGV4_NO_OVERRIDE,
    });
    this.originAccessControlId = oac.originAccessControlId;
  }

  deploy(
    config:
      | CloudFrontBucketV2DeploymentConfig
      | CloudFrontBucketV2DeploymentConfig[],
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
      const cacheControl = c.cacheControl ?? [
        CacheControl.maxAge(c.maxAge ?? Duration.minutes(15)),
        CacheControl.sMaxAge(c.sMaxAge ?? Duration.days(7)),
      ];
      const deploy = new BucketDeployment(
        this,
        `Deploy${this.nextDeployCount()}`,
        {
          sources,
          destinationBucket: this.bucket,
          destinationKeyPrefix: c.prefix,
          prune: c.prune,
          cacheControl,
          exclude,
        },
      );
      deploy.node.addDependency(this.bucket);
    }
  }

  /**
   * Helper method to return a CloudFront Origin for this bucket.
   */
  toOrigin(): IOrigin {
    return S3BucketOrigin.withOriginAccessControl(this.bucket, {
      originAccessControlId: this.originAccessControlId,
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
  grantRead(identity: IGrantable, objectsKeyPattern?: unknown): Grant {
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
  grantWrite(
    identity: IGrantable,
    objectsKeyPattern?: unknown,
    allowedActionPatterns?: string[],
  ): Grant {
    return this.bucket.grantWrite(
      identity,
      objectsKeyPattern,
      allowedActionPatterns,
    );
  }

  /**
   * Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.
   *
   * If encryption is used, permission to use the key to encrypt the contents
   * of written files will also be granted to the same principal.
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantPut(identity: IGrantable, objectsKeyPattern?: unknown): Grant {
    return this.bucket.grantPut(identity, objectsKeyPattern);
  }

  /**
   * Grants s3:DeleteObject* permission to an IAM principal for objects
   * in this bucket.
   *
   * @param identity The principal
   * @param objectsKeyPattern Restrict the permission to a certain key pattern (default '*')
   */
  grantDelete(identity: IGrantable, objectsKeyPattern?: unknown): Grant {
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
  grantReadWrite(identity: IGrantable, objectsKeyPattern?: unknown): Grant {
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
  addToResourcePolicy(
    permission: iam.PolicyStatement,
  ): iam.AddToResourcePolicyResult {
    return this.bucket.addToResourcePolicy(permission);
  }
}
