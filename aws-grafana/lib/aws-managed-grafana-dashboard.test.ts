import * as cdk from 'aws-cdk-lib';
import {Template, Match} from 'aws-cdk-lib/assertions';
import {AwsCustomResource} from 'aws-cdk-lib/custom-resources';
import {AwsManagedGrafanaDashboard} from './aws-managed-grafana-dashboard';
import * as fs from 'fs';
import * as jsonUtils from '../../helpers/lib/json-utils';
import {Role} from 'aws-cdk-lib/aws-iam';

// Mock the JSON replacement function
jest.mock('../../helpers/lib/json-utils', () => ({
  replaceJsonFields: jest.fn((json, fields) => ({...json, ...fields})),
}));

// Mock AwsCustomResource to prevent real AWS API calls
jest.mock('aws-cdk-lib/custom-resources', () => ({
  AwsCustomResource: jest.fn().mockImplementation(() => ({})),
  AwsCustomResourcePolicy: {
    fromStatements: jest.fn().mockReturnValue({}),
  },
  PhysicalResourceId: {
    of: jest.fn().mockReturnValue({}),
  },
}));

// Mock IAM Role lookups to prevent real AWS IAM API calls
jest.spyOn(Role, 'fromRoleArn').mockImplementation(
  () =>
    ({
      roleArn: 'arn:aws:iam::123456789012:role/MockedRole',
      addToPolicy: jest.fn(),
    }) as unknown as Role,
);

// Mock file system operations
jest.spyOn(fs, 'existsSync').mockReturnValue(true);
jest.spyOn(fs, 'readFileSync').mockReturnValue(
  JSON.stringify({
    title: '{{title}}',
    panels: [
      {title: '{{panelTitle}}', type: 'graph', datasource: 'Prometheus'},
    ],
  }),
);

describe('AwsManagedGrafanaDashboard', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    jest.clearAllMocks();
    stack = new cdk.Stack();
  });

  test('Creates IAM Role for same-account AMG', () => {
    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      amgWorkspaceId: 'test-workspace',
      amgAccountId: stack.account,
      amgRegion: stack.region,
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Effect: 'Allow',
            Principal: {Service: 'grafana.amazonaws.com'},
            Action: 'sts:AssumeRole',
          }),
        ]),
      },
    });

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Effect: 'Allow',
            Action: ['grafana:CreateDashboard', 'grafana:UpdateDashboard'],
            Resource: Match.stringLikeRegexp(
              'arn:aws:grafana:.*:workspace/test-workspace',
            ),
          }),
        ]),
      },
    });
  });

  test('Looks up an existing IAM role for cross-account AMG without modifying it', () => {
    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      amgWorkspaceId: 'test-workspace',
      amgAccountId: '123456789012', // Different account
      amgRegion: stack.region,
      amgRoleArn: 'arn:aws:iam::123456789012:role/ExistingGrafanaRole',
    });

    expect(Role.fromRoleArn).toHaveBeenCalledWith(
      expect.anything(),
      'AMGCrossAccountRole',
      'arn:aws:iam::123456789012:role/ExistingGrafanaRole',
    );
  });

  test('Fails if cross-account AMG does not provide amgRoleArn', () => {
    expect(() => {
      new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
        amgWorkspaceId: 'test-workspace',
        amgAccountId: '123456789012', // Different account
        amgRegion: stack.region,
      });
    }).toThrowError(
      `Cross-account AMG requires an existing IAM role ARN to assume. Provide 'amgRoleArn'.`,
    );
  });

  test('Throws error if the JSON template file is missing', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    expect(() => {
      new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
        amgWorkspaceId: 'test-workspace',
        amgAccountId: stack.account,
        amgRegion: stack.region,
        dashboardFilePath: '/non/existent/file.json',
      });
    }).toThrowError('Dashboard JSON file not found: /non/existent/file.json');
  });

  test('Replaces placeholders in the JSON template', () => {
    const replaceJsonFieldsSpy = jest.spyOn(jsonUtils, 'replaceJsonFields');

    const dashboardFields = {
      title: 'My Custom Dashboard',
      panelTitle: 'CPU Usage',
    };

    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      amgWorkspaceId: 'test-workspace',
      amgAccountId: stack.account,
      amgRegion: stack.region,
      dashboardFields,
    });

    expect(replaceJsonFieldsSpy).toHaveBeenCalledWith(
      expect.objectContaining({title: '{{title}}'}),
      dashboardFields,
    );
  });

  test('Creates Custom Resource for AMG Dashboard', () => {
    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      amgWorkspaceId: 'test-workspace',
      amgAccountId: stack.account,
      amgRegion: stack.region,
    });

    const mockedAwsCustomResource = AwsCustomResource as unknown as jest.Mock;

    expect(AwsCustomResource).toHaveBeenCalledTimes(1);

    expect(mockedAwsCustomResource).toHaveBeenCalledWith(
      expect.anything(),
      'GrafanaDashboard',
      expect.objectContaining({
        onCreate: expect.objectContaining({
          service: 'Grafana',
          action: 'createDashboard',
          parameters: expect.objectContaining({
            workspaceId: 'test-workspace',
            overwrite: true,
          }),
        }),
        role: expect.any(Object),
        policy: expect.any(Object),
      }),
    );
  });
});
