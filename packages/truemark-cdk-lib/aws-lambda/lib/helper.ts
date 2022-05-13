import {Duration} from "aws-cdk-lib";
import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";
import {CustomAlarmThreshold} from "cdk-monitoring-constructs";
import {StandardAlarmActionsStrategy} from "../../aws-monitoring";

export function toAlarmProps(
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
