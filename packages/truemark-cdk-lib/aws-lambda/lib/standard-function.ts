import {Duration} from "aws-cdk-lib";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {Architecture, Runtime, Tracing} from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {IDashboardFactory} from "cdk-monitoring-constructs";

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
