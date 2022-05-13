import {StandardFunctionProps} from "./standard-function";
import {Alias, Architecture, Code, Function, Runtime, Tracing} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {
  DurationThreshold,
  ErrorCountThreshold,
  ErrorRateThreshold, HighTpsThreshold,
  LatencyThreshold,
  LowTpsThreshold, MaxAgeThreshold,
  MonitoringFacade, RunningTaskCountThreshold, UsageThreshold
} from "cdk-monitoring-constructs";
import {LogAlarm} from "../../aws-cloudwatch";
import {BundlingOptions, BundlingOutput, Duration} from "aws-cdk-lib";
import * as fs from "fs";
import * as path from "path";
import * as logs from "aws-cdk-lib/aws-logs";
import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
import {toAlarmProps} from "./helper";
import {LambdaDeploymentGroup} from "aws-cdk-lib/aws-codedeploy";

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

export class PythonFunction extends Construct {

  static readonly DEFAULT_LOG_METRIC_PATTERN = '"[ERROR]"';
  static readonly DEFAULT_LOG_INSIGHTS_PATTERN = '\\\[ERROR\\\]';
  readonly declare monitoring: MonitoringFacade
  readonly declare function: Function;
  readonly declare alias: Alias;
  readonly declare deploymentGroup: LambdaDeploymentGroup;
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
      handler: (props.index??'index.py').replace('.py', '') + '.' + (props.handler??'handler'),
    });

    if (props.deploymentProps !== undefined) {
      this.alias = new Alias(this, 'Alias', {
        aliasName: props.deploymentProps.aliasName,
        version: this.function.currentVersion
      });

      this.deploymentGroup = new LambdaDeploymentGroup(this, 'DeployGroup', {
        alias: this.alias,
        deploymentConfig: props.deploymentProps.config
      });
    }

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
