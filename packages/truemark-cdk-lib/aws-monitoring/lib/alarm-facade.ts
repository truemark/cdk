import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {AlarmHelper} from "./alarm-helper";
import {Duration} from "aws-cdk-lib";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {CustomAlarmThreshold} from "cdk-monitoring-constructs";
import {StandardAlarmActionsStrategy} from "./standard-alarm-actions-strategy";
import {AlarmCategory, AlarmsCategoryOptions, AlarmsOptions} from "./alarms-base";

/**
 * Properties for AlarmFacade
 */
export class AlarmFacadeProps {
  prop!: string;
  threshold?: number | Duration;
  defaultThreshold?: number | Duration;
  topics?: ITopic[];
  actions?: IAlarmAction[];
}

/**
 * Facade to assist in generating a CustomAlarmThreshold instance.
 */
export class AlarmFacade {

  readonly actions: IAlarmAction[];

  private props: AlarmFacadeProps;

  constructor(props: AlarmFacadeProps) {
    this.props = props;
    this.actions = AlarmHelper.combineActions(props.actions, props.topics);
  }

  /**
   * Converts this AlarmFacade into a CustomAlarmThreshold instance
   */
  toCustomAlarmThreshold(): CustomAlarmThreshold | undefined {
    const threshold: undefined | number | Duration = this.props.threshold??this.props.defaultThreshold;
    if (threshold !== undefined) {
      if ((typeof threshold === "number" && threshold > -1)
        || (typeof threshold === "object" && (threshold as Duration).toSeconds() > 0)) {
        return {
          [this.props.prop!]: this.props.threshold ?? this.props.defaultThreshold,
          actionsEnabled: true,
          actionOverride: new StandardAlarmActionsStrategy({actions: this.actions}),
        }
      }
    }
    return undefined;
  }
}

/**
 * Facade to assist in creating Record instances containing alarms.
 */
export class AlarmFacadeSet<O extends AlarmsCategoryOptions, T extends CustomAlarmThreshold> {

  private readonly criticalOptions?: O;
  private readonly warningOptions?: O;
  private readonly record: Record<string, T>;

  constructor(props: AlarmsOptions<O>) {
    this.criticalOptions = props.criticalAlarmOptions;
    this.warningOptions = props.warningAlarmOptions;
    this.record = {};
  }

  /**
   * Add an alarm to the record set.
   *
   * @param category category of the alarm
   * @param oprop property from the AlarmsCategoryOptions instance
   * @param tprop property from the CustomAlarmThreshold instance
   * @param defaultThreshold optional default value for the threshold
   */
  addAlarm(category: AlarmCategory, oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet<O, T> {

    const options = category === AlarmCategory.CRITICAL ? this.criticalOptions : this.warningOptions;
    
    // TODO (CDK-JSII): We need to see if this actually works
    type OK = keyof typeof options;
    const thresh = options?.[oprop as OK] as number | Duration | undefined;

    const customAlarmThreshold = new AlarmFacade({
      prop: tprop as string,
      threshold: thresh,
      defaultThreshold,
      topics: options?.notifyTopics,
      actions: options?.notifyActions
    }).toCustomAlarmThreshold();
    if (customAlarmThreshold) {
      this.record[category] = customAlarmThreshold as T
    }
    return this;
  }

  /**
   * Adds a critical alarm to the record set.
   *
   * @param oprop property from the AlarmsCategoryOptions instance
   * @param tprop property from the CustomAlarmThreshold instance
   * @param defaultThreshold optional default value for the threshold
   */
  addCriticalAlarm(oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet<O, T> {
    return this.addAlarm(AlarmCategory.CRITICAL, oprop, tprop, defaultThreshold);
  }

  /**
   * Adds a warning alarm to the record set.
   *
   * @param oprop property from the AlarmsCategoryOptions instance
   * @param tprop property from the CustomAlarmThreshold instance
   * @param defaultThreshold optional default value for the threshold
   */
  addWarningAlarm(oprop: string, tprop: string, defaultThreshold?: number | Duration): AlarmFacadeSet<O, T> {
    return this.addAlarm(AlarmCategory.WARNING, oprop, tprop, defaultThreshold);
  }

  /**
   * Adds critical and warning alarms to the record set.
   *
   * @param oprop property from the AlarmsCategoryOptions instance
   * @param tprop property from the CustomAlarmThreshold instance
   * @param defaultCriticalThreshold optional default value for the critical threshold
   * @param defaultWarningThreshold optional default value for the warning threshold
   */
  addAlarms(oprop: string, tprop: string,
           defaultCriticalThreshold?: number | Duration,
           defaultWarningThreshold?: number | Duration): AlarmFacadeSet<O, T> {
    this.addCriticalAlarm(oprop, tprop, defaultCriticalThreshold);
    this.addWarningAlarm(oprop, tprop, defaultWarningThreshold);
    return this;
  }

  /**
   * Returns the record set if alarms were created and undefined if otherwise.
   */
  toRecord(): Record<string, T> | undefined {
    return Object.keys(this.record).length > 0 ? this.record : undefined;
  }
}
