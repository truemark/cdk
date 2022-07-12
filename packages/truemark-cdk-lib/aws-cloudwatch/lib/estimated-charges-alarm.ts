import {MetricAlarmBase, MetricAlarmBaseProps} from "./metric-alarm-base";
import {ExtendedAlarm} from "./extended-alarm";
import {ComparisonOperator, Metric} from "aws-cdk-lib/aws-cloudwatch";
import {MetricHelper} from "./metric-helper";

export interface EstimatedChargesAlarmProps extends MetricAlarmBaseProps {

  /**
   * Amount in USD the estimated charges must be greater than to tigger the alarm.
   */
  readonly maxMonthly: number;
}

/**
 * Creates an alarm for estimated charges on an account.
 */
export class EstimatedChargesAlarm extends MetricAlarmBase<EstimatedChargesAlarmProps> {

  protected createMetric(props: MetricAlarmBaseProps): Metric {
    let eprops = props as EstimatedChargesAlarmProps;
    console.log("printing props for todo-null param error: ", eprops)
    return MetricHelper.billingEstimatedCharges();
  }

  protected createAlarm(metric: Metric, props: MetricAlarmBaseProps): ExtendedAlarm {
    let eprops = props as EstimatedChargesAlarmProps;
    
    return new ExtendedAlarm(this, "Alarm", {
      ...props,
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      metric,
      threshold: eprops.maxMonthly
    });
  }
}
