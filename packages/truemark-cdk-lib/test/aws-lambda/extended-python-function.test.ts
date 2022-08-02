import * as path from "path";
import {ResourceType, TestHelper} from "../test-helper";
import {ExtendedPythonFunction} from "../../aws-lambda";
import {Runtime} from "aws-cdk-lib/aws-lambda";
import {Template} from "aws-cdk-lib/assertions";

test("Test PythonFunctionAlpha", () => {
  const stack = TestHelper.stack();
  new ExtendedPythonFunction(stack, "TestFunction", {
    entry: path.join(__dirname, "python-lambda"),
    runtime: Runtime.PYTHON_3_9
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "python3.9"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
