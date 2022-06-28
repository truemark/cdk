import {Construct} from "constructs";
import {Alarm, IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {CustomAlarmThreshold, IDashboardFactory, MonitoringFacade} from "cdk-monitoring-constructs";
import {ITopic} from "aws-cdk-lib/aws-sns";
import {Duration, Stack} from "aws-cdk-lib";
import {AlarmHelper} from "./alarm-helper";
import { CustomAlarmThresholdKey } from "./alarm-facade";

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
};
export type AlarmsCategoryKey = keyof AlarmsCategoryOptions;


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
   *
   * If no value is provided, a default facade will be created.
   */
  readonly monitoringFacade?: MonitoringFacade;

  /**
   * The DashboardFactory to use when generating CloudWatch dashboards.
   *
   * If not defined, dashboards are not generated.
   */
  readonly dashboardFactory?: IDashboardFactory;

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
    oprop: AlarmsCategoryKey,
    tprop: CustomAlarmThresholdKey,
    defaultCriticalThreshold?: number | Duration,
    defaultWarningThreshold?: number | Duration) {

    return AlarmHelper.toRecord<C, T>(
      this.props, oprop, tprop, defaultCriticalThreshold, defaultWarningThreshold);
  }

  protected constructor(scope: Construct, id: string, props: P) {
    super(scope, id);
    this.props = props;
    this.monitoringFacade = props.monitoringFacade??new MonitoringFacade(this, 'MonitoringFacade', {
      metricFactoryDefaults: {},
      alarmFactoryDefaults: {
        actionsEnabled: true,
        alarmNamePrefix: props.alarmNamePrefix??Stack.of(this).stackName
      },
      dashboardFactory: props.dashboardFactory
    });
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
