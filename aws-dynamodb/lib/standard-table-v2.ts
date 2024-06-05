import {ExtendedTablePropsV2, ExtendedTableV2} from './extended-table-v2';
import {Construct} from 'constructs';
import {AttributeType, Capacity} from 'aws-cdk-lib/aws-dynamodb';
import {RemovalPolicy} from 'aws-cdk-lib';
import {GlobalSecondaryIndexPropsV2} from 'aws-cdk-lib/aws-dynamodb/lib/table-v2';

type StandardGlobalSecondaryIndexPropsV2OmitFields =
  | 'partitionKey'
  | 'sortKey'
  | 'indexName';

type StandardGlobalSecondaryIndexPropsV2 = Omit<
  GlobalSecondaryIndexPropsV2,
  StandardGlobalSecondaryIndexPropsV2OmitFields
>;

type StandardTablePropsV2OmitFields =
  | 'tableName'
  | 'partitionKey'
  | 'sortKey'
  | 'globalSecondaryIndexes';

export interface StandardTablePropsV2
  extends Omit<ExtendedTablePropsV2, StandardTablePropsV2OmitFields> {
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

  /**
   * The default read capacity for secondary global indexes. If you want per index settings, use addGlobalSecondaryIndex and set globalSecondaryIndexes to 0.
   *
   * Can only be provided if billingMode is Provisioned.
   *
   * @default is to inherit from the primary table
   */
  readonly globalSecondaryIndexReadCapacity?: Capacity;

  /**
   * The default read capacity for secondary global indexes. If you want per index settings, use addGlobalSecondaryIndex and set globalSecondaryIndexes to 0.
   *
   * Can only be provided if billingMode is Provisioned.
   *
   * @default is to inherit from the primary table
   */
  readonly globalSecondaryIndexWriteCapacity?: Capacity;
}

/**
 * Standard DynamoDB Table V2 with a defined primary key and sort key.
 */
export class StandardTableV2 extends ExtendedTableV2 {
  protected secondaryIndexCount = 0;
  constructor(scope: Construct, id: string, props?: StandardTablePropsV2) {
    const {
      globalSecondaryIndexes,
      globalSecondaryIndexReadCapacity,
      globalSecondaryIndexWriteCapacity,
      ...rest
    } = props || {};
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
      deletionProtection: props?.deletionProtection ?? true,
      removalPolicy: props?.removalPolicy ?? RemovalPolicy.RETAIN,
      ...rest,
    });
    for (let i = 0; i < (globalSecondaryIndexes ?? 1); i++) {
      this.addGlobalSecondaryIndex({
        readCapacity: globalSecondaryIndexReadCapacity,
        writeCapacity: globalSecondaryIndexWriteCapacity,
      });
    }
  }

  /**
   * Add a global secondary index of table.
   *
   * @param props the property of global secondary index
   */
  addGlobalSecondaryIndex(props: StandardGlobalSecondaryIndexPropsV2) {
    this.secondaryIndexCount++;
    const indexName = `Gs${this.secondaryIndexCount}`;
    super.addGlobalSecondaryIndex({
      indexName,
      partitionKey: {
        name: `Gs${this.secondaryIndexCount}Pk`,
        type: AttributeType.STRING,
      },
      sortKey: {
        name: `Gs${this.secondaryIndexCount + 1}Sk`,
        type: AttributeType.STRING,
      },
      ...props,
    });
    if (this.tableAlarms) {
      this.tableAlarms.addGlobalSecondaryIndexMonitoring(indexName);
    }
  }
}
