import * as path from "path";
import {ResourceType, TestHelper} from "../test-helper";
import {ExtendedGoFunction} from "../../aws-lambda";
import {Template} from "aws-cdk-lib/assertions";

test("Test GoFunctionAlpha", () => {
  const stack = TestHelper.stack();
  new ExtendedGoFunction(stack, "TestFunction", {
    entry: path.join(TestHelper.resolveTestFiles("go-lambda"))
  })
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "provided.al2"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
