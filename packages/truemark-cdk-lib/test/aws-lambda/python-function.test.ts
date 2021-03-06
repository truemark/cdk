import * as path from "path";
import {Template} from "aws-cdk-lib/assertions";
import {PythonFunction} from "../../aws-lambda";
import {ResourceType, TestHelper} from "../test-helper";

test("Test PythonFunction", () => {
  const stack = TestHelper.stack();
  new PythonFunction(stack, "TestFunction", {
    entry: path.join(__dirname, "python-lambda")
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
    Runtime: "python3.9"
  });
  template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
