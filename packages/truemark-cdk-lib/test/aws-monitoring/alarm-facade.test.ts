import {AlarmFacade, AlarmFacadeSet} from "../../aws-monitoring";
import * as sns from "aws-cdk-lib/aws-sns";
import * as actions from "aws-cdk-lib/aws-cloudwatch-actions";
import {TestHelper} from "../test-helper";
import {Alarm} from "aws-cdk-lib/aws-cloudwatch";
import {Duration} from "aws-cdk-lib";

test("Create AlarmFacade", () => {
  const stack = TestHelper.stack();
  const topic = new sns.Topic(stack, "TestTopic");
  const action = new actions.SnsAction(new sns.Topic(stack, "TestActionTopic"));
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: 1,
    defaultThreshold: 10,
    topics: [topic],
    actions: [action]
  });
  expect(facade.actions.length).toBe(2);
  const threshold: any = facade.toCustomAlarmThreshold();
  expect(threshold?.actionsEnabled).toBe(true);
  expect(threshold?.["TestProp"]).toBe(1);
});

test("Create AlarmFacade Default Number Threshold", () => {
  const stack = TestHelper.stack();
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: undefined,
    defaultThreshold: 0
  });
  const threshold: any = facade.toCustomAlarmThreshold();
  expect(threshold?.actionsEnabled).toBe(true);
  expect(threshold?.["TestProp"]).toBe(0);
});

test("Create AlarmFacade Default Duration Threshold", () => {
  const stack = TestHelper.stack();
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: undefined,
    defaultThreshold: Duration.hours(1)
  });
  const threshold: any = facade.toCustomAlarmThreshold();
  expect(threshold?.actionsEnabled).toBe(true);
  expect(threshold?.["TestProp"]).toStrictEqual(Duration.hours(1));
});

test("Create AlarmFacade Disable Number Threshold", () => {
  const stack = TestHelper.stack();
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: -1,
    defaultThreshold: 0
  });
  const threshold = facade.toCustomAlarmThreshold();
  expect(threshold).toBeUndefined();
});

test("Create AlarmFacade Disable Duration Threshold", () => {
  const stack = TestHelper.stack();
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: Duration.hours(0),
    defaultThreshold: Duration.hours(1)
  });
  const threshold = facade.toCustomAlarmThreshold();
  expect(threshold).toBeUndefined();
});

test("Create Undefined AlarmFacade", () => {
  const stack = TestHelper.stack();
  const facade = new AlarmFacade({
    prop: "TestProp",
    threshold: undefined,
    defaultThreshold: undefined
  });
  const threshold = facade.toCustomAlarmThreshold();
  expect(threshold).toBeUndefined();
});

// TODO Need to add tests for AlarmFacadeSet
