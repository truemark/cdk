import {AlarmsBase, AlarmsCategoryOptions, AlarmsOptions} from "../../aws-monitoring";
import {Construct} from "constructs";
import {IBucket} from "aws-cdk-lib/aws-s3";

export interface BucketAlarmsCategoryOptions extends AlarmsCategoryOptions {}

export interface BucketAlarmsOptions extends AlarmsOptions<BucketAlarmsCategoryOptions> {

  /**
   * Flag to create alarms.
   *
   * @default true
   */
  readonly createAlarms?: boolean;

}

export interface BucketAlarmProps extends BucketAlarmsOptions {

  readonly bucket: IBucket;

}

export class BucketAlarms extends AlarmsBase<BucketAlarmsCategoryOptions, BucketAlarmProps> {

  private addBucketMonitoring() {
    this.monitoringFacade.monitorS3Bucket({
      bucket: this.props.bucket,
      addToAlarmDashboard: this.props.addToAlarmDashboard??true,
      addToDetailDashboard: this.props.addToDetailDashboard??true,
      addToSummaryDashboard: this.props.addToSummaryDashboard??true,
    });
  }

  constructor(scope: Construct, id: string, props: BucketAlarmProps) {
    super(scope, id, props);
    if (props.createAlarms ?? true) {
      this.addBucketMonitoring();
    }
  }
}
