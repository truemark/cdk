import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import {Template} from "aws-cdk-lib/assertions";
import {PythonFunction} from "../../aws-lambda";

test('Python Lambda', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  new PythonFunction(stack, 'TestFunction', {
    entry: path.join(__dirname, 'python-lambda')
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::Lambda::Function", {
  });
});
