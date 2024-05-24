import {ResourceType, HelperTest} from '../../helper.test';
import {Template} from 'aws-cdk-lib/assertions';
import {ExtendedStack} from './extended-stack';

test('Test ExportedStack', () => {
  const stage = HelperTest.stage();
  const stack = new ExtendedStack(stage, 'TestStack');
  stack.exportParameter('TestParameter', 'TestValue');
  stack.outputParameter('TestParameter', 'TestValue');
  const template = Template.fromStack(stack);
  template.hasResourceProperties(ResourceType.SSM_PARAMETER, {
    Type: 'String',
    Value: 'TestValue',
    Name: '/TestStage/TestStack/Exports/TestParameter',
  });
  template.hasOutput('TestParameter', {
    Value: 'TestValue',
  });
});
