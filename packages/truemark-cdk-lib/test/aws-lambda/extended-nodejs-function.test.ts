import {ResourceType, TestHelper} from "../test-helper";
import {ExtendedNodejsFunction} from "../../aws-lambda";
import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";
import {Runtime} from "aws-cdk-lib/aws-lambda";

test("Test NodejsFunction", () => {
  const stack = TestHelper.stack();
  new ExtendedNodejsFunction(stack, "TestFunction", {
    entry: path.join(__dirname, "typescript-lambda", "index.ts"),
    runtime: Runtime.NODEJS_16_X,
    // bundling: {
    //   forceDockerBundling: true
    // }
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "nodejs16.x"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
