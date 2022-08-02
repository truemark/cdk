import {Construct} from "constructs";
import {Alarm, IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {CustomAlarmThreshold, MonitoringFacade} from "cdk-monitoring-constructs";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {Duration, Stack} from "aws-cdk-lib";
import {AlarmHelper} from "./alarm-helper";
import {ExtendedStack} from "../../aws-codepipeline";

export enum AlarmCategory {
  Critical = "Critical",
  Warning = "Warning"
}

export interface AlarmsCategoryOptions {

  /**
   * Topics to send alarm notifications
   */
  readonly notifyTopics?: ITopic[];

  /**
   * Actions to send alarm notifications
   */
  readonly notifyActions?: IAlarmAction[];
}

export interface AlarmsOptions<T extends AlarmsCategoryOptions> {

  /**
   * Alarm thresholds for critical alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly criticalAlarmOptions?: T;

  /**
   * Alarm thresholds for warning alarms.
   *
   * If no properties are provided, a set of default alarms are created.
   */
  readonly warningAlarmOptions?: T;

  /**
   * Main entry point for monitoring.
   */
  readonly monitoringFacade?: MonitoringFacade;

  /**
   * Add widgets to alarm dashboard.
   *
   * @default true
   */
  readonly addToAlarmDashboard?: boolean;

  /**
   * Add widgets to detailed dashboard.
   *
   * @default true
   */
  readonly addToDetailDashboard?: boolean;

  /**
   * Add widgets to summary dashboard.
   *
   * @default true
   */
  readonly addToSummaryDashboard?: boolean;

  /**
   * Prefix for generated alarms.
   *
   * @default Stack.of(this).stackName
   */
  readonly alarmNamePrefix?: string;
}

/**
 * Base class for all Alarms constructs.
 */
export abstract class AlarmsBase<C extends AlarmsCategoryOptions, P extends AlarmsOptions<C>> extends Construct {

  /**
   * The MonitoringFacade instance either passed in or generated.
   */
  readonly monitoringFacade: MonitoringFacade;

  /**
   * The properties passed into the constructor.
   *
   * @protected
   */
  protected readonly props: P;

  /**
   * Helper method to generate alarm records.
   *
   * @param oprop property from the AlarmsCategoryOptions instance
   * @param tprop property from the CustomAlarmThreshold instance
   * @param defaultCriticalThreshold optional default value for the critical threshold
   * @param defaultWarningThreshold optional default value for the warning threshold
   * @protected
   */
  protected toRecord<T extends CustomAlarmThreshold>(
    oprop: keyof C,
    tprop: keyof T,
    defaultCriticalThreshold?: number | Duration,
    defaultWarningThreshold?: number | Duration) {
    return AlarmHelper.toRecord<C, T>(
      this.props, oprop, tprop, defaultCriticalThreshold, defaultWarningThreshold);
  }

  protected constructor(scope: Construct, id: string, props: P) {
    super(scope, id);
    this.props = props;

    if (props.monitoringFacade !== undefined) {
      this.monitoringFacade = props.monitoringFacade
    } else {
      const stack = Stack.of(this);
      if ("monitoringFacade" in stack) {
        const mf = (stack as ExtendedStack).monitoringFacade;
        if (mf !== undefined) {
          this.monitoringFacade = mf;
        }
      }
    }
    if (this.monitoringFacade === undefined) {
      throw new Error("MonitoringFacade must be provided as a constructor property or as monitoringFacade property on parent Stack");
    }
  }

  getAlarms(category: AlarmCategory): Alarm[] {
    return [...this.monitoringFacade.createdAlarmsWithDisambiguator(category).map((awa) => awa.alarm).values()];
  }

  getCriticalAlarms(): Alarm[] {
    return this.getAlarms(AlarmCategory.Critical);
  }

  getWarningAlarms(): Alarm[] {
    return this.getAlarms(AlarmCategory.Warning);
  }
}
