import {Queue, QueueProps} from "aws-cdk-lib/aws-sqs";
import {Construct} from "constructs";
import {QueueAlarms, QueueAlarmsOptions} from "./queue-alarms";

/**
 * Properties for ObservedQueue.
 */
export interface ExtendedQueueProps extends QueueProps, QueueAlarmsOptions {}

/**
 * Queue with CloudWatch alarms.
 */
export class ExtendedQueue extends Queue {

  readonly queueAlarms: QueueAlarms;

  constructor(scope: Construct, id: string, props: ExtendedQueueProps) {
    super(scope, id, props);

    this.queueAlarms = new QueueAlarms(this, "Alarms", {
      queue: this,
      ...props
    });
  }
}
