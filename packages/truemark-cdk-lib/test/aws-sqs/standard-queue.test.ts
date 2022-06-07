import * as cdk from "aws-cdk-lib";
import {StandardQueue} from "../../aws-sqs";
import {Template} from "aws-cdk-lib/assertions";

test("Standard Queue Test", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  new StandardQueue(stack, 'Test', {});
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::SQS::Queue", {});
  console.log(template.findResources("AWS::CloudWatch::Alarm"));
  console.log(template.findResources("AWS::SQS::Queue"));
});
