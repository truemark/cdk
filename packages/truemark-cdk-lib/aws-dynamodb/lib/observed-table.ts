import {TableAlarms, TableAlarmsOptions} from "./table-alarms";
import {GlobalSecondaryIndexProps, Table, TableProps} from "aws-cdk-lib/aws-dynamodb";
import {Construct} from "constructs";

/**
 * Properties for ObservedTable.
 */
export interface ObservedTableProps extends TableProps, TableAlarmsOptions {}

/**
 * DynamoDB Table with CloudWatch Alarms.
 */
export class ObservedTable extends Table {

  readonly tableAlarms: TableAlarms;

  constructor(scope: Construct, id: string, props: ObservedTableProps) {
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
  addGlobalSecondaryIndex(props: GlobalSecondaryIndexProps) {
    super.addGlobalSecondaryIndex(props);
    this.tableAlarms.addGlobalSecondaryIndexMonitoring(props.indexName);
  }
}

