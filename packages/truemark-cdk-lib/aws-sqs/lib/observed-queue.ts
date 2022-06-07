import {Queue, QueueProps} from "aws-cdk-lib/aws-sqs";
import {Construct} from "constructs";
import {QueueAlarms, QueueAlarmsOptions} from "./queue-alarms";

/**
 * Properties for ObservedQueue.
 */
export interface ObservedQueueProps extends QueueProps, QueueAlarmsOptions {}

/**
 * Queue with CloudWatch alarms.
 */
export class ObservedQueue extends Queue {

  readonly queueAlarms: QueueAlarms;

  constructor(scope: Construct, id: string, props: ObservedQueueProps) {
    super(scope, id, props);

    this.queueAlarms = new QueueAlarms(this, 'Monitoring', {
      queue: this,
      ...props
    });
  }
}
