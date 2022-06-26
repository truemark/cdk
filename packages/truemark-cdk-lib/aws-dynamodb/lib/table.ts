import {TableAlarms, TableAlarmsOptions} from "./table-alarms";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import {Construct} from "constructs";

/**
 * Properties for ObservedTable.
 */
export interface TableProps extends dynamodb.TableProps, TableAlarmsOptions {}

/**
 * DynamoDB Table with CloudWatch Alarms.
 */
export class Table extends dynamodb.Table {

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

