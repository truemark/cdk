import * as cdk from "aws-cdk-lib";
import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";
import {ResourceEnvironment} from "aws-cdk-lib";
import {ExtendedStack} from "../aws-cdk";

export enum ResourceType {
  CODEPIPELINE = "AWS::CodePipeline::Pipeline",
  CLOUDWATCH_ALARM = "AWS::CloudWatch::Alarm",
  LAMBDA_FUNCTION = "AWS::Lambda::Function",
  DYNAMODB_TABLE = "AWS::DynamoDB::Table",
  SSM_PARAMETER = "AWS::SSM::Parameter"
}

export class TestHelper {

  static readonly DEFAULT_REGION = "us-east-2";
  static readonly DEFAULT_ACCOUNT = "100000000000";

  static stage(app?: cdk.App, id?: string): cdk.Stage {
    return new cdk.Stage(app??new cdk.App(), id??"TestStage");
  }

  static stack(scope?: cdk.App | cdk.Stage, id?: string): cdk.Stack {
    return new ExtendedStack(scope ?? new cdk.App(), id ?? "TestStack");
  }

  static resolveTestFiles(childPath?: string): string {
    const dir = path.join(__dirname, "..", "..", "..", "test-files");
    return path.resolve(childPath == undefined ? dir : path.join(dir, childPath));
  }

  static logResources(template: Template, type: string | ResourceType, props?: any) {
    console.log(template.findResources(type, props));
  }

  static logTemplate(template: Template) {
    console.log(JSON.stringify(template, null, "  "));
  }

  static env(): ResourceEnvironment {
    return {
     account: TestHelper.DEFAULT_ACCOUNT,
     region: TestHelper.DEFAULT_REGION
    }
  }
}
