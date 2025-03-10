import * as cdk from 'aws-cdk-lib';
import {AwsCustomResource} from 'aws-cdk-lib/custom-resources';
import {AwsManagedGrafanaDashboard} from './aws-managed-grafana-dashboard';
import * as fs from 'fs';
import * as jsonUtils from '../../helpers/lib/json-utils';
import {Role} from 'aws-cdk-lib/aws-iam';

jest.mock('../../helpers/lib/json-utils', () => ({
  replaceJsonFields: jest.fn((json, fields) => ({...json, ...fields})),
}));

jest.mock('aws-cdk-lib/custom-resources', () => ({
  AwsCustomResource: jest.fn().mockImplementation(() => ({})),
  AwsCustomResourcePolicy: {
    fromStatements: jest.fn().mockReturnValue({}),
  },
  PhysicalResourceId: {
    of: jest.fn().mockReturnValue({}),
  },
}));

jest.spyOn(Role, 'fromRoleArn').mockImplementation(
  () =>
    ({
      roleArn: 'arn:aws:iam::123456789012:role/MockedRole',
      addToPolicy: jest.fn(),
    }) as unknown as Role,
);

jest.spyOn(fs, 'existsSync').mockReturnValue(true);
jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
  return `{
    "title": "{{title}}",
    "panels": [
      {"title": "{{panelTitle}}", "type": "graph", "datasource": "Prometheus"}
    ]
  }`;
});

describe('AwsManagedGrafanaDashboard', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    jest.clearAllMocks();
    stack = new cdk.Stack();
  });

  test('Looks up an existing IAM role for cross-account AMG without modifying it', () => {
    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      grafanaConfig: {
        amgWorkspaceId: 'test-workspace',
        amgAccountId: '123456789012', // Different account
        amgRegion: stack.region,
        amgRoleArn: 'arn:aws:iam::123456789012:role/ExistingGrafanaRole',
      },
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
        grafanaConfig: {
          amgWorkspaceId: 'test-workspace',
          amgAccountId: '123456789012', // Different account
          amgRegion: stack.region,
        },
      });
    }).toThrowError(
      `Cross-account AMG requires an existing IAM role ARN to assume. Provide 'amgRoleArn'.`,
    );
  });

  test('Throws error if the JSON template file is missing', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    expect(() => {
      new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
        grafanaConfig: {
          amgWorkspaceId: 'test-workspace',
          amgAccountId: stack.account,
          amgRegion: stack.region,
          dashboardFilePath: '/non/existent/file.json',
        },
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
      grafanaConfig: {
        amgWorkspaceId: 'test-workspace',
        amgAccountId: stack.account,
        amgRegion: stack.region,
        dashboardFields,
      },
    });

    expect(replaceJsonFieldsSpy).toHaveBeenCalledWith(
      expect.objectContaining({title: '{{title}}'}),
      dashboardFields,
    );
  });

  test('Creates Custom Resource for AMG Dashboard', () => {
    new AwsManagedGrafanaDashboard(stack, 'TestAMGDashboard', {
      grafanaConfig: {
        amgWorkspaceId: 'test-workspace',
        amgAccountId: stack.account,
        amgRegion: stack.region,
      },
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
