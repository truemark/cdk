import * as fs from 'fs';
import {Architecture, Code, Function, Runtime, Tracing} from 'aws-cdk-lib/aws-lambda';
import {Construct} from 'constructs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {BundlingOptions, BundlingOutput, Duration} from 'aws-cdk-lib';
import {
  CustomAlarmThreshold,
  DurationThreshold,
  ErrorCountThreshold,
  ErrorRateThreshold,
  HighTpsThreshold,
  IDashboardFactory,
  LatencyThreshold,
  LowTpsThreshold,
  MaxAgeThreshold,
  MonitoringFacade,
  RunningTaskCountThreshold,
  UsageThreshold,
} from 'cdk-monitoring-constructs';
import {ITopic} from 'aws-cdk-lib/aws-sns';
import {IAlarmAction} from 'aws-cdk-lib/aws-cloudwatch';
import {LogAlarm} from '../../aws-cloudwatch';
import {StandardAlarmActionsStrategy} from '../../aws-monitoring';
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
import * as path from "path";

export interface StandardFunctionAlarmProps {

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
   * Topics to send alarm notifications
   */
  readonly notifyTopics?: ITopic[];

  /**
   * Actions to send alarm notifications
   */
  readonly notifyActions?: IAlarmAction[];

  /**
   * Log pattern to match for metrics.
   *
   * @default '\\\[ERROR\\\]'
   */
  readonly metricLogPattern?: string

  /**
   * Log pattern to match for the dashboard
   *
   * @default '"[ERROR]"'
   */
  readonly dashboardLogPattern?: string

  /**
   * Maximum number of log events matching the pattern.
   *
   * @default 0 for Critical Alarm
   */
  readonly maxLogCount?: number
}

export interface StandardFunctionProps {

  /**
   * Enable AWS X-Ray Tracing.
   *
   * @default Tracing.PASS_THROUGH
   */
  readonly tracing?: Tracing;

  /**
   * The number of days to retain logs.
   *
   * @default logs.RetentionDays.THREE_DAYS
   */
  readonly logRetention?: logs.RetentionDays;

  /**
   * The system architecture.
   *
   * @default Architecture.ARM_64
   */
  readonly architecture?: Architecture;

  /**
   * VPC network to place the lambda network interfaces
   *
   * @default - not placed in a VPC
   */
  readonly vpc?: ec2.IVpc;

  /**
   * Where to place the lambda inside the VPC. Only used if 'vpc' is supplied.
   *
   * @default - VPC default strategy is used if not specified
   */
  readonly vpcSubnets?: ec2.SubnetSelection;

  /**
   * Amount of memory in MB and proportionally CPU power to allocate.
   *
   * @default 768
   */
  readonly memorySize?: number;

  /**
   * Function execution time (in seconds) after which the Lambda terminates.
   *
   * @default Duration.seconds(30)
   */
  readonly timeout?: Duration;

  /**
   * Environment variables to make available.
   */
  readonly environment?: {
    [key: string]: string;
  };

  /**
   * A description of the function
   */
  readonly description?: string;

  /**
   * The DashboardFactory to use when generating CloudWatch dashboards.
   *
   * If not defined, dashboards are not generated.
   */
  readonly dashboardFactory?: IDashboardFactory;

  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmProps?: StandardFunctionAlarmProps;

  /**
   * Alarm threshold for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmProps?: StandardFunctionAlarmProps;
}

export interface PythonFunctionProps extends StandardFunctionProps {

  /**
   * The runtime environment for the Lambda function. Must be one of the Python runtimes.
   *
   * @default Runtime.PYTHON_3_9
   */
  readonly runtime?: Runtime;

  /**
   * Location on the filesystem the Lambda assets are found.
   *
   * Example: path.join(__dirname, '..', 'mylambda')
   */
  readonly entry: string

  /**
   * File containing the handler.
   *
   * @default 'index.py'
   */
  readonly index?: string

  /**
   * Exported handler function
   *
   * @default 'handler'
   */
  readonly handler?: string
}

function toAlarmProps(
  prop: string,
  warningThreshold?: number | Duration,
  criticalThreshold?: number | Duration,
  warningAlarmActions?: IAlarmAction[],
  criticalAlarmActions?: IAlarmAction[],
  warningDefaultThreshold?: number | Duration,
  criticalDefaultThreshold?: number | Duration
): Record<string, CustomAlarmThreshold> | undefined {
  let alarmProps: Record<string, CustomAlarmThreshold> = {}
  if (criticalThreshold !== undefined) {
    alarmProps.Critical = {
      [prop]: criticalThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
    }
  } else if (criticalDefaultThreshold !== undefined) {
    alarmProps.Critical = {
      [prop]: criticalDefaultThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
    }
  }
  if (warningThreshold !== undefined) {
    alarmProps.Warning = {
      [prop]: warningThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
    }
  } else if (warningDefaultThreshold !== undefined) {
    alarmProps.Warning = {
      [prop]: warningDefaultThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
    }
  }
  return Object.keys(alarmProps).length > 0 ? alarmProps : undefined
}

export class PythonFunction extends Construct {

  static readonly DEFAULT_LOG_METRIC_PATTERN = '"[ERROR]"';
  static readonly DEFAULT_LOG_INSIGHTS_PATTERN = '\\\[ERROR\\\]';
  readonly declare monitoring: MonitoringFacade
  readonly declare function: Function;
  readonly declare criticalLogAlarm: LogAlarm;
  readonly declare warningLogAlarm: LogAlarm;

  constructor(scope: Construct, id: string, props: PythonFunctionProps) {
    super(scope, id);

    this.monitoring = new MonitoringFacade(this, 'Monitoring', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix: scope.node.path.replace(/\//g, '-'),
      },
      dashboardFactory: props.dashboardFactory
    });

    let bundling: BundlingOptions | undefined = fs.existsSync(path.join(props.entry, 'requirements.txt')) ? {
      image: props.runtime?.bundlingImage??Runtime.PYTHON_3_9.bundlingImage,
      command: [
        'bash', '-c', [
          'pip install --target /asset-output/ -r requirements.txt',
          'cp -ra * /asset-output/'
        ].join('&&')
      ],
      outputType: BundlingOutput.NOT_ARCHIVED,
    } : undefined

    this.function = new Function(this, id, {
      runtime: props.runtime??Runtime.PYTHON_3_9,
      tracing: props.tracing??Tracing.PASS_THROUGH,
      logRetention: props.logRetention??logs.RetentionDays.THREE_DAYS,
      architecture: props.architecture??Architecture.ARM_64,
      vpc: props.vpc,
      vpcSubnets: props.vpcSubnets,
      memorySize: props.memorySize??768,
      timeout: props.timeout??Duration.seconds(30),
      environment: props.environment,
      description: props.description,
      code: Code.fromAsset(props.entry, {bundling}),
      handler: (props.index??'index.py').replace('.py', '') + '.' + (props.handler??'handler')
    });

    const warnProps = props.warningAlarmProps;
    const warnActions: IAlarmAction[] = [];
    warnProps?.notifyActions?.forEach((action) => warnActions.push(action));
    warnProps?.notifyTopics?.forEach((topic) => warnActions.push(new SnsAction(topic)));
    const critProps = props.criticalAlarmProps;
    const critActions: IAlarmAction[] = [];
    critProps?.notifyActions?.forEach((action) => critActions.push(action));
    critProps?.notifyTopics?.forEach((topic) => critActions.push(new SnsAction(topic)));

    this.monitoring.monitorLambdaFunction({
      lambdaFunction: this.function,
      lambdaInsightsEnabled: true,
      addToAlarmDashboard: true,
      addToDetailDashboard: true,
      addToSummaryDashboard: true,
      addLatencyP50Alarm: toAlarmProps('maxLatency', warnProps?.p50Latency, critProps?.p50Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
      addLatencyP90Alarm: toAlarmProps('maxLatency', warnProps?.p90Latency, critProps?.p90Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
      addLatencyP99Alarm: toAlarmProps('maxLatency', warnProps?.p99Latency, critProps?.p99Latency, warnActions, critActions) as Record<string, LatencyThreshold>,
      addFaultCountAlarm: toAlarmProps('maxErrorCount', warnProps?.maxFaults, critProps?.maxFaults, warnActions, critActions, undefined, 0) as Record<string, ErrorCountThreshold>,
      addFaultRateAlarm: toAlarmProps('maxErrorRate', warnProps?.avgFaults, critProps?.avgFaults, warnActions, critActions) as Record<string, ErrorRateThreshold>,
      addLowTpsAlarm: toAlarmProps('minTps', warnProps?.minTps, critProps?.minTps, warnActions, critActions) as Record<string, LowTpsThreshold>,
      addHighTpsAlarm: toAlarmProps('maxTps', warnProps?.maxTps, critProps?.maxTps, warnActions, critActions) as Record<string, HighTpsThreshold>,
      addThrottlesCountAlarm: toAlarmProps('maxErrorCount', warnProps?.maxThrottles, critProps?.maxThrottles, warnActions, critActions, undefined, 0) as Record<string, ErrorCountThreshold>,
      addThrottlesRateAlarm: toAlarmProps('maxErrorRate', warnProps?.avgThrottles, critProps?.avgThrottles, warnActions, critActions) as Record<string, ErrorRateThreshold>,
      addConcurrentExecutionsCountAlarm: toAlarmProps('maxRunningTasks', warnProps?.maxConcurrentExecutions, critProps?.maxConcurrentExecutions, warnActions, critActions) as Record<string, RunningTaskCountThreshold>,
      addMaxIteratorAgeAlarm: toAlarmProps('maxAgeInMillis', warnProps?.maxIteratorAge, critProps?.maxIteratorAge, warnActions, critActions) as Record<string, MaxAgeThreshold>,
      addEnhancedMonitoringMaxCpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.maxCpuTime, critProps?.maxCpuTime, warnActions, critActions) as Record<string, DurationThreshold>,
      addEnhancedMonitoringP90CpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.p90CpuTime, critProps?.p90CpuTime, warnActions, critActions) as Record<string, DurationThreshold>,
      addEnhancedMonitoringAvgCpuTotalTimeAlarm: toAlarmProps('maxDuration', warnProps?.avgCpuTime, critProps?.avgCpuTime, warnActions, critActions) as  Record<string, DurationThreshold>,
      addEnhancedMonitoringMaxMemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.maxMemory, critProps?.maxMemory, warnActions, critActions) as  Record<string, UsageThreshold>,
      addEnhancedMonitoringP90MemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.p90Memory, critProps?.p90Memory, warnActions, critActions) as Record<string, UsageThreshold>,
      addEnhancedMonitoringAvgMemoryUtilizationAlarm: toAlarmProps('maxUsagePercent', warnProps?.avgMemory, critProps?.avgMemory, warnActions, critActions) as Record<string, UsageThreshold>,
    });

    // Add log monitoring to dashboard
    let critMaxLogCount = props.criticalAlarmProps?.maxLogCount??1
    let pattern = '';
    if (critMaxLogCount > 0) {
      pattern = props.criticalAlarmProps?.dashboardLogPattern??PythonFunction.DEFAULT_LOG_INSIGHTS_PATTERN
    }
    if (props.warningAlarmProps?.maxLogCount !== undefined && pattern !== props.warningAlarmProps.dashboardLogPattern) {
      pattern += (pattern !== '' ? '|' : '') + props.warningAlarmProps.dashboardLogPattern
    }
    if (pattern !== '') {
      this.monitoring.monitorLog({
        logGroupName: this.function.logGroup.logGroupName,
        pattern,
      });
    }

    // Add critical log alarm
    if (critMaxLogCount > 0) {
      this.criticalLogAlarm = new LogAlarm(this, 'LogsCritical', {
        logGroup: this.function.logGroup,
        pattern: props.criticalAlarmProps?.metricLogPattern??PythonFunction.DEFAULT_LOG_METRIC_PATTERN,
        threshold: critMaxLogCount,
        evaluationPeriods: 3
      });
      if (props.criticalAlarmProps?.notifyActions !== undefined) {
        this.criticalLogAlarm.addAlarmActions(props.criticalAlarmProps.notifyActions);
      }
      if (props.criticalAlarmProps?.notifyTopics !== undefined) {
        this.criticalLogAlarm.addAlarmTopics(props.criticalAlarmProps.notifyTopics);
      }
    }

    // Add warning log alarm
    if (props.warningAlarmProps?.maxLogCount !== undefined && props.warningAlarmProps.maxLogCount > 0) {
      this.warningLogAlarm = new LogAlarm(this, 'LogsWarning', {
        logGroup: this.function.logGroup,
        pattern: props.warningAlarmProps?.metricLogPattern??PythonFunction.DEFAULT_LOG_METRIC_PATTERN,
        threshold: props.warningAlarmProps.maxLogCount,
        evaluationPeriods: 3
      });
      if (props.warningAlarmProps?.notifyActions !== undefined) {
        this.warningLogAlarm.addAlarmActions(props.warningAlarmProps.notifyActions);
      }
      if (props.warningAlarmProps?.notifyTopics !== undefined) {
        this.warningLogAlarm.addAlarmTopics(props.warningAlarmProps.notifyTopics);
      }
    }
  }
}
