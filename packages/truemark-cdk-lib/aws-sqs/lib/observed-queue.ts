import {Queue, QueueProps} from "aws-cdk-lib/aws-sqs";
import {Construct} from "constructs";
import {ObservedQueueAlarms, QueueAlarmProps} from "./observed-queue-alarms";

/**
 * Properties for ObservedQueue.
 */
export interface ObservedQueueProps extends QueueProps, QueueAlarmProps {}

/**
 * Queue with CloudWatch alarms.
 */
export class ObservedQueue extends Queue {

  readonly queueAlarms: ObservedQueueAlarms;

  constructor(scope: Construct, id: string, props: ObservedQueueProps) {
    super(scope, id, props);

    this.queueAlarms = new ObservedQueueAlarms(this, 'Monitoring', {
      queue: this,
      ...props
    });
  }
}
