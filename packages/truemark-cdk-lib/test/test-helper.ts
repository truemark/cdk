import * as cdk from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";
import {ExtendedStack} from "../aws-codepipeline";

export enum ResourceType {
  CODEPIPELINE = "AWS::CodePipeline::Pipeline",
  CLOUDWATCH_ALARM = "AWS::CloudWatch::Alarm",
  LAMBDA_FUNCTION = "AWS::Lambda::Function",
  DYNAMODB_TABLE = "AWS::DynamoDB::Table",
  SSM_PARAMETER = "AWS::SSM::Parameter"
}

export class TestHelper {

  static stage(app?: cdk.App, id?: string): cdk.Stage {
    return new cdk.Stage(app??new cdk.App(), id??"TestStage");
  }

  static stack(scope?: cdk.App | cdk.Stage, id?: string): cdk.Stack {
    return new ExtendedStack(scope ?? new cdk.App(), id ?? "TestStack");
  }

  static logResources(template: Template, type: string | ResourceType, props?: any) {
    console.log(template.findResources(type, props));
  }
}
