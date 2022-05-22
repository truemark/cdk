import {Metric} from "aws-cdk-lib/aws-cloudwatch";
import {Construct} from "constructs";
import {LogMetricFilter, LogMetricFilterProps} from "./log-metric-filter";
import {Duration} from "aws-cdk-lib";
import {ComparisonOperator, TreatMissingData} from "aws-cdk-lib/aws-cloudwatch/lib/alarm";
import {ExtendedAlarm} from "./extended-alarm";

/**
 * Properties for LogAlarm.
 */
export interface LogMetricAlarmProps extends LogMetricFilterProps {

  /**
   * The period over which statistics are applied
   *
   * Default is 5 minutes.
   */
  readonly period?: Duration

  // Below are fields from CreateAlarmOptions which we need to override

  /**
   * Name of the alarm
   *
   * @default Automatically generated name
   */
  readonly alarmName?: string;

  /**
   * Description for the alarm
   *
   * @default No description
   */
  readonly alarmDescription?: string;

  /**
   * Comparison to use to check if metric is breaching
   *
   * @default GreaterThanOrEqualToThreshold
   */
  readonly comparisonOperator?: ComparisonOperator;

  /**
   * The value against which the specified statistic is compared.
   *
   * @default 1
   */
  readonly threshold?: number;

  /**
   * The number of periods over which data is compared to the specified threshold.
   *
   * @default 3
   */
  readonly evaluationPeriods?: number;

  /**
   * Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant.
   *
   * Used only for alarms that are based on percentiles.
   *
   * @default - Not configured.
   */
  readonly evaluateLowSampleCountPercentile?: string;

  /**
   * Sets how this alarm is to handle missing data points.
   *
   * @default TreatMissingData.Missing
   */
  readonly treatMissingData?: TreatMissingData;

  /**
   * Whether the actions for this alarm are enabled
   *
   * @default true
   */
  readonly actionsEnabled?: boolean;

  /**
   * The number of datapoints that must be breaching to trigger the alarm. This is used only if you are setting an "M
   * out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
   * CloudWatch User Guide.
   *
   * @default 1
   *
   * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation
   */
  readonly datapointsToAlarm?: number;
}

/**
 * CloudWatch alarm that matches patterns on a LogGroup. This class is a higher-level
 * construct than LogMetricAlarm and will create the filter and metric.
 */
export class LogMetricAlarm extends ExtendedAlarm {

  /**
   * The filter created using the parent scope.
   */
  readonly filter: LogMetricFilter;

  /**
   * The metric created from the filter.
   */
  readonly metric: Metric

  /**
   * Creates a new LogAlarm.
   */
  constructor(scope: Construct, id: string, props: LogMetricAlarmProps) {

    const filter = new LogMetricFilter(scope, id + 'Filter', {
      ...props
    });

    const metric = filter.sumMetric(props.period);

    super(scope, id, {
      ...props,
      threshold: props.threshold??1,
      evaluationPeriods: props.evaluationPeriods??3,
      datapointsToAlarm: props.datapointsToAlarm??1,
      metric
    });

    this.filter = filter;
    this.metric = metric;
  }
}
