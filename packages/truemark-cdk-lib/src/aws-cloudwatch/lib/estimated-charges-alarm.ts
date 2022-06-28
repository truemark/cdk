import { ComparisonOperator, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { ExtendedAlarm } from './extended-alarm';
import { MetricAlarmBase, MetricAlarmBaseProps } from './metric-alarm-base';
import { MetricHelper } from './metric-helper';

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

  protected createMetric(_props: MetricAlarmBaseProps): Metric {
    return MetricHelper.billingEstimatedCharges();
  }

  protected createAlarm(metric: Metric, props: MetricAlarmBaseProps): ExtendedAlarm {
    return new ExtendedAlarm(this, 'Alarm', {
      ...props,
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      evaluationPeriods: 1,
      metric,
      threshold: (props as EstimatedChargesAlarmProps).maxMonthly,
    });
  }
}
