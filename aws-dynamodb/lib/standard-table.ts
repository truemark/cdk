import {ExtendedTable} from './extended-table';
import {Construct} from 'constructs';
import {
  AttributeType,
  BillingMode,
  TableEncryption,
} from 'aws-cdk-lib/aws-dynamodb';
import {RemovalPolicy} from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';

/**
 * Properties for StandardTable.
 */
export interface StandardTableProps {
  /**
   * Regions where replica tables will be created
   *
   * @default - no replica tables are created
   */
  readonly replicationRegions?: string[];

  /**
   * The removal policy to apply to the DynamoDB Table.
   *
   * @default RemovalPolicy.RETAIN
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * Enables or disables deletion protection. Default is true.
   *
   * @default true
   */
  readonly deletionProtection?: boolean;

  /**
   * Whether point-in-time recovery is enabled. Default is false
   *
   * @default false
   */
  readonly pointInTimeRecovery?: boolean;

  /**
   * The read capacity for the table. Careful if you add Global Secondary Indexes, as
   * those will share the table's provisioned throughput.
   *
   * Can only be provided if billingMode is Provisioned.
   *
   * @default 5
   */
  readonly readCapacity?: number;

  /**
   * The write capacity for the table. Careful if you add Global Secondary Indexes, as
   * those will share the table's provisioned throughput.
   *
   * Can only be provided if billingMode is Provisioned.
   *
   * @default 5
   */
  readonly writeCapacity?: number;

  /**
   * Specify how you are charged for read and write throughput and how you manage capacity.
   *
   * @default Default is PAY_PER_REQUEST otherwise
   */
  readonly billingMode?: BillingMode;

  /**
   * Whether server-side encryption with an AWS managed customer master key is enabled.
   *
   * @default TableEncryption.AWS_MANAGED
   */
  readonly encryption?: TableEncryption;

  /**
   * External KMS key to use for table encryption.
   *
   * This property can only be set if `encryption` is set to `TableEncryption.CUSTOMER_MANAGED`.
   *
   * @default - If `encryption` is set to `TableEncryption.CUSTOMER_MANAGED` and this
   * property is undefined, a new KMS key will be created and associated with this table.
   */
  readonly encryptionKey?: kms.IKey;

  /**
   * The name of the TTL attribute on the table.
   */
  readonly timeToLiveAttribute?: string;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;

  /**
   * Creates additional global secondary indexes on the table with the partition key Gs#Pk and sort key Gs#Sk of string types. Default is 1.
   * Be aware you may only add one index at a time if the table already exists. This is a limitation of the DynamoDB API.
   *
   * @default 1
   */
  readonly globalSecondaryIndexes?: number;
}

/**
 * Standard DynamoDB table with a defined primary key, sort key and secondary index. This
 * class is intended to fit most development use cases. Where this class does not meet
 * your requirements, use ExtendedTable directly.
 */
export class StandardTable extends ExtendedTable {
  constructor(scope: Construct, id: string, props?: StandardTableProps) {
    super(scope, id, {
      timeToLiveAttribute: props?.timeToLiveAttribute,
      partitionKey: {
        name: 'Pk',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'Sk',
        type: AttributeType.STRING,
      },
      ...props,
      billingMode: props?.billingMode ?? BillingMode.PAY_PER_REQUEST,
      deletionProtection: props?.deletionProtection ?? true,
    });
    const indexCount = props?.globalSecondaryIndexes ?? 1;
    for (let i = 0; i < indexCount; i++) {
      this.addGlobalSecondaryIndex({
        indexName: `Gs${i + 1}`,
        partitionKey: {
          name: `Gs${i + 1}Pk`,
          type: AttributeType.STRING,
        },
        sortKey: {
          name: `Gs${i + 1}Sk`,
          type: AttributeType.STRING,
        },
      });
    }
  }
}
