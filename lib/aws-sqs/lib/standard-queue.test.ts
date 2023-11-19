import {StandardQueue} from '../index';
import {Template} from 'aws-cdk-lib/assertions';
import {HelperTest} from '../../helper.test';

test('Standard Queue Test', () => {
  const stack = HelperTest.stack();
  new StandardQueue(stack, 'Test1');
  new StandardQueue(stack, 'Test2');
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::SQS::Queue', {});
  HelperTest.logResources(template, 'AWS::CloudWatch::Alarm');
  // console.log(template.findResources("AWS::CloudWatch::Alarm"));
  // console.log(template.findResources("AWS::SQS::Queue"));
});
