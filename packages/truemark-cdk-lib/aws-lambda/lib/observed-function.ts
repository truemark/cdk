import {Duration} from "aws-cdk-lib";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {Alarm, IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {Function, FunctionProps, IFunction} from "aws-cdk-lib/aws-lambda";
import {MonitoringFacade} from "cdk-monitoring-constructs/lib/facade/MonitoringFacade";
import {
  CustomAlarmThreshold, DurationThreshold,
  ErrorCountThreshold, ErrorRateThreshold, HighTpsThreshold,
  IDashboardFactory,
  LatencyThreshold, LowTpsThreshold, MaxAgeThreshold, RunningTaskCountThreshold, UsageThreshold
} from "cdk-monitoring-constructs";
import {Construct} from "constructs";
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
import {StandardAlarmActionsStrategy} from "../../aws-monitoring";
import {ILogGroup} from "aws-cdk-lib/aws-logs";
import {LogMetricAlarm} from "../../aws-cloudwatch";

/**
 * Properties for a category of CloudWatch alarms for Lambda Functions
 */
export interface FunctionAlarmCategoryProps {

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
 * CloudWatch alarm properties for Lambda Functions
 */
export interface FunctionAlarmProps {
  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmProps?: FunctionAlarmCategoryProps

  /**
   * Alarm threshold for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmProps?: FunctionAlarmCategoryProps

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
 * Helper function to get the correct critical or warning properties from FunctionAlarmProps dynamically.
 *
 * @param props the properties holding the values
 * @param category the alarm category
 */
function getFunctionAlarmCategoryProps(props: FunctionAlarmProps, category: FunctionAlarmCategory): FunctionAlarmCategoryProps | undefined {
  const fprop: keyof FunctionAlarmProps = category == 'Critical' ? 'criticalAlarmProps' : 'warningAlarmProps';
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
}

/**
 * Internal class to assist in generating CustomAlarmThreshold instances.
 */
class FunctionAlarmFacade {

  readonly actions: IAlarmAction[]

  private props: FunctionAlarmFacadeProps

  constructor(props: FunctionAlarmFacadeProps) {
    this.props = props
    this.actions = combineActions(props.actions, props.topics);
  }

  toCustomAlarmThreshold(): CustomAlarmThreshold | undefined {
    if (this.props.threshold !== undefined || this.props.defaultThreshold !== undefined) {
      return {
        [this.props.prop]: this.props.threshold??this.props.defaultThreshold,
        actionsEnabled: true,
        actionOverride: new StandardAlarmActionsStrategy({actions: this.actions})
      }
    }
    return undefined
  }

  addCustomAlarmThreshold(category: FunctionAlarmCategory, record: Record<string, CustomAlarmThreshold>) {
    const c = this.toCustomAlarmThreshold();
    if (c !== undefined) {
      record[category] = c
    }
  }

}

/**
 * Properties for ObservedFunctionAlarms
 */
export interface ObservedFunctionAlarmsProps extends FunctionAlarmProps {

  /**
   * The function to observer.
   */
  readonly function: IFunction

  /**
   * The log group attached to the function to be observed.
   */
  readonly logGroup: ILogGroup
}

/**
 * Created CloudWatch alarms for a Lambda Function.
 */
export class ObservedFunctionAlarms extends Construct {

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
  readonly monitoring: MonitoringFacade;

  /**
   * Generated critical alarms.
   */
  readonly criticalAlarms: Alarm[];

  /**
   * Generated warning alarms.
   */
  readonly warningAlarms: Alarm[];

  private readonly props: ObservedFunctionAlarmsProps

  private addRecordValue(record: Record<string, CustomAlarmThreshold>,
                         category: FunctionAlarmCategory,
                         sprop: keyof FunctionAlarmCategoryProps,
                         tprop: string,
                         defaultThreshold?: number|Duration) {
    const fprops = getFunctionAlarmCategoryProps(this.props, category);
    new FunctionAlarmFacade({
      prop: tprop,
      threshold: fprops?.[sprop] as number | Duration,
      defaultThreshold,
      topics: fprops?.notifyTopics,
      actions: fprops?.notifyActions
    }).addCustomAlarmThreshold(category, record);
  }

  private toRecord(sprop: keyof FunctionAlarmCategoryProps, tprop: string, defaultThreshold?: number|Duration): Record<string, CustomAlarmThreshold> | undefined {
    const record: Record<string, CustomAlarmThreshold> = {}
    this.addRecordValue(record, FunctionAlarmCategory.Critical, sprop, tprop, defaultThreshold)
    this.addRecordValue(record, FunctionAlarmCategory.Warning, sprop, tprop, defaultThreshold)
    return Object.keys(record).length > 0 ? record : undefined
  }

  private addAlarm(category: FunctionAlarmCategory, ...alarm: Alarm[]) {
    const arr = category === FunctionAlarmCategory.Critical ? this.criticalAlarms : this.warningAlarms;
    arr.push(...alarm);
  }

  private addFunctionMonitoring() {
    this.monitoring.monitorLambdaFunction({
      lambdaFunction: this.props.function,
      addToAlarmDashboard: this.props.addToAlarmDashboard ?? true,
      addToDetailDashboard: this.props.addToDetailDashboard ?? true,
      addToSummaryDashboard: this.props.addToSummaryDashboard ?? true,
      addLatencyP50Alarm: this.toRecord('p50Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addLatencyP90Alarm: this.toRecord('p90Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addLatencyP99Alarm: this.toRecord('p99Latency', 'maxLatency') as Record<string, LatencyThreshold>,
      addFaultCountAlarm: this.toRecord('maxFaults', 'maxErrorCount', 0) as Record<string, ErrorCountThreshold>,
      addFaultRateAlarm: this.toRecord('avgFaults', 'maxErrorRate') as Record<string, ErrorRateThreshold>,
      addLowTpsAlarm: this.toRecord('minTps', 'minTps') as Record<string, LowTpsThreshold>,
      addHighTpsAlarm: this.toRecord('maxTps', 'maxTps') as Record<string, HighTpsThreshold>,
      addThrottlesCountAlarm: this.toRecord('maxThrottles', 'maxErrorCount', 0) as Record<string, ErrorCountThreshold>,
      addThrottlesRateAlarm: this.toRecord('avgThrottles', 'maxErrorRate') as Record<string, ErrorRateThreshold>,
      addConcurrentExecutionsCountAlarm: this.toRecord('maxConcurrentExecutions', 'maxRunningTasks') as Record<string, RunningTaskCountThreshold>,
      addMaxIteratorAgeAlarm: this.toRecord('maxIteratorAge', 'maxAgeInMillis') as Record<string, MaxAgeThreshold>,
      addEnhancedMonitoringMaxCpuTotalTimeAlarm: this.toRecord('maxCpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringP90CpuTotalTimeAlarm: this.toRecord('p90CpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringAvgCpuTotalTimeAlarm: this.toRecord('avgCpuTime', 'maxDuration') as Record<string, DurationThreshold>,
      addEnhancedMonitoringMaxMemoryUtilizationAlarm: this.toRecord('maxMemory', 'maxUsagePercent') as Record<string, UsageThreshold>,
      addEnhancedMonitoringP90MemoryUtilizationAlarm: this.toRecord('p90Memory', 'maxUsagePercent') as Record<string, UsageThreshold>,
      addEnhancedMonitoringAvgMemoryUtilizationAlarm: this.toRecord('avgMemory', 'maxUsagePercent') as Record<string, UsageThreshold>
    });

    // Add generated alarms to this object
    this.addAlarm(FunctionAlarmCategory.Critical, ...this.monitoring.createdAlarmsWithDisambiguator(FunctionAlarmCategory.Critical).map((awa) => awa.alarm));
    this.addAlarm(FunctionAlarmCategory.Warning, ...this.monitoring.createdAlarmsWithDisambiguator(FunctionAlarmCategory.Warning).map((awa) => awa.alarm));
  }

  private addLogMonitoringToDashboard() {
    let pattern = this.props.criticalAlarmProps?.dashboardLogPattern === undefined
        && this.props.warningAlarmProps?.dashboardLogPattern === undefined
        ? ObservedFunctionAlarms.DEFAULT_LOG_INSIGHTS_PATTERN
        : ''
    pattern += this.props.criticalAlarmProps?.dashboardLogPattern??'';
    pattern += (pattern !== ''? '|' : '') + this.props.warningAlarmProps?.dashboardLogPattern??'';
    if (pattern !== '') {
      this.monitoring.monitorLog({
        logGroupName: this.props.logGroup.logGroupName,
        pattern,
      });
    }
  }

  private addLogAlarm(category: FunctionAlarmCategory, defaultThreshold?: number) {
    const fprops = getFunctionAlarmCategoryProps(this.props, category);
    const threshold = fprops?.maxLogCount??defaultThreshold
    const pattern = fprops?.metricLogPattern??
      category === FunctionAlarmCategory.Critical
        ? ObservedFunctionAlarms.DEFAULT_CRITICAL_LOG_METRIC_PATTERN
        : ObservedFunctionAlarms.DEFAULT_WARNING_LOG_METRIC_PATTERN;
    if (threshold !== undefined && threshold > 0) {
      const logAlarm = new LogMetricAlarm(this, category + 'LogCount', {
        logGroup: this.props.logGroup,
        pattern,
        threshold,
        metricName: category + 'LogCount',
      });
      // Add generated alarm to this object
      this.addAlarm(category, logAlarm);
    }
  }

  constructor(scope: Construct, id: string, props: ObservedFunctionAlarmsProps) {
    super(scope, id);
    this.props = props;
    this.criticalAlarms = [];
    this.warningAlarms = [];

    this.monitoring = props.monitoringFacade ?? new MonitoringFacade(this, 'Monitoring', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix: scope.node.path.replace(/\//g, '')
      },
      dashboardFactory: props.dashboardFactory
    });

    this.addFunctionMonitoring();
    this.addLogMonitoringToDashboard();
    this.addLogAlarm(FunctionAlarmCategory.Critical, 1);
    this.addLogAlarm(FunctionAlarmCategory.Warning);
  }
}

/**
 * Properties for ObservedFunction.
 */
export interface ObservedFunctionProps extends FunctionProps, FunctionAlarmProps {}

/**
 * Lambda Function with CloudWatch alarms.
 */
export class ObservedFunction extends Function {

  /**
   * Creates a new Lambda Function.
   */
  constructor(scope: Construct, id: string, props: ObservedFunctionProps) {
    super(scope, id, props);

    new ObservedFunctionAlarms(this, 'Monitoring', {
      function: this,
      logGroup: this.logGroup,
      ...props
    });
  }
}
