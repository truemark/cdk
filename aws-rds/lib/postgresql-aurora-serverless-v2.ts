import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as kms from "aws-cdk-lib/aws-kms";
import { Duration, RemovalPolicy } from 'aws-cdk-lib/core';

export interface PostgreSQLAuroraServerlessV2Props {
  /**
   * Name for the Database.
   */
  readonly databaseName?: string;

  /**
   * Optional scaling configuration for the Aurora Serverless Cluster.
   */
  readonly scaling?: rds.ServerlessScalingOptions;

  /**
   * Optional removal policy for the Aurora Serverless Cluster.
   * Determines the action on the cluster when the stack is deleted.
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Specifies whether the instances in the cluster are publicly accessible.
   * @default: false.
   */
  readonly publiclyAccessible?: boolean;

  /**
   * The number of days during which automatic DB snapshots are retained.
   * @default: duration.days(1).
   */
  readonly backupRetention?: Duration;

  /**
   * The KMS key for storage encryption.
   * the default master key will be used for storage encryption.
   */
  readonly encryptionKey?: kms.IKey;

  /**
   * Whether to enable the Data API.
   * @default: false.
   */
  readonly enableDataApi?: boolean;

  /**
   * Decides whether or not to rotate the password.
   * @default: false.
   */
  readonly rotatePassword?: boolean;

  /**
   * If the password is rotated this specifies how often.
   * @default: Duration.days(30).
   */
  readonly passwordRotationDuration?: Duration;
}

export class PostgreSQLAuroraServerlessV2 extends Construct {
  readonly cluster: rds.ServerlessCluster;

  constructor(scope: Construct, id: string, props: PostgreSQLAuroraServerlessV2Props) {
    super(scope, id);

    this.cluster = new rds.ServerlessCluster(this, 'AuroraServerlessCluster', {
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      scaling: props.scaling ?? {
        autoPause: Duration.minutes(10), // default auto-pause setting
        minCapacity: rds.AuroraCapacityUnit.ACU_8,  // default minimum capacity
        maxCapacity: rds.AuroraCapacityUnit.ACU_32, // default maximum capacity
      },
      defaultDatabaseName: props.databaseName,
      backupRetention: props.backupRetention ?? Duration.days(1),
      removalPolicy: props.removalPolicy ?? RemovalPolicy.RETAIN,
      storageEncryptionKey: props.encryptionKey,
      })
    };

    // Additional configurations and methods can be added here
  }
