import * as cdk from "aws-cdk-lib";
import {Website} from "../../aws-website";
import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";

test("Create Website Test", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  new Website(stack, 'TestWebsite', {
    sourceDirectory: path.join(__dirname, "hugo-website")
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::CloudFront::Distribution", {});
});
