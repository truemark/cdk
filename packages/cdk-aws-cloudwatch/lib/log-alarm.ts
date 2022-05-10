import {Construct} from 'constructs';
import {
  Alarm,
  ComparisonOperator,
  CreateAlarmOptions,
  IAlarmAction,
  IMetric,
  TreatMissingData
} from 'aws-cdk-lib/aws-cloudwatch';
import {ILogGroup, MetricFilter} from 'aws-cdk-lib/aws-logs';
import {Duration} from 'aws-cdk-lib';
import {ITopic} from 'aws-cdk-lib/aws-sns';
import {SnsAction} from 'aws-cdk-lib/aws-cloudwatch-actions';

/**
 * Properties for LogAlarm
 */
export interface LogAlarmProps extends CreateAlarmOptions {

  /**
   * The log group to watch.
   *
   * If not set, the alarm and metric are not created.
   */
  readonly logGroup: ILogGroup,

  /**
   * The log pattern to match.
   */
  readonly pattern: string,

  /**
   * The namespace of the metric to emit.
   */
  readonly metricNamespace?: string,

  /**
   * The name of the metric to emit.
   *
   * Default value is the id passed into the Construct.
   */
  readonly metricName?: string,

  /**
   * The period over which statistics are applied
   *
   * Default is 5 minutes.
   */
  readonly metricPeriod?: Duration
}

/**
 * Create a CloudWatch Alarm to trigger when log patterns are matched
 */
export class LogAlarm extends Construct {

  readonly alarm: Alarm;
  readonly filter: MetricFilter;
  readonly metric: IMetric;

  constructor(scope: Construct, id: string, props: LogAlarmProps) {
    super(scope, id);
    this.filter = new MetricFilter(this, props.metricName??'' + 'Filter', {
      logGroup: props.logGroup,
      metricName: props.metricName??id,
      metricNamespace: props.metricNamespace??'TrueMark',
      defaultValue: 0,
      metricValue: "1",
      filterPattern: {
        logPatternString: props.pattern
      }
    });

    this.metric = this.filter.metric({
      statistic: 'Sum',
      period: props.metricPeriod??Duration.minutes(5),
    });

    this.alarm = new Alarm(this, props.metricName??'Alarm', {
      metric: this.metric,
      threshold: props.threshold??1,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: props.evaluationPeriods,
      datapointsToAlarm: props.datapointsToAlarm??1,
      treatMissingData: props.treatMissingData??TreatMissingData.MISSING
    });
  }

  addAlarmActions(actions?: IAlarmAction[]): LogAlarm {
    actions?.forEach((action) => {
      this.alarm.addAlarmAction(action);
    });
    return this;
  }

  addAlarmTopics(topics?: ITopic[]): LogAlarm {
    topics?.forEach((topic) => {
      this.alarm.addAlarmAction(new SnsAction(topic))
    });
    return this;
  }
}
