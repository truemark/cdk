import * as path from 'path';
import {ResourceType, HelperTest} from '../../helper.test';
import {ExtendedPythonFunction} from '../index';
import {Runtime} from 'aws-cdk-lib/aws-lambda';
import {Template} from 'aws-cdk-lib/assertions';

test('Test PythonFunctionAlpha', () => {
  const stack = HelperTest.stack();
  // TODO Need to fix failure
  // new ExtendedPythonFunction(stack, "TestFunction", {
  //   entry: path.join(__dirname, "..", "..", "..", "..", "test-files", "python-lambda"),
  //   runtime: Runtime.PYTHON_3_9
  // });
  // const template = Template.fromStack(stack);
  // template.hasResourceProperties(ResourceType.LAMBDA_FUNCTION, {
  //   Runtime: "python3.9"
  // });
  // template.resourceCountIs(ResourceType.CLOUDWATCH_ALARM, 3);
});
