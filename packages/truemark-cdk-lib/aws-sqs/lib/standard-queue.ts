import {Construct} from "constructs";
import {Duration} from "aws-cdk-lib";
import {Queue, QueueEncryption} from "aws-cdk-lib/aws-sqs";
import * as kms from 'aws-cdk-lib/aws-kms';
import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {ITopic} from 'aws-cdk-lib/aws-sns';
import * as iam from "aws-cdk-lib/aws-iam";
import {
  MaxIncomingMessagesCountThreshold,
  MaxMessageAgeThreshold,
  MaxMessageCountThreshold,
  MaxTimeToDrainThreshold, MinIncomingMessagesCountThreshold,
  MonitoringFacade,
  IDashboardFactory,
  MinMessageCountThreshold,
  CustomAlarmThreshold
} from "cdk-monitoring-constructs";
import {StandardAlarmActionsStrategy} from '../../aws-monitoring';
import {SnsAction} from "aws-cdk-lib/aws-cloudwatch-actions";

/**
 * Alarm properties for StandardQueue
 */
export interface StandardQueueAlarmProps {

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
   * @default Duration.minutes(15) for critical alarm
   */
  readonly maxAge?: Duration;

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
  readonly deadLetterQueueMaxAge?: Duration;

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

/**
 * Properties for a StandardQueue
 */
export interface StandardQueueProps {

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

  /**
   * The DashboardFactory to use when generating CloudWatch dashboards.
   *
   * If not defined, dashboards are not generated.
   */
  readonly dashboardFactory?: IDashboardFactory;

  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmProps?: StandardQueueAlarmProps;

  /**
   * Alarm threshold for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmProps?: StandardQueueAlarmProps;
}

function toAlarmProps(
  prop: string,
  warningThreshold?: number | Duration,
  criticalThreshold?: number | Duration,
  warningAlarmActions?: IAlarmAction[],
  criticalAlarmActions?: IAlarmAction[],
  warningDefaultThreshold?: number | Duration,
  criticalDefaultThreshold?: number | Duration
): Record<string, CustomAlarmThreshold> | undefined {
  let alarmProps: Record<string, CustomAlarmThreshold> = {}
  if (criticalThreshold !== undefined) {
    alarmProps.Critical = {
      [prop]: criticalThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
    }
  } else if (criticalDefaultThreshold !== undefined) {
    alarmProps.Critical = {
      [prop]: criticalDefaultThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: criticalAlarmActions})
    }
  }
  if (warningThreshold !== undefined) {
    alarmProps.Warning = {
      [prop]: warningThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
    }
  } else if (warningDefaultThreshold !== undefined) {
    alarmProps.Warning = {
      [prop]: warningDefaultThreshold,
      actionsEnabled: true,
      actionOverride: new StandardAlarmActionsStrategy({actions: warningAlarmActions})
    }
  }
  return Object.keys(alarmProps).length > 0 ? alarmProps : undefined
}

export class StandardQueue extends Construct {

  static readonly DEFAULT_MAX_RECEIVE_COUNT = 3;
  static readonly DEFAULT_RETENTION_PERIOD = Duration.seconds(1209600);

  readonly monitoring: MonitoringFacade;
  readonly queue: Queue;
  readonly deadLetterQueue: Queue;

  constructor(scope: Construct, id: string, props: StandardQueueProps = {}) {
    super(scope, id);

    this.monitoring = new MonitoringFacade(this, 'Monitoring', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix: scope.node.path.replace(/\//g, '-')
      },
      dashboardFactory: props.dashboardFactory
    });

    const encryption = props.encryptionMasterKey === undefined ? QueueEncryption.KMS_MANAGED : QueueEncryption.KMS;

    // Setup dead-letter queue
    const maxReceiveCount = props.maxReceiveCount??StandardQueue.DEFAULT_MAX_RECEIVE_COUNT;
    if (maxReceiveCount > 0) {
      this.deadLetterQueue = new Queue(this, 'DeadLetter', {
        encryption,
        encryptionMasterKey: props.encryptionMasterKey,
        dataKeyReuse: props.dataKeyReuse??Duration.minutes(15),
        retentionPeriod: StandardQueue.DEFAULT_RETENTION_PERIOD
      });
    }

    // Setup queue
    this.queue = new Queue(this, id, {
      encryption,
      encryptionMasterKey: props.encryptionMasterKey,
      dataKeyReuse: props.dataKeyReuse??Duration.minutes(15),
      retentionPeriod: props.retentionPeriod??StandardQueue.DEFAULT_RETENTION_PERIOD,
      deadLetterQueue: props.maxReceiveCount === undefined || props.maxReceiveCount <= 0 ? undefined : {
        maxReceiveCount: props.maxReceiveCount,
        queue: this.deadLetterQueue
      },
      visibilityTimeout: props.visibilityTimeout??Duration.seconds(30),
    });

    const warnProps = props.warningAlarmProps;
    const warnActions: IAlarmAction[] = [];
    warnProps?.notifyActions?.forEach((action) => warnActions.push(action));
    warnProps?.notifyTopics?.forEach((topic) => warnActions.push(new SnsAction(topic)));
    const critProps = props.criticalAlarmProps;
    const critActions: IAlarmAction[] = [];
    critProps?.notifyActions?.forEach((action) => critActions.push(action));
    critProps?.notifyTopics?.forEach((topic) => critActions.push(new SnsAction(topic)));

    if (maxReceiveCount > 0) {
      this.monitoring.monitorSqsQueueWithDlq({
        queue: this.queue,
        deadLetterQueue: this.deadLetterQueue,
        addQueueMinSizeAlarm: toAlarmProps('minMessageCount', warnProps?.minSize, critProps?.minSize, warnActions, critActions) as Record<string, MinMessageCountThreshold> | undefined,
        addQueueMaxSizeAlarm: toAlarmProps('maxMessageCount', warnProps?.maxSize, critProps?.maxSize, warnActions, critActions) as Record<string, MaxMessageCountThreshold> | undefined,
        addQueueMaxMessageAgeAlarm: toAlarmProps('maxAgeInSeconds', warnProps?.maxAge?.toSeconds(), critProps?.maxAge?.toSeconds(), warnActions, critActions, undefined, Duration.minutes(15).toSeconds()) as Record<string, MaxMessageAgeThreshold> | undefined,
        addQueueMaxTimeToDrainMessagesAlarm: toAlarmProps('maxTimeToDrain', warnProps?.maxTimeToDrain, critProps?.maxTimeToDrain, warnActions, critActions) as Record<string, MaxTimeToDrainThreshold> | undefined,
        addQueueMinIncomingMessagesAlarm: toAlarmProps('minIncomingMessagesCount', warnProps?.minIncoming, critProps?.minIncoming, warnActions, critActions) as Record<string, MinIncomingMessagesCountThreshold> | undefined,
        addQueueMaxIncomingMessagesAlarm: toAlarmProps('maxIncomingMessagesCount', warnProps?.maxIncoming, critProps?.maxIncoming, warnActions, critActions) as Record<string, MaxIncomingMessagesCountThreshold> | undefined,
        addDeadLetterQueueMaxSizeAlarm: toAlarmProps('maxMessageCount', warnProps?.deadLetterQueueMaxSize, critProps?.deadLetterQueueMaxSize, warnActions, critActions, undefined, 0) as Record<string, MaxMessageCountThreshold> | undefined,
        addDeadLetterQueueMaxMessageAgeAlarm: toAlarmProps('maxAgeInSeconds', warnProps?.deadLetterQueueMaxAge?.toSeconds(), critProps?.deadLetterQueueMaxAge?.toSeconds(), warnActions, critActions) as Record<string, MaxMessageAgeThreshold> | undefined,
        addDeadLetterQueueMaxIncomingMessagesAlarm: toAlarmProps('maxIncomingMessagesCount', warnProps?.deadLetterQueueMaxIncoming, critProps?.deadLetterQueueMaxIncoming, warnActions, critActions) as Record<string, MaxIncomingMessagesCountThreshold> | undefined,
        addDeadLetterQueueToSummaryDashboard: this.queue !== undefined,
      });
    } else {
      this.monitoring.monitorSqsQueue({
        queue: this.queue,
        addQueueMinSizeAlarm: toAlarmProps('minMessageCount', warnProps?.minSize, critProps?.minSize, warnActions, critActions) as Record<string, MinMessageCountThreshold> | undefined,
        addQueueMaxSizeAlarm: toAlarmProps('maxMessageCount', warnProps?.maxSize, critProps?.maxSize, warnActions, critActions) as Record<string, MaxMessageCountThreshold> | undefined,
        addQueueMaxMessageAgeAlarm: toAlarmProps('maxAgeInSeconds', warnProps?.maxAge?.toSeconds(), critProps?.maxAge?.toSeconds(), warnActions, critActions, undefined, Duration.minutes(15).toSeconds()) as Record<string, MaxMessageAgeThreshold> | undefined,
        addQueueMaxTimeToDrainMessagesAlarm: toAlarmProps('maxTimeToDrain', warnProps?.maxTimeToDrain, critProps?.maxTimeToDrain, warnActions, critActions) as Record<string, MaxTimeToDrainThreshold> | undefined,
        addQueueMinIncomingMessagesAlarm: toAlarmProps('minIncomingMessagesCount', warnProps?.minIncoming, critProps?.minIncoming, warnActions, critActions) as Record<string, MinIncomingMessagesCountThreshold> | undefined,
        addQueueMaxIncomingMessagesAlarm: toAlarmProps('maxIncomingMessagesCount', warnProps?.maxIncoming, critProps?.maxIncoming, warnActions, critActions) as Record<string, MaxIncomingMessagesCountThreshold> | undefined
      });
    }
  }

  grantConsumeMessages(grantee: iam.IGrantable): iam.Grant {
    return this.queue.grantConsumeMessages(grantee);
  }

  grantSendMessages(grantee: iam.IGrantable): iam.Grant {
    return this.queue.grantSendMessages(grantee);
  }

  grantPurge(grantee: iam.IGrantable): iam.Grant {
    return this.queue.grantPurge(grantee);
  }

  grant(grantee: iam.IGrantable, ...actions: string[]): iam.Grant {
    return this.queue.grant(grantee, ...actions);
  }
}
