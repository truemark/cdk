// import {Construct} from "constructs";
// import {Duration} from "aws-cdk-lib";
// import {ITopic} from "aws-cdk-lib/aws-sns";
// import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
// import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
// import {MonitoringFacade} from "cdk-monitoring-constructs/lib/facade/MonitoringFacade";
// import {
//   CustomAlarmThreshold,
//   DurationThreshold,
//   ErrorCountThreshold,
//   ErrorRateThreshold, HighTpsThreshold,
//   IDashboardFactory,
//   LatencyThreshold,
//   LowTpsThreshold, MaxAgeThreshold, RunningTaskCountThreshold, UsageThreshold
// } from "cdk-monitoring-constructs";
// import {Function} from "aws-cdk-lib/aws-lambda";
// import {LogAlarm} from "../../aws-cloudwatch";
// import {StandardAlarmActionsStrategy} from "../../aws-monitoring";
// //
// // /**
// //  * CloudWatch alarm properties for lambda functions.
// //  */
// // export interface FunctionAlarmProps {
// //   /**
// //    * Maximum 50th percentile latency
// //    */
// //   readonly p50Latency?: Duration;
// //
// //   /**
// //    * Maximum 90th percentile latency
// //    */
// //   readonly p90Latency?: Duration;
// //
// //   /**
// //    * Maximum 99th percentile latency
// //    */
// //   readonly p99Latency?: Duration;
// //
// //   /**
// //    * Maximum number of faults
// //    *
// //    * @default 0
// //    */
// //   readonly maxFaults?: number;
// //
// //   /**
// //    * Average number of faults
// //    */
// //   readonly avgFaults?: number;
// //
// //   /**
// //    * Minimum transactions
// //    */
// //   readonly minTps?: number;
// //
// //   /**
// //    * Maximum transactions
// //    */
// //   readonly maxTps?: number;
// //
// //   /**
// //    * Maximum number of throttles
// //    *
// //    * @default 0
// //    */
// //   readonly maxThrottles?: number;
// //
// //   /**
// //    * Average number of throttles
// //    */
// //   readonly avgThrottles?: number;
// //
// //   /**
// //    * Maximum concurrent executions
// //    */
// //   readonly maxConcurrentExecutions?: number;
// //
// //   /**
// //    * Amount of time data waits before being processed by the function.
// //    * See https://aws.amazon.com/premiumsupport/knowledge-center/lambda-iterator-age/
// //    */
// //   readonly maxIteratorAge?: number;
// //
// //   /**
// //    * Maximum amount of CPU time
// //    */
// //   readonly maxCpuTime?: Duration;
// //
// //   /**
// //    * 90th percentile CPU time
// //    */
// //   readonly p90CpuTime?: Duration;
// //
// //   /**
// //    * Average CPU time
// //    */
// //   readonly avgCpuTime?: Duration;
// //
// //   /**
// //    * Maximum amount of memory
// //    */
// //   readonly maxMemory?: number;
// //
// //   /**
// //    * 90th percentile memory
// //    */
// //   readonly p90Memory?: number;
// //
// //   /**
// //    * Average memory
// //    */
// //   readonly avgMemory?: number;
// //
// //   /**
// //    * Log pattern to match for metrics.
// //    *
// //    * @default '\\\[ERROR\\\]'
// //    */
// //   readonly metricLogPattern?: string
// //
// //   /**
// //    * Log pattern to match for the dashboard
// //    *
// //    * @default '"[ERROR]"'
// //    */
// //   readonly dashboardLogPattern?: string
// //
// //   /**
// //    * Maximum number of log events matching the pattern.
// //    *
// //    * @default 0 for Critical Alarm
// //    */
// //   readonly maxLogCount?: number
// //
// //   /**
// //    * Topics to send alarm notifications
// //    */
// //   readonly notifyTopics?: ITopic[];
// //
// //   /**
// //    * Actions to send alarm notifications
// //    */
// //   readonly notifyActions?: IAlarmAction[];
// // }
// //
// // export interface FunctionAlarmsProps {
// //
// //   /**
// //    * Alarm thresholds for critical alarms.
// //    *
// //    * If no properties are provided, a set of default alarms are created.
// //    */
// //   readonly criticalAlarmsProps?: FunctionAlarmProps
// //
// //   /**
// //    * Alarm threshold for warning alarms.
// //    *
// //    * If no properties are provided, a set of default alarms are created.
// //    */
// //   readonly warningAlarmsProps?: FunctionAlarmProps
// //
// //   /**
// //    * Main entry point for monitoring.
// //    *
// //    * If no value is provided, a default facade will be created.
// //    */
// //   readonly monitoringFacade?: MonitoringFacade
// //
// //   /**
// //    * The DashboardFactory to use when generating CloudWatch dashboards.
// //    *
// //    * If not defined, dashboards are not generated.
// //    */
// //   readonly dashboardFactory?: IDashboardFactory;
// //
// //   /**
// //    * The function for which to create alarms.
// //    */
// //   readonly function: Function;
// // }
//
// function toAlarmProps(
//   prop: string,
//   warningThreshold?: number | Duration,
//   criticalThreshold?: number | Duration,
//   warningAlarmActions?: IAlarmAction[],
//   criticalAlarmActions?: IAlarmAction[],
//   warningDefaultThreshold?: number | Duration,
//   criticalDefaultThreshold?: number | Duration
// ): Record<string, CustomAlarmThreshold> | undefined {
//   let alarmProps: Record<string, CustomAlarmThreshold> = {}
//   if (criticalThreshold !== undefined) {
//     alarmProps.Critical = {
//       [prop]: criticalThreshold,
//       actionsEnabled: true,
//       actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
//     }
//   } else if (criticalDefaultThreshold !== undefined) {
//     alarmProps.Critical = {
//       [prop]: criticalDefaultThreshold,
//       actionsEnabled: true,
//       actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
//     }
//   }
//   if (warningThreshold !== undefined) {
//     alarmProps.Warning = {
//       [prop]: warningThreshold,
//       actionsEnabled: true,
//       actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
//     }
//   } else if (warningDefaultThreshold !== undefined) {
//     alarmProps.Warning = {
//       [prop]: warningDefaultThreshold,
//       actionsEnabled: true,
//       actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
//     }
//   }
//   return Object.keys(alarmProps).length > 0 ? alarmProps : undefined
// }
//
// /**
//  * Creates CloudWatch alarms and dashboards for a Lambda Function
//  */
// export class FunctionAlarms extends Construct {
//
//   static readonly DEFAULT_LOG_METRIC_PATTERN = '"[ERROR]"';
//   static readonly DEFAULT_LOG_INSIGHTS_PATTERN = '\\\[ERROR\\\]';
//   readonly declare monitoring: MonitoringFacade;
//   readonly declare criticalLogAlarm: LogAlarm;
//   readonly declare warningLogAlarm: LogAlarm;
//
//   constructor(scope: Construct, id: string, props: FunctionAlarmsProps) {
//     super(scope, id);
//
//     this.monitoring = props.monitoringFacade??new MonitoringFacade(this, 'Monitoring', {
//       metricFactoryDefaults: {},
//       alarmFactoryDefaults: {
//         actionsEnabled: true,
//         alarmNamePrefix: scope.node.path.replace(/\//g, '-'),
//       },
//       dashboardFactory: props.dashboardFactory
//     });
//
//     const warnProps = props.warningAlarmsProps;
//     const warnActions: IAlarmAction[] = [];
//     warnProps?.notifyActions?.forEach((action) => warnActions.push(action));
//     warnProps?.notifyTopics?.forEach((topic) => warnActions.push(new SnsAction(topic)));
//     const critProps = props.criticalAlarmsProps;
//     const critActions: IAlarmAction[] = [];
//     critProps?.notifyActions?.forEach((action) => critActions.push(action));
//     critProps?.notifyTopics?.forEach((topic) => critActions.push(new SnsAction(topic)));
//
//     this.monitoring.monitorLambdaFunction({
//       lambdaFunction: props.function,
//       lambdaInsightsEnabled: true,
//       addToAlarmDashboard: true,
//       addToDetailDashboard: true,
//       addToSummaryDashboard: true,
//       addLatencyP50Alarm: toAlarmProps('maxLatency', warnProps?.p50Latency, critProps?.p50Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
//       addLatencyP90Alarm: toAlarmProps('maxLatency', warnProps?.p90Latency, critProps?.p90Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
//       addLatencyP99Alarm: toAlarmProps('maxLatency', warnProps?.p99Latency, critProps?.p99Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
//       addFaultCountAlarm: toAlarmProps('maxErrorCount', warnProps?.maxFaults, critProps?.maxFaults, warnActions, critActions, undefined, 0) as Record<string, ErrorCountThreshold>,
//       addFaultRateAlarm: toAlarmProps('maxErrorRate', warnProps?.avgFaults, critProps?.avgFaults, warnActions, critActions) as Record<string, ErrorRateThreshold>,
//       addLowTpsAlarm: toAlarmProps('minTps', warnProps?.minTps, critProps?.minTps, warnActions, critActions) as Record<string, LowTpsThreshold>,
//       addHighTpsAlarm: toAlarmProps('maxTps', warnProps?.maxTps, critProps?.maxTps, warnActions, critActions) as Record<string, HighTpsThreshold>,
//       addThrottlesCountAlarm: toAlarmProps('maxErrorCount', warnProps?.maxThrottles, critProps?.maxThrottles, warnActions, critActions, undefined, 0) as Record<string, ErrorCountThreshold>,
//       addThrottlesRateAlarm: toAlarmProps('maxErrorRate', warnProps?.avgThrottles, critProps?.avgThrottles, warnActions, critActions) as Record<string, ErrorRateThreshold>,
//       addConcurrentExecutionsCountAlarm: toAlarmProps('maxRunningTasks', warnProps?.maxConcurrentExecutions, critProps?.maxConcurrentExecutions, warnActions, critActions) as Record<string, RunningTaskCountThreshold>,
//       addMaxIteratorAgeAlarm: toAlarmProps('maxAgeInMillis', warnProps?.maxIteratorAge, critProps?.maxIteratorAge, warnActions, critActions) as Record<string, MaxAgeThreshold>,
//       addEnhancedMonitoringMaxCpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.maxCpuTime, critProps?.maxCpuTime, warnActions, critActions) as Record<string, DurationThreshold>,
//       addEnhancedMonitoringP90CpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.p90CpuTime, critProps?.p90CpuTime, warnActions, critActions) as Record<string, DurationThreshold>,
//       addEnhancedMonitoringAvgCpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.avgCpuTime, critProps?.avgCpuTime, warnActions, critActions) as  Record<string, DurationThreshold>,
//       addEnhancedMonitoringMaxMemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.maxMemory, critProps?.maxMemory, warnActions, critActions) as  Record<string, UsageThreshold>,
//       addEnhancedMonitoringP90MemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.p90Memory, critProps?.p90Memory, warnActions, critActions) as Record<string, UsageThreshold>,
//       addEnhancedMonitoringAvgMemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.avgMemory, critProps?.avgMemory, warnActions, critActions) as Record<string, UsageThreshold>,
//     });
//
//     // Add log monitoring to dashboard
//     let critMaxLogCount = props.criticalAlarmsProps?.maxLogCount??1
//     let pattern = '';
//     if (critMaxLogCount > 0) {
//       pattern = props.criticalAlarmsProps?.dashboardLogPattern??FunctionAlarms.DEFAULT_LOG_INSIGHTS_PATTERN
//     }
//     if (props.warningAlarmsProps?.maxLogCount !== undefined && pattern !== props.warningAlarmsProps.dashboardLogPattern) {
//       pattern += (pattern !== '' ? '|' : '') + props.warningAlarmsProps.dashboardLogPattern
//     }
//     if (pattern !== '') {
//       this.monitoring.monitorLog({
//         logGroupName: props.function.logGroup.logGroupName,
//         pattern,
//       });
//     }
//
//     // Add critical log alarm
//     if (critMaxLogCount > 0) {
//       this.criticalLogAlarm = new LogAlarm(this, 'LogsCritical', {
//         logGroup: props.function.logGroup,
//         pattern: props.criticalAlarmsProps?.metricLogPattern??FunctionAlarms.DEFAULT_LOG_METRIC_PATTERN,
//         threshold: critMaxLogCount,
//         evaluationPeriods: 3
//       });
//       if (props.criticalAlarmsProps?.notifyActions !== undefined) {
//         this.criticalLogAlarm.addAlarmActions(props.criticalAlarmsProps.notifyActions);
//       }
//       if (props.criticalAlarmsProps?.notifyTopics !== undefined) {
//         this.criticalLogAlarm.addAlarmTopics(props.criticalAlarmsProps.notifyTopics);
//       }
//     }
//
//     // Add warning log alarm
//     if (props.warningAlarmsProps?.maxLogCount !== undefined && props.warningAlarmsProps.maxLogCount > 0) {
//       this.warningLogAlarm = new LogAlarm(this, 'LogsWarning', {
//         logGroup: props.function.logGroup,
//         pattern: props.warningAlarmsProps?.metricLogPattern??FunctionAlarms.DEFAULT_LOG_METRIC_PATTERN,
//         threshold: props.warningAlarmsProps.maxLogCount,
//         evaluationPeriods: 3
//       });
//       if (props.warningAlarmsProps?.notifyActions !== undefined) {
//         this.warningLogAlarm.addAlarmActions(props.warningAlarmsProps.notifyActions);
//       }
//       if (props.warningAlarmsProps?.notifyTopics !== undefined) {
//         this.warningLogAlarm.addAlarmTopics(props.warningAlarmsProps.notifyTopics);
//       }
//     }
//   }
// }
