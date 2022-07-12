import * as cdk from "aws-cdk-lib";
import {SourceType, Website} from "../../aws-website";
import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";

test("Hugo Website Test", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  new Website(stack, 'TestWebsite', {
    sourceType: SourceType.HUGO,
    sourceDirectory: path.join(__dirname, "hugo-website")
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::CloudFront::Distribution", {});
});

// TODO Need a way to skip tests
// test("Npm Dist Website Test", () => {
//   const app = new cdk.App();
//   const stack = new cdk.Stack(app, "TestStack");
//   new Website(stack, "TestWebsite", {
//     sourceType: SourceType.NpmDist,
//     sourceDirectory: path.join(__dirname, "angular-website")
//   });
//   const template = Template.fromStack(stack);
//   template.hasResourceProperties("AWS::CloudFront::Distribution", {});
// });

