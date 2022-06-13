import {ResourceType, TestHelper} from "../test-helper";
import {ParameterStore} from "../../aws-ssm";
import {Template} from "aws-cdk-lib/assertions";

test("Test ParameterStore", () => {
  const stack = TestHelper.stack();
  const store = new ParameterStore(stack, "TestParameters", {
    prefix: "Prefix",
    suffix: "Suffix"
  });
  store.write("Test", "Success");
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.SSM_PARAMETER, {
    Type: "String",
    Value: "Success",
    Name: "PrefixTestSuffix"
  });
});
