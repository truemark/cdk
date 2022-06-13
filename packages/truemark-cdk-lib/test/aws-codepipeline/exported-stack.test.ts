import {ResourceType, TestHelper} from "../test-helper";
import {ExportedStack} from "../../aws-codepipeline";
import {Template} from "aws-cdk-lib/assertions";

test("Test ExportedStack", () => {
  const stage = TestHelper.stage();
  const stack = new ExportedStack(stage, "TestStack");
  stack.exportParameter("TestParameter", "TestValue", true);
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.SSM_PARAMETER, {
    Type: "String",
    Value: "TestValue",
    Name: "/TestStage/TestStack/Exports/TestParameter"
  });
  template.hasOutput("TestParameter", {
    Value: "TestValue"
  })
});
