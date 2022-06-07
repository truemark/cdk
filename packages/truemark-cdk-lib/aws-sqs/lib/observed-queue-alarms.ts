import {Duration, Names, Stack} from "aws-cdk-lib";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {Alarm, IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {MonitoringFacade} from "cdk-monitoring-constructs";
import {
  CustomAlarmThreshold,
  IDashboardFactory, MaxIncomingMessagesCountThreshold,
  MaxMessageAgeThreshold,
  MaxMessageCountThreshold, MaxTimeToDrainThreshold, MinIncomingMessagesCountThreshold,
  MinMessageCountThreshold
} from "cdk-monitoring-constructs";
import {Queue} from "aws-cdk-lib/aws-sqs";
import {Construct} from "constructs";
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";
import {StandardAlarmActionsStrategy} from "../../aws-monitoring";

export interface QueueAlarmCategoryProps {

  /**
   * Minimum number of messages visible.
   */
  readonly minSize?: number;

  /**
   * Maximum number of messages visible.
   */
  readonly maxSize?: number;

  /**
   * Maximum approximate age of the oldest message in the queue.
   *
   * @default 15 for critical alarm
   */
  readonly maxAgeInSeconds?: number;

  /**
   * Maximum time to drain the queue.
   */
  readonly maxTimeToDrain?: Duration;

  /**
   * Minimum number of incoming messages.
   */
  readonly minIncoming?: number;

  /**
   * Maximum number of incoming messages.
   */
  readonly maxIncoming?: number;

  /**
   * Maximum number of visible messages in the dead-letter queue
   *
   * @default 0 for critical alarm
   */
  readonly deadLetterQueueMaxSize?: number;

  /**
   * Maximum age of the oldest messages in the dead-letter queue
   */
  readonly deadLetterQueueMaxAgeInSeconds?: number;

  /**
   * Maximum number of incoming messages in the dead-letter queue
   */
  readonly deadLetterQueueMaxIncoming?: number;

  /**
   * Topics to send alarm notifications
   */
  readonly notifyTopics?: [ITopic];

  /**
   * Actions to send alarm notifications
   */
  readonly notifyActions?: [IAlarmAction];
}

export interface QueueAlarmProps {

  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmProps?: QueueAlarmCategoryProps;

  /**
   * Alarm threshold for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmProps?: QueueAlarmCategoryProps;

  /**
   * Main entry point for monitoring.
   *
   * If no value is provided, a default facade will be created.
   */
  readonly monitoringFacade?: MonitoringFacade

  /**
   * The DashboardFactory to use when generating CloudWatch dashboards.
   *
   * If not defined, dashboards are not generated.
   */
  readonly dashboardFactory?: IDashboardFactory;
}

/**
 * Helper function to get the correct critical or warning properties from QueueAlarmProps dynamically.
 *
 * @param props the properties holding the values
 * @param category the alarm category
 */
function getQueueAlarmCategoryProps(props: QueueAlarmProps, category: QueueAlarmCategory): QueueAlarmCategoryProps | undefined {
  const fprop: keyof QueueAlarmProps = category === 'Critical' ? 'criticalAlarmProps' : 'warningAlarmProps';
  return props[fprop];
}

/**
 * Helper function to combine an array if IAlarmAction and ITopic objects into a single IAlarmAction array.
 *
 * @param actions the actions
 * @param topics the topics
 */
function combineActions(actions?: IAlarmAction[], topics?: ITopic[]): IAlarmAction[] {
  const combined: IAlarmAction[] = []
  actions?.forEach((action) => combined.push(action));
  topics?.forEach((topic) => combined.push(new SnsAction(topic)));
  return combined;
}

/**
 * Used to disambiguate warning and critical alarms.
 */
export enum QueueAlarmCategory {
  Critical = 'Critical',
  Warning = 'Warning'
}

/**
 * Properties for QueueAlarmFacade.
 */
interface QueueAlarmFacadeProps {
  prop: string;
  threshold?: number | Duration;
  defaultThreshold?: number | Duration;
  topics?: ITopic[];
  actions?: IAlarmAction[];
  alarmNameOverride: string;
}

/**
 * Internal class to assist in generating CustomeAlarmThreshold instances.
 */
class QueueAlarmFacade {

  readonly actions: IAlarmAction[];

  private props: QueueAlarmFacadeProps;

  constructor(props: QueueAlarmFacadeProps) {
    this.props = props;
    this.actions = combineActions(props.actions, props.topics);
  }

  toCustomAlarmThreshold(): CustomAlarmThreshold | undefined {
    if (this.props.threshold !== undefined || this.props.defaultThreshold !== undefined) {
      return {
        [this.props.prop]: this.props.threshold??this.props.defaultThreshold,
        actionsEnabled: true,
        actionOverride: new StandardAlarmActionsStrategy({actions: this.actions}),
        alarmNameOverride: this.props.alarmNameOverride
      };
    }
    return undefined;
  }

  addCustomAlarmThreshold(category: QueueAlarmCategory, record: Record<string,CustomAlarmThreshold>) {
    const c = this.toCustomAlarmThreshold();
    if (c !== undefined) {
      record[category] = c;
    }
  }
}

/**
 * Properties for ObservedQueueAlarms
 */
export interface ObservedQueueAlarmsProps extends QueueAlarmProps {

  /**
   * The queue to observe.
   */
  readonly queue: Queue;
}

/**
 * Creates CloudWatch alarms for Queues.
 */
export class ObservedQueueAlarms extends Construct {

  /**
   * The MonitoringFacade instance either passed in or generated.
   */
  readonly monitoringFacade: MonitoringFacade;

  /**
   * Generated critical alarms.
   */
  readonly criticalAlarms: Alarm[];

  /**
   * Generated warning alarms.
   */
  readonly warningAlarms: Alarm[];

  private readonly props: ObservedQueueAlarmsProps;

  private addRecordValue(record: Record<string, CustomAlarmThreshold>,
                         category: QueueAlarmCategory,
                         alarmNameOverride: string,
                         sprop: keyof QueueAlarmCategoryProps,
                         tprop: string,
                         defaultThreshold?: number|Duration) {
    const fprops = getQueueAlarmCategoryProps(this.props, category);
    new QueueAlarmFacade({
      prop: tprop,
      threshold: fprops?.[sprop] as number | Duration,
      defaultThreshold,
      topics: fprops?.notifyTopics,
      actions: fprops?.notifyActions,
      alarmNameOverride: alarmNameOverride + "-" + category
    }).addCustomAlarmThreshold(category, record);
  }

  private toRecord(alarmNameOverride: string, sprop: keyof QueueAlarmCategoryProps, tprop: string, defaultThreshold?: number|Duration): Record<string, CustomAlarmThreshold> | undefined {
    const record: Record<string, CustomAlarmThreshold> = {};
    this.addRecordValue(record, QueueAlarmCategory.Critical, alarmNameOverride, sprop, tprop, defaultThreshold);
    this.addRecordValue(record, QueueAlarmCategory.Warning, alarmNameOverride, sprop, tprop, defaultThreshold);
    return Object.keys(record).length > 0 ? record : undefined;
  }

  private addAlarm(category: QueueAlarmCategory, ...alarm: Alarm[]) {
    const arr = category === QueueAlarmCategory.Critical ? this.criticalAlarms : this.warningAlarms;
    arr.push(...alarm);
  }

  constructor(scope: Construct, id: string, props: ObservedQueueAlarmsProps) {
    super(scope, id);
    this.props = props;
    this.criticalAlarms = [];
    this.warningAlarms = [];

    const alarmNamePrefix = Names.uniqueId(props.queue);
    // const alarmNamePrefix =  props.queue.node.path.replace(/\//g, "-");

    this.monitoringFacade = props.monitoringFacade??new MonitoringFacade(this, 'MonitoringFacade', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix
        // alarmNamePrefix: props.queue.node.path.replace(/\//g, "-")
      },
      dashboardFactory: props.dashboardFactory
    });

    if (props.queue.deadLetterQueue === undefined) {
      this.monitoringFacade.monitorSqsQueue({
        queue: props.queue,
        addQueueMinSizeAlarm: this.toRecord(alarmNamePrefix + '-MinSize', 'minSize', 'minMessageCount') as Record<string, MinMessageCountThreshold>,
        addQueueMaxSizeAlarm: this.toRecord(alarmNamePrefix + '-MaxSize', 'maxSize', 'maxMessageCount') as Record<string, MaxMessageCountThreshold>,
        addQueueMaxMessageAgeAlarm: this.toRecord(alarmNamePrefix + '-MaxAge', 'maxAgeInSeconds', 'maxAgeInSeconds', 15) as Record<string, MaxMessageAgeThreshold>,
        addQueueMaxTimeToDrainMessagesAlarm: this.toRecord(alarmNamePrefix + '-MaxTimeToDrain', 'maxTimeToDrain', 'maxTimeToDrain') as Record<string, MaxTimeToDrainThreshold>,
        addQueueMinIncomingMessagesAlarm: this.toRecord(alarmNamePrefix + '-MinIncoming', 'minIncoming', 'minIncomingMessagesCount') as Record<string, MinIncomingMessagesCountThreshold>,
        addQueueMaxIncomingMessagesAlarm: this.toRecord(alarmNamePrefix + '-MaxIncoming', 'maxIncoming', 'maxIncomingMessagesCount')  as Record<string, MaxIncomingMessagesCountThreshold>
      });
    } else {
      this.monitoringFacade.monitorSqsQueueWithDlq({
        queue: props.queue,
        deadLetterQueue: props.queue.deadLetterQueue.queue,
        addQueueMinSizeAlarm: this.toRecord(alarmNamePrefix + '-MinSize', 'minSize', 'minMessageCount') as Record<string, MinMessageCountThreshold>,
        addQueueMaxSizeAlarm: this.toRecord(alarmNamePrefix + '-MaxSize', 'maxSize', 'maxMessageCount') as Record<string, MaxMessageCountThreshold>,
        addQueueMaxMessageAgeAlarm: this.toRecord(alarmNamePrefix + '-MaxAge', 'maxAgeInSeconds', 'maxAgeInSeconds', 15) as Record<string, MaxMessageAgeThreshold>,
        addQueueMaxTimeToDrainMessagesAlarm: this.toRecord(alarmNamePrefix + '-MaxTimeToDrain', 'maxTimeToDrain', 'maxTimeToDrain') as Record<string, MaxTimeToDrainThreshold>,
        addQueueMinIncomingMessagesAlarm: this.toRecord(alarmNamePrefix + '-MinIncoming', 'minIncoming', 'minIncomingMessagesCount') as Record<string, MinIncomingMessagesCountThreshold>,
        addQueueMaxIncomingMessagesAlarm: this.toRecord(alarmNamePrefix + '-MaxIncoming', 'maxIncoming', 'maxIncomingMessagesCount') as Record<string, MaxIncomingMessagesCountThreshold>,
        addDeadLetterQueueMaxSizeAlarm: this.toRecord(alarmNamePrefix + '-DeadLetterMaxSize', 'deadLetterQueueMaxSize', 'maxMessageCount', 0) as Record<string, MaxMessageCountThreshold>,
        addDeadLetterQueueMaxMessageAgeAlarm: this.toRecord(alarmNamePrefix + '-DeadLetterMaxAge', 'deadLetterQueueMaxAgeInSeconds', 'maxAgeInSeconds') as Record<string, MaxMessageAgeThreshold>,
        addDeadLetterQueueMaxIncomingMessagesAlarm: this.toRecord(alarmNamePrefix + '-DeadLetterMaxIncoming', 'deadLetterQueueMaxIncoming', 'maxIncomingMessagesCount') as Record<string, MaxIncomingMessagesCountThreshold>,
        addDeadLetterQueueToSummaryDashboard: true
      });

      this.addAlarm(QueueAlarmCategory.Critical, ...this.monitoringFacade.createdAlarmsWithDisambiguator(QueueAlarmCategory.Critical).map((awa) => awa.alarm));
      this.addAlarm(QueueAlarmCategory.Warning, ...this.monitoringFacade.createdAlarmsWithDisambiguator(QueueAlarmCategory.Warning).map((awa) => awa.alarm));
    }
  }
}
