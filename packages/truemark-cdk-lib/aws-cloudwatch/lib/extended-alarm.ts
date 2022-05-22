import {Alarm, AlarmProps} from "aws-cdk-lib/aws-cloudwatch";
import {Construct} from "constructs";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";

/**
 * Provides helper methods extending the utility of Alarm.
 */
export class ExtendedAlarm extends Alarm {
  constructor(scope: Construct, id: string, props: AlarmProps) {
    super(scope, id, props);
  }

  /**
   * Notify SNS topics if the alarm fires.
   *
   * @param topics the topics to notify
   */
  addAlarmTopic(...topics: ITopic[]): void {
    this.addAlarmAction(...topics.map((topic) => new SnsAction(topic)));
  }

  /**
   * Notify SNS topics if the alarm returns from breaching a state into an ok state.
   *
   * @param topics the topics to notify
   */
  addOkTopic(...topics: ITopic[]): void {
    this.addOkAction(...topics.map((topic) => new SnsAction(topic)));
  }

  /**
   * Notify SNS topics if there is insufficient data to evaluate the alarm.
   *
   * @param topics the topics to notify
   */
  addInsufficientDataTopic(...topics: ITopic[]): void {
    this.addInsufficientDataAction(...topics.map((topic) => new SnsAction(topic)));
  }
}
