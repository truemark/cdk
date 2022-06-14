import * as path from "path";
import {ResourceType, TestHelper} from "../test-helper";
import {GoFunctionAlpha} from "../../aws-lambda";
import {Template} from "aws-cdk-lib/assertions";

test("Test GoFunctionAlpha", () => {
  const stack = TestHelper.stack();
  new GoFunctionAlpha(stack, "TestFunction", {
    entry: path.join(__dirname, "go-lambda")
  })
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "provided.al2"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
