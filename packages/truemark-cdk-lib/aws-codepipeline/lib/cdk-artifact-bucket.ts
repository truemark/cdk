import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";
import {Construct} from "constructs";
import {RemovalPolicy} from "aws-cdk-lib";
import {IKey, Key} from "aws-cdk-lib/aws-kms";
import {AccountPrincipal, Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";

/**
 * Properties for CdkArtifactBucket.
 */
export interface CdkArtifactBucketProps {
  /**
   * By default, CDK will create KMS keys for cross account deployments. This
   * can be costly if you have a large number of pipelines. This property
   * allows a common key to be shared across pipelines.
   */
  readonly keyArn: string;

  /**
   * List of AWS account IDs that should have access to this bucket.
   */
  readonly accountIds: string[];
}

/**
 * Class used to override CDK's default artifact bucket. Unlike the bucket created
 * by CDK, this bucket will be deleted when the stack is deleted.
 */
export class CdkArtifactBucket extends Bucket {

  readonly encryptionKey: IKey;

  constructor(scope: Construct, id: string, props: CdkArtifactBucketProps) {
    const encryptionKey = Key.fromKeyArn(scope, id + 'Key', props.keyArn);

    super(scope, id, {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryptionKey
    });

    this.addToResourcePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:Get*",
        "s3:List*"
      ],
      principals: props.accountIds.map((id) => new AccountPrincipal(id)),
      resources: [
        this.arnForObjects('*'),
        this.bucketArn
      ]
    }));

    this.encryptionKey = encryptionKey;
  }
}
