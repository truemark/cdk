import {INotificationRuleTarget, NotificationRule} from "aws-cdk-lib/aws-codestarnotifications";
import {Construct} from "constructs";
import {IPipeline} from "aws-cdk-lib/aws-codepipeline";
import {SlackChannelConfiguration} from "aws-cdk-lib/aws-chatbot";
import {ISlackChannelConfiguration} from "aws-cdk-lib/aws-chatbot";
import {ITopic, Topic} from "aws-cdk-lib/aws-sns";

/**
 * Properties for PipelineNotificationRule.
 */
export interface PipelineNotificationRuleProps {
  /**
   * The events to notify on.
   *
   * @see https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline
   * @default PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS
   */
  readonly events?: string[];

  /**
   * Pipeline source for the events.
   */
  readonly source: IPipeline;
}

/**
 * Configures notifications for a pipeline to a ChatOps Slack channel.
 */
export class PipelineNotificationRule extends Construct {

  static readonly ACTION_EXECUTION_EVENTS = [
    'codepipeline-pipeline-action-execution-succeeded',
    'codepipeline-pipeline-action-execution-failed',
    'codepipeline-pipeline-action-execution-canceled',
    'codepipeline-pipeline-action-execution-started'
  ];

  static readonly STAGE_EXECUTION_EVENTS = [
    'codepipeline-pipeline-stage-execution-started',
    'codepipeline-pipeline-stage-execution-succeeded',
    'codepipeline-pipeline-stage-execution-resumed',
    'codepipeline-pipeline-stage-execution-canceled',
    'codepipeline-pipeline-stage-execution-failed'
  ];

  static readonly PIPELINE_EXECUTION_EVENTS = [
    'codepipeline-pipeline-pipeline-execution-failed',
    'codepipeline-pipeline-pipeline-execution-canceled',
    'codepipeline-pipeline-pipeline-execution-started',
    'codepipeline-pipeline-pipeline-execution-resumed',
    'codepipeline-pipeline-pipeline-execution-succeeded',
    'codepipeline-pipeline-pipeline-execution-superseded'
  ];

  static readonly MANUAL_APPROVAL_EVENTS = [
    'codepipeline-pipeline-manual-approval-failed',
    'codepipeline-pipeline-manual-approval-needed',
    'codepipeline-pipeline-manual-approval-succeeded'
  ]

  static readonly ALL_NOTIFICATION_EVENTS = [
    ...PipelineNotificationRule.ACTION_EXECUTION_EVENTS,
    ...PipelineNotificationRule.STAGE_EXECUTION_EVENTS,
    ...PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS,
    ...PipelineNotificationRule.MANUAL_APPROVAL_EVENTS
  ];

  readonly slackChannel: ISlackChannelConfiguration;
  readonly notificationRule: NotificationRule;
  readonly targets: INotificationRuleTarget[] = [];

  constructor(scope: Construct, id: string, props: PipelineNotificationRuleProps) {
    super(scope, id);
    this.notificationRule = new NotificationRule(this, 'Rule', {
      source: props.source,
      events: props.events??PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS
    });
  }

  addSlackChannelArn(id: string, slackChannelArn: string) {
    const slackChannel = SlackChannelConfiguration.fromSlackChannelConfigurationArn(this, id, slackChannelArn);
    this.notificationRule.addTarget(slackChannel);
  }

  addSlackChannel(slackChannel: ISlackChannelConfiguration) {
    this.targets.push(slackChannel);
    this.notificationRule.addTarget(slackChannel);
  }

  addTopic(topic: ITopic) {
    this.targets.push(topic);
    this.notificationRule.addTarget(topic);
  }

  addTopicArn(id: string, topicArn: string) {
    const topic = Topic.fromTopicArn(this, id, topicArn);
    this.notificationRule.addTarget(topic);
  }
}
