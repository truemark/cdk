import {Construct} from "constructs";
import {Duration, RemovalPolicy, ResourceEnvironment, Stack} from "aws-cdk-lib";
import {DeadLetterQueue, IQueue, Queue, QueueEncryption} from "aws-cdk-lib/aws-sqs";
import * as kms from 'aws-cdk-lib/aws-kms';
import {QueueAlarmsOptions} from "./queue-alarms";
import {ObservedQueue} from "./observed-queue";
import {MetricOptions, Metric} from "aws-cdk-lib/aws-cloudwatch";
import {PolicyStatement, AddToResourcePolicyResult, IGrantable, Grant} from "aws-cdk-lib/aws-iam";

/**
 * Properties for a StandardQueue
 */
export interface StandardQueueProps extends QueueAlarmsOptions {

  /**
   * The number of seconds Amazon SQS retains a message. Value must be between
   * 60 and 1209600 seconds (14 days).
   *
   * @default Duration.seconds(1209600)
   *
   */
  readonly retentionPeriod?: Duration;

  /**
   * The number of seconds a consumer has to handle the message and delete it
   * from the queue before it becomes visible again for another consumer. Value
   * must be between 0 and 43200 seconds (12 hours).
   *
   * @default Duration.seconds(30)
   */
  readonly visibilityTimeout?: Duration;

  /**
   * The KMS key to use for encryption. If not set, the AWS master key for SQS
   * will be used.
   */
  readonly encryptionMasterKey?: kms.IKey;

  /**
   * The length of time that Amazon SQS reuses a data key before calling KMS again.
   * This value affects pricing as you are charged for KMS usage. Value must be
   * between 60 and 86,400 seconds (24 hours).
   *
   * @default Duration.minutes(15)
   */
  readonly dataKeyReuse?: Duration;

  /**
   * The maximum number of times a message can be unsuccessful before being moved
   * to the dead-letter queue. Set this value to -1 to disable the dead-letter queue.
   *
   * @default 3
   */
  readonly maxReceiveCount?: number;
}

export class StandardQueue extends Construct implements IQueue {

  static readonly DEFAULT_MAX_RECEIVE_COUNT = 3;
  static readonly DEFAULT_RETENTION_PERIOD = Duration.seconds(1209600);

  readonly queue: ObservedQueue;

  // From IQueue
  readonly queueArn: string;
  readonly queueUrl: string;
  readonly queueName: string;
  readonly encryptionMasterKey?: kms.IKey | undefined;
  readonly fifo: boolean;
  readonly stack: Stack;
  readonly env: ResourceEnvironment;

  constructor(scope: Construct, id: string, props: StandardQueueProps) {
    super(scope, id);

    const maxReceiveCount = props.maxReceiveCount ?? StandardQueue.DEFAULT_MAX_RECEIVE_COUNT;
    const encryption = props.encryptionMasterKey === undefined ? QueueEncryption.KMS_MANAGED : QueueEncryption.KMS;
    const encryptionMasterKey = props.encryptionMasterKey;
    const dataKeyReuse = props.dataKeyReuse ?? Duration.minutes(15);

    const deadLetterQueue: DeadLetterQueue | undefined = maxReceiveCount <= 0 ? undefined : {
      queue: new Queue(this, 'DeadLetterQueue', {
        encryption,
        encryptionMasterKey,
        dataKeyReuse,
        retentionPeriod: StandardQueue.DEFAULT_RETENTION_PERIOD
      }),
      maxReceiveCount
    };

    this.queue = new ObservedQueue(this, 'Queue', {
      ...props,
      deadLetterQueue,
      encryption,
      encryptionMasterKey,
      dataKeyReuse,
      retentionPeriod: props.retentionPeriod ?? StandardQueue.DEFAULT_RETENTION_PERIOD,
      visibilityTimeout: props.visibilityTimeout ?? Duration.seconds(30),
      alarmNamePrefix: props.alarmNamePrefix??Stack.of(this).stackName + "-" + id
    });

    this.queueArn = this.queue.queueArn;
    this.queueUrl = this.queue.queueUrl;
    this.queueName = this.queue.queueName;
    this.encryptionMasterKey = this.queue.encryptionMasterKey;
    this.fifo = this.queue.fifo;
    this.stack = this.queue.stack;
    this.env = this.queue.env;
  }

  // From IQueue

  addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult {
    return this.queue.addToResourcePolicy(statement);
  }

  grantConsumeMessages(grantee: IGrantable): Grant {
    return this.queue.grantConsumeMessages(grantee);
  }

  grantSendMessages(grantee: IGrantable): Grant {
    return this.queue.grantSendMessages(grantee);
  }

  grantPurge(grantee: IGrantable): Grant {
    return this.queue.grantPurge(grantee);
  }

  grant(grantee: IGrantable, ...queueActions: string[]): Grant {
    return this.queue.grant(grantee, ...queueActions);
  }

  metric(metricName: string, props?: MetricOptions): Metric {
    return this.queue.metric(metricName, props);
  }

  metricApproximateAgeOfOldestMessage(props?: MetricOptions): Metric {
    return this.queue.metricApproximateAgeOfOldestMessage(props);
  }

  metricApproximateNumberOfMessagesDelayed(props?: MetricOptions): Metric {
    return this.queue.metricApproximateNumberOfMessagesDelayed(props);
  }

  metricApproximateNumberOfMessagesNotVisible(props?: MetricOptions): Metric {
    return this.queue.metricApproximateNumberOfMessagesNotVisible(props);
  }

  metricApproximateNumberOfMessagesVisible(props?: MetricOptions): Metric {
    return this.queue.metricApproximateNumberOfMessagesVisible(props);
  }

  metricNumberOfEmptyReceives(props?: MetricOptions): Metric {
    return this.queue.metricNumberOfEmptyReceives(props);
  }

  metricNumberOfMessagesDeleted(props?: MetricOptions): Metric {
    return this.queue.metricNumberOfMessagesDeleted(props);
  }

  metricNumberOfMessagesReceived(props?: MetricOptions): Metric {
    return this.queue.metricNumberOfMessagesReceived(props);
  }

  metricNumberOfMessagesSent(props?: MetricOptions): Metric {
    return this.queue.metricNumberOfMessagesSent(props);
  }

  metricSentMessageSize(props?: MetricOptions): Metric {
    return this.queue.metricSentMessageSize(props);
  }

  applyRemovalPolicy(policy: RemovalPolicy): void {
    return this.queue.applyRemovalPolicy(policy);
  }
}
