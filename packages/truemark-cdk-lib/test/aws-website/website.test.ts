import {SourceType, Website} from "../../aws-website";
import {Template} from "aws-cdk-lib/assertions";
import {TestHelper} from "../test-helper";
import {DomainName} from "../../aws-route53";

test("Hugo Website Test", () => {
  const stack = TestHelper.stack();
  new Website(stack, 'TestWebsite', {
    sourceType: SourceType.Hugo,
    sourceDirectory: TestHelper.resolveTestFiles("hugo-website")
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::CloudFront::Distribution", {});
});

// TODO We need to speed this up
// test("Npm Dist Website Test", () => {
//   const stack = TestHelper.stack();
//   new Website(stack, "TestWebsite", {
//     sourceType: SourceType.NpmDist,
//     sourceDirectory: TestHelper.resolveTestFiles("angular-website")
//   });
//   const template = Template.fromStack(stack);
//   template.hasResourceProperties("AWS::CloudFront::Distribution", {});
// });

// TODO Need to fix
// test("Website Certificate Test", () => {
//   const stack = TestHelper.stack();
//   new Website(stack, "TestWebsite", {
//     sourceType: SourceType.Hugo,
//     sourceDirectory: TestHelper.resolveTestFiles("hugo-website"),
//     domainNames: [
//       new DomainName("test", "example.com"),
//       new DomainName("test2", "example.com")
//     ]
//   });
//   const template = Template.fromStack(stack);
//   console.log(template.toJSON());
//   // TestHelper.logResources()
// });
