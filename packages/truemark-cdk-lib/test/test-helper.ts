import * as cdk from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";
import {IAlarm} from "aws-cdk-lib/aws-cloudwatch";
import {Stack} from "aws-cdk-lib";
import {EstimatedChargesAlarm} from "../aws-cloudwatch";

export enum ResourceType {
  LAMBDA_FUNCTION = "AWS::Lambda::Function",
  CLOUDWATCH_ALARM = "AWS::CloudWatch::Alarm",
  DYNAMODB_TABLE = "AWS::DynamoDB::Table",
  SSM_PARAMETER = "AWS::SSM::Parameter"
}

export class TestHelper {

  static stack(app?: cdk.App, id?: string): cdk.Stack {
    return new cdk.Stack(app??new cdk.App(), id??"TestStack");
  }

  static logResources(template: Template, type: string | ResourceType, props?: any) {
    console.log(template.findResources(type, props));
  }

}
