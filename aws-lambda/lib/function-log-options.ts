import {RemovalPolicy, Stack} from 'aws-cdk-lib';
import {FunctionOptions} from 'aws-cdk-lib/aws-lambda';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';
import {Construct} from 'constructs';

/**
 * Configuration for function logs. By default the log group will be destroyed
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

/**
 * Options for configuring function logs.
 */
export interface FunctionLogOptions {
  /**
   * The configuration for the function logs.
   */
  logConfig?: FunctionLogConfig;
}

/**
 * Configure the log group for a Lambda function.
 *
 * @param scope The scope in which to create the log group.
 * @param id The ID of the log group.
 * @param props The properties of the function.
 * @returns The log group, or undefined if it was not configured.
 */
export function configureLogGroupForFunction(
  scope: Construct,
  id: string,
  props: FunctionOptions,
) {
  let logConfig: FunctionLogConfig | undefined;
  if ((props as FunctionLogOptions).logConfig) {
    logConfig = (props as FunctionLogOptions).logConfig;
  }
  if (props.logGroup && logConfig) {
    throw new Error('Cannot specify both logGroup and logConfig.');
  }
  if (props.logRetention && logConfig) {
    throw new Error('Cannot specify both logRetention and logConfig.');
  }
  if (!props.logGroup && !props.logRetention) {
    // Calculate the function name that CDK will generate
    const functionName =
      props.functionName ?? `${Stack.of(scope).stackName}-${id}`;

    return new LogGroup(scope, `${id}LogGroup`, {
      retention: logConfig?.retention ?? RetentionDays.THREE_DAYS,
      logGroupName: logConfig?.logGroupName ?? `/aws/lambda/${functionName}`,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
  return undefined;
}
