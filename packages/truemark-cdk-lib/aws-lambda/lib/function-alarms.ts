import {Duration, Names} from "aws-cdk-lib";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {Alarm, IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {
  CustomAlarmThreshold, DurationThreshold,
  ErrorCountThreshold, ErrorRateThreshold, HighTpsThreshold,
  IDashboardFactory,
  LatencyThreshold, LowTpsThreshold, MaxAgeThreshold,
  MonitoringFacade, RunningTaskCountThreshold, UsageThreshold
} from "cdk-monitoring-constructs";
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
import {StandardAlarmActionsStrategy} from "../../aws-monitoring";
import {IFunction} from "aws-cdk-lib/aws-lambda";
import {ILogGroup} from "aws-cdk-lib/aws-logs";
import {Construct} from "constructs";
import {LogMetricAlarm} from "../../aws-cloudwatch";

/**
 * Category options for CloudWatch alarms for Lambda Functions.
 */
export interface FunctionAlarmsCategoryOptions {

  /**
   * Maximum 50th percentile latency
   */
  readonly p50Latency?: Duration;

  /**
   * Maximum 90th percentile latency
   */
  readonly p90Latency?: Duration;

  /**
   * Maximum 99th percentile latency
   */
  readonly p99Latency?: Duration;

  /**
   * Maximum number of faults
   *
   * @default 0
   */
  readonly maxFaults?: number;

  /**
   * Average number of faults
   */
  readonly avgFaults?: number;

  /**
   * Minimum transactions
   */
  readonly minTps?: number;

  /**
   * Maximum transactions
   */
  readonly maxTps?: number;

  /**
   * Maximum number of throttles
   *
   * @default 0
   */
  readonly maxThrottles?: number;

  /**
   * Average number of throttles
   */
  readonly avgThrottles?: number;

  /**
   * Maximum concurrent executions
   */
  readonly maxConcurrentExecutions?: number;

  /**
   * Amount of time data waits before being processed by the function.
   * See https://aws.amazon.com/premiumsupport/knowledge-center/lambda-iterator-age/
   */
  readonly maxIteratorAge?: number;

  /**
   * Maximum amount of CPU time
   */
  readonly maxCpuTime?: Duration;

  /**
   * 90th percentile CPU time
   */
  readonly p90CpuTime?: Duration;

  /**
   * Average CPU time
   */
  readonly avgCpuTime?: Duration;

  /**
   * Maximum amount of memory
   */
  readonly maxMemory?: number;

  /**
   * 90th percentile memory
   */
  readonly p90Memory?: number;

  /**
   * Average memory
   */
  readonly avgMemory?: number;

  /**
   * Log pattern to match for metrics.
   *
   * @default '\\\[ERROR\\\]'
   */
  readonly metricLogPattern?: string

  /**
   * Maximum number of log events matching the metricLogPattern.
   *
   * @default 0 for Critical Alarm
   */
  readonly maxLogCount?: number

  /**
   * Number of evaluation periods over which data is compared for log events.
   *
   * @default 2
   */
  readonly logEvaluationPeriods?: number

  /**
   * Number of data points that must be breaching to trigger the alarm for log events.
   *
   * @default 1
   */
  readonly logDataPointsToAlarm?: number

  /**
   * Log pattern to match for the dashboard
   *
   * @default '"[ERROR]"'
   */
  readonly dashboardLogPattern?: string

  /**
   * Topics to send alarm notifications
   */
  readonly notifyTopics?: ITopic[];

  /**
   * Actions to send alarm notifications
   */
  readonly notifyActions?: IAlarmAction[];
}

/**
 * Options for CloudWatch alarms for Lambda Functions
 */
export interface FunctionAlarmsOptions {

  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmOptions?: FunctionAlarmsCategoryOptions

  /**
   * Alarm threshold for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmOptions?: FunctionAlarmsCategoryOptions

  /**
   * Main entry point for monitoring.
   *
   * If no value is provided, a default facade will be created.
   */
  readonly monitoringFacade?: MonitoringFacade

  /**
   * The DashboardFactory to use when generating CloudWatch dashboards.
   *
   * If not defined, dashboards are not generated.
   */
  readonly dashboardFactory?: IDashboardFactory;

  /**
   * Generate dashboard charts for Lambda insights metrics.
   *
   * @default true
   */
  readonly lambdaInsightsEnabled?: boolean;

  /**
   * Add widgets to alarm dashboard.
   *
   * @default true
   */
  readonly addToAlarmDashboard?: boolean;

  /**
   * Add widgets to detailed dashboard.
   *
   * @default true
   */
  readonly addToDetailDashboard?: boolean;

  /**
   * Add widgets to summary dashboard.
   *
   * @default true
   */
  readonly addToSummaryDashboard?: boolean;
}

/**
 * Helper function to get the correct critical or warning options from FunctionAlarmsOptions dynamically.
 *
 * @param props the properties holding the values
 * @param category the alarm category
 */
function getFunctionAlarmsCategoryOptions(props: FunctionAlarmsOptions, category: FunctionAlarmCategory): FunctionAlarmsCategoryOptions | undefined {
  const fprop: keyof FunctionAlarmsOptions = category === 'Critical' ? 'criticalAlarmOptions' : 'warningAlarmOptions';
  return props[fprop];
}

/**
 * Helper function to combine an array if IAlarmAction and ITopic objects into a single IAlarmAction array.
 *
 * @param actions the actions
 * @param topics the topics
 */
function combineActions(actions?: IAlarmAction[], topics?: ITopic[]): IAlarmAction[] {
  const combined: IAlarmAction[] = []
  actions?.forEach((action) => combined.push(action));
  topics?.forEach((topic) => combined.push(new SnsAction(topic)));
  return combined;
}

/**
 * Used to disambiguate warning and critical alarms.
 */
export enum FunctionAlarmCategory {
  Critical = 'Critical',
  Warning = 'Warning'
}

/**
 * Properties for FunctionAlarmFacade.
 */
interface FunctionAlarmFacadeProps {
  prop: string;
  threshold?: number | Duration;
  defaultThreshold?: number | Duration;
  topics?: ITopic[];
  actions?: IAlarmAction[];
  alarmNameOverride: string;
}

/**
 * Internal class to assist in generating CustomAlarmThreshold instances.
 */
class FunctionAlarmFacade {

  readonly actions: IAlarmAction[];

  private props: FunctionAlarmFacadeProps;

  constructor(props: FunctionAlarmFacadeProps) {
    this.props = props
    this.actions = combineActions(props.actions, props.topics);
  }

  toCustomAlarmThreshold(): CustomAlarmThreshold | undefined {
    if (this.props.threshold !== undefined || this.props.defaultThreshold !== undefined) {
      return {
        [this.props.prop]: this.props.threshold??this.props.defaultThreshold,
        actionsEnabled: true,
        actionOverride: new StandardAlarmActionsStrategy({actions: this.actions}),
        alarmNameOverride: this.props.alarmNameOverride
      };
    }
    return undefined;
  }

  addCustomAlarmThreshold(category: FunctionAlarmCategory, record: Record<string, CustomAlarmThreshold>) {
    const c = this.toCustomAlarmThreshold();
    if (c !== undefined) {
      record[category] = c;
    }
  }
}

/**
 * Properties for FunctionAlarms
 */
export interface FunctionAlarmsProps extends FunctionAlarmsOptions {

  /**
   * The function to observe.
   */
  readonly function: IFunction

  /**
   * The log group attached to the function to be observed.
   */
  readonly logGroup: ILogGroup
}

/**
 * Creates CloudWatch alarms for a Lambda Function.
 */
export class FunctionAlarms extends Construct {

  /**
   * Default pattern used for the critical log metric.
   */
  static readonly DEFAULT_CRITICAL_LOG_METRIC_PATTERN = '"[ERROR]"';

  /**
   * Default pattern used for the warning log metric.
   */
  static readonly DEFAULT_WARNING_LOG_METRIC_PATTERN = '"[WARNING]"';

  /**
   * Default pattern used to show logs on the CloudWatch dashboard.
   */
  static readonly DEFAULT_LOG_INSIGHTS_PATTERN = '\\\[ERROR\\\]|\\\[WARNING\\\]';

  /**
   * The MonitoringFacade instance either passed in or generated.
   */
  readonly monitoringFacade: MonitoringFacade;

  /**
   * Generated critical alarms.
   */
  readonly criticalAlarms: Alarm[];

  /**
   * Generated warning alarms.
   */
  readonly warningAlarms: Alarm[];

  private readonly props: FunctionAlarmsProps;
  private readonly alarmNamePrefix: string;

  private addRecordValue(record: Record<string, CustomAlarmThreshold>,
                         category: FunctionAlarmCategory,
                         alarmNameOverride: string,
                         sprop: keyof FunctionAlarmsCategoryOptions,
                         tprop: string,
                         defaultThreshold?: number|Duration) {
    const fprops = getFunctionAlarmsCategoryOptions(this.props, category);
    new FunctionAlarmFacade({
      prop: tprop,
      threshold: fprops?.[sprop] as number | Duration,
      defaultThreshold,
      topics: fprops?.notifyTopics,
      actions: fprops?.notifyActions,
      alarmNameOverride: alarmNameOverride + "-" + category
    }).addCustomAlarmThreshold(category, record);
  }

  private toRecord(alarmNameOverride: string, sprop: keyof FunctionAlarmsCategoryOptions, tprop: string, defaultThreshold?: number|Duration): Record<string, CustomAlarmThreshold> | undefined {
    const record: Record<string, CustomAlarmThreshold> = {};
    this.addRecordValue(record, FunctionAlarmCategory.Critical, alarmNameOverride, sprop, tprop, defaultThreshold);
    this.addRecordValue(record, FunctionAlarmCategory.Warning, alarmNameOverride, sprop, tprop, defaultThreshold);
    return Object.keys(record).length > 0 ? record : undefined;
  }

  private addAlarm(category: FunctionAlarmCategory, ...alarm: Alarm[]) {
    const arr = category === FunctionAlarmCategory.Critical ? this.criticalAlarms : this.warningAlarms;
    arr.push(...alarm);
  }

  private addFunctionMonitoring() {
    this.monitoringFacade.monitorLambdaFunction({
      lambdaFunction: this.props.function,
      addToAlarmDashboard: this.props.addToAlarmDashboard ?? true,
      addToDetailDashboard: this.props.addToDetailDashboard ?? true,
      addToSummaryDashboard: this.props.addToSummaryDashboard ?? true,
      addLatencyP50Alarm: this.toRecord(this.alarmNamePrefix + '-P50Latency', 'p50Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addLatencyP90Alarm: this.toRecord(this.alarmNamePrefix + '-P90Latency', 'p90Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addLatencyP99Alarm: this.toRecord(this.alarmNamePrefix + '-P99Latency', 'p99Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addFaultCountAlarm: this.toRecord(this.alarmNamePrefix + '-MaxFaults', 'maxFaults', 'maxErrorCount', 0) as Record<string, ErrorCountThreshold>,
      addFaultRateAlarm: this.toRecord(this.alarmNamePrefix + '-AvgFaults', 'avgFaults', 'maxErrorRate') as Record<string, ErrorRateThreshold>,
      addLowTpsAlarm: this.toRecord(this.alarmNamePrefix + '-MinTps', 'minTps', 'minTps') as Record<string, LowTpsThreshold>,
      addHighTpsAlarm: this.toRecord(this.alarmNamePrefix + '-MaxTps', 'maxTps', 'maxTps') as Record<string, HighTpsThreshold>,
      addThrottlesCountAlarm: this.toRecord(this.alarmNamePrefix + '-MaxThrottles', 'maxThrottles', 'maxErrorCount', 0) as Record<string, ErrorCountThreshold>,
      addThrottlesRateAlarm: this.toRecord(this.alarmNamePrefix + '-AvgThrottles', 'avgThrottles', 'maxErrorRate') as Record<string, ErrorRateThreshold>,
      addConcurrentExecutionsCountAlarm: this.toRecord(this.alarmNamePrefix + '-MaxConcurrentExecutions', 'maxConcurrentExecutions', 'maxRunningTasks') as Record<string, RunningTaskCountThreshold>,
      addMaxIteratorAgeAlarm: this.toRecord(this.alarmNamePrefix + '-MaxIteratorAge', 'maxIteratorAge', 'maxAgeInMillis') as Record<string, MaxAgeThreshold>,
      addEnhancedMonitoringMaxCpuTotalTimeAlarm: this.toRecord(this.alarmNamePrefix + '-MaxCpuTime', 'maxCpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringP90CpuTotalTimeAlarm: this.toRecord(this.alarmNamePrefix + '-P90CpuTime', 'p90CpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringAvgCpuTotalTimeAlarm: this.toRecord(this.alarmNamePrefix + '0AvgCpuTime', 'avgCpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringMaxMemoryUtilizationAlarm: this.toRecord(this.alarmNamePrefix + '-MaxMemory', 'maxMemory', 'maxUsagePercent') as Record<string, UsageThreshold>,
      addEnhancedMonitoringP90MemoryUtilizationAlarm: this.toRecord(this.alarmNamePrefix + '-P90Memory', 'p90Memory', 'maxUsagePercent') as Record<string, UsageThreshold>,
      addEnhancedMonitoringAvgMemoryUtilizationAlarm: this.toRecord(this.alarmNamePrefix + '-AvgMemory', 'avgMemory', 'maxUsagePercent') as Record<string, UsageThreshold>
    });

    // Add generated alarms to this object
    this.addAlarm(FunctionAlarmCategory.Critical, ...this.monitoringFacade.createdAlarmsWithDisambiguator(FunctionAlarmCategory.Critical).map((awa) => awa.alarm));
    this.addAlarm(FunctionAlarmCategory.Warning, ...this.monitoringFacade.createdAlarmsWithDisambiguator(FunctionAlarmCategory.Warning).map((awa) => awa.alarm));
  }

  private addLogMonitoringToDashboard() {
    let pattern = this.props.criticalAlarmOptions?.dashboardLogPattern === undefined
    && this.props.warningAlarmOptions?.dashboardLogPattern === undefined
      ? FunctionAlarms.DEFAULT_LOG_INSIGHTS_PATTERN
      : ''
    pattern += this.props.criticalAlarmOptions?.dashboardLogPattern??'';
    pattern += (pattern !== ''? '|' : '') + this.props.warningAlarmOptions?.dashboardLogPattern??'';
    if (pattern !== '') {
      this.monitoringFacade.monitorLog({
        logGroupName: this.props.logGroup.logGroupName,
        pattern,
      });
    }
  }

  private addLogAlarm(category: FunctionAlarmCategory, defaultThreshold?: number) {
    const fprops = getFunctionAlarmsCategoryOptions(this.props, category);
    const threshold = fprops?.maxLogCount??defaultThreshold
    const pattern = fprops?.metricLogPattern??
    category === FunctionAlarmCategory.Critical
      ? FunctionAlarms.DEFAULT_CRITICAL_LOG_METRIC_PATTERN
      : FunctionAlarms.DEFAULT_WARNING_LOG_METRIC_PATTERN;
    const evaluationPeriods = fprops?.logEvaluationPeriods??2
    const datapointsToAlarm = fprops?.logDataPointsToAlarm??1
    if (threshold !== undefined && threshold > 0) {
      const logAlarm = new LogMetricAlarm(this, category + 'LogCount', {
        logGroup: this.props.logGroup,
        pattern,
        threshold,
        evaluationPeriods,
        datapointsToAlarm,
        metricName: category + 'LogCount',
      });
      // Add generated alarm to this object
      this.addAlarm(category, logAlarm.alarm);
    }
  }

  constructor(scope: Construct, id: string, props: FunctionAlarmsProps) {
    super(scope, id);
    this.props = props;
    this.criticalAlarms = [];
    this.warningAlarms = [];

    this.alarmNamePrefix = Names.uniqueId(props.function);

    this.monitoringFacade = props.monitoringFacade??new MonitoringFacade(this, 'MonitoringFacade', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix: this.alarmNamePrefix
      },
      dashboardFactory: props.dashboardFactory
    });

    this.addFunctionMonitoring();
    this.addLogMonitoringToDashboard();
    this.addLogAlarm(FunctionAlarmCategory.Critical, 1);
    this.addLogAlarm(FunctionAlarmCategory.Warning);
  }
}
