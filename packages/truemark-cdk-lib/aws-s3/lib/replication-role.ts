import {Construct} from "constructs"
import {PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam"
import {IBucket} from "aws-cdk-lib/aws-s3"
import {Stack} from "aws-cdk-lib"

export class DestinationBucketOptions {
  readonly bucket: IBucket;
  readonly region: string;
}
export class ReplicationRoleProps {
  readonly sourceBucket: IBucket;
  readonly destinationBuckets: DestinationBucketOptions[];
}

export class ReplicationRole extends Construct {
  constructor(scope: Construct, id: string, props: ReplicationRoleProps) {
    super(scope, id);

    const stack = Stack.of(this);

    const replicationRole = new Role(this, "Main", {
      assumedBy: new ServicePrincipal("s3.amazonaws.com"),
    });

    replicationRole.addToPolicy(new PolicyStatement({
      actions: [
        "s3:ListBucket",
        "s3:GetReplicationConfiguration",
        "s3:GetObjectVersionForReplication",
        "s3:GetObjectVersionAcl",
        "s3:GetObjectVersionTagging",
        "s3:GetObjectRetention",
        "s3:GetObjectLegalHold"
      ],
      resources: [
          props.sourceBucket.bucketArn,
          `${props.sourceBucket.bucketArn}/*`,
          ...props.destinationBuckets.map(dest => dest.bucket.bucketArn),
          ...props.destinationBuckets.map(dest => `${dest.bucket.bucketArn}/*`)
      ]
    }));
    replicationRole.addToPolicy(new PolicyStatement({
      actions: ["s3:Replicate*", "s3:ObjectOwnerOverrideToBucketOwner"],
      resources: [
          `${props.sourceBucket.bucketArn}/*`,
          ...props.destinationBuckets.map(dest => `${dest.bucket.bucketArn}/*`)
      ]
    }));
    replicationRole.addToPolicy(new PolicyStatement({
      actions: ["kms:Encrypt"],
      resources: props.destinationBuckets.map(dest => `arn:aws:kms:${dest.region}:${stack.account}:key/*`)
    }));
    replicationRole.addToPolicy(new PolicyStatement({
      actions: ["kms:Decrypt"],
      resources: [`arn:aws:kms:${stack.region}:${stack.account}:key/*`]
    }));
  }
}