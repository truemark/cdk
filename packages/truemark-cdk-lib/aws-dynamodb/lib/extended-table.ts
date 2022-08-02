import {TableAlarms, TableAlarmsOptions} from "./table-alarms";
import {Table, TableProps} from "aws-cdk-lib/aws-dynamodb";
import {Construct} from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

/**
 * Properties for ObservedTable.
 */
export interface ExtendedTableProps extends TableProps, TableAlarmsOptions {}

/**
 * DynamoDB Table with CloudWatch Alarms.
 */
export class ExtendedTable extends Table {

  readonly tableAlarms: TableAlarms;

  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id, props);

    this.tableAlarms = new TableAlarms(this, "Alarms", {
      table: this,
      ...props
    });
  }

  /**
   * Add a global secondary index of table.
   *
   * @param props the property of global secondary index
   */
  addGlobalSecondaryIndex(props: dynamodb.GlobalSecondaryIndexProps) {
    super.addGlobalSecondaryIndex(props);
    this.tableAlarms.addGlobalSecondaryIndexMonitoring(props.indexName);
  }
}
