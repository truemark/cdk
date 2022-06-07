import * as cdk from "aws-cdk-lib";
import {ObservedQueue} from "../../aws-sqs";
import {Template} from "aws-cdk-lib/assertions";

test("Observed Queue Test", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  new ObservedQueue(stack, 'Test', {

  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::SQS::Queue", {

  });
});
