import {AlarmActionStrategyProps, IAlarmActionStrategy} from "cdk-monitoring-constructs";
import {IAlarmAction} from "aws-cdk-lib/aws-cloudwatch";

export interface StandardAlarmActionsStrategyProps {
  readonly actions?: IAlarmAction[];
}

export class StandardAlarmActionsStrategy implements IAlarmActionStrategy {

  protected readonly actions: IAlarmAction[];

  constructor(props: StandardAlarmActionsStrategyProps) {
    this.actions = props.actions??[]
  }

  addAlarmActions(props: AlarmActionStrategyProps): void {
    this.actions?.forEach((action) => {
      props.alarm.addAlarmAction(action)
    });
  }
}
