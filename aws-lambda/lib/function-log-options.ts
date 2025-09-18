import {RetentionDays} from 'aws-cdk-lib/aws-logs';

/**
 * Configuration for function logs.By default the log group will be destroyed
 * when the stack is destroyed. If you require a different behavior or have
 * other log requirements, it's recommended to create a log group and set
 * logGroup explicitly instead of using this configuration.
 */
export interface FunctionLogConfig {
  /**
   * The retention period for the log group. Default is 3 days.
   */
  readonly retention?: RetentionDays;
  /**
   * The log group to use for the function logs. If not provided, CDK will
   * generate the name.
   */
  readonly logGroupName?: string;
}

export interface FunctionLogOptions {
  logConfig?: FunctionLogConfig;
}
