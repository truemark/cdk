import {Construct} from "constructs";
import {Duration} from "aws-cdk-lib";
import {DeadLetterQueue, Queue, QueueEncryption} from "aws-cdk-lib/aws-sqs";
import * as kms from 'aws-cdk-lib/aws-kms';
import {ObservedQueue, QueueAlarmProps} from "./observed-queue";

/**
 * Properties for a StandardQueue
 */
export interface StandardQueueProps extends QueueAlarmProps {

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

export class StandardQueue extends ObservedQueue {

  static readonly DEFAULT_MAX_RECEIVE_COUNT = 3;
  static readonly DEFAULT_RETENTION_PERIOD = Duration.seconds(1209600);

  constructor(scope: Construct, id: string, props: StandardQueueProps = {}) {

    const encryption = props.encryptionMasterKey === undefined ? QueueEncryption.KMS_MANAGED : QueueEncryption.KMS;

    const maxReceiveCount = props.maxReceiveCount??StandardQueue.DEFAULT_MAX_RECEIVE_COUNT;

    const deadLetterQueue: DeadLetterQueue | undefined = maxReceiveCount <= 0 ? undefined : {
      queue: new Queue(scope, 'DeadLetter', {
        encryption,
        encryptionMasterKey: props.encryptionMasterKey,
        dataKeyReuse: props.dataKeyReuse??Duration.minutes(15),
        retentionPeriod: StandardQueue.DEFAULT_RETENTION_PERIOD
      }),
      maxReceiveCount: maxReceiveCount
    };

    super(scope, id, {
      ...props,
      encryption,
      dataKeyReuse: props.dataKeyReuse??Duration.minutes(15),
      retentionPeriod: props.retentionPeriod??StandardQueue.DEFAULT_RETENTION_PERIOD,
      deadLetterQueue: deadLetterQueue,
      visibilityTimeout: props.visibilityTimeout??Duration.seconds(30)
    });
  }
}
