import {ResourceType, TestHelper} from "../test-helper";
import {NodejsFunction} from "../../aws-lambda";
import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";

test("Test Nodejs Function", () => {
  const stack = TestHelper.stack();
  new NodejsFunction(stack, "TestFunction", {
    entry: path.join(__dirname, "typescript-lambda", "index.ts")
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "nodejs14.x"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
