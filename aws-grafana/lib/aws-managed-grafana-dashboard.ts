import {Construct} from 'constructs';
import {Stack} from 'aws-cdk-lib';
import {Role, PolicyStatement, ServicePrincipal} from 'aws-cdk-lib/aws-iam';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from 'aws-cdk-lib/custom-resources';
import {ExtendedConstructProps} from '../../aws-cdk';
import * as fs from 'fs';
import * as path from 'path';
import {replaceJsonFields} from '../../helpers/lib/json-utils';
import {GrafanaDashboardConfig} from './grafana-configuration';

/**
 * Properties for AWS Managed Grafana Dashboard.
 */
export interface AwsManagedGrafanaDashboardProps
  extends ExtendedConstructProps {
  /**
   * AWS Managed Grafana dashboard configuration.
   */
  readonly grafanaConfig?: GrafanaDashboardConfig;
}

export class AwsManagedGrafanaDashboard extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: AwsManagedGrafanaDashboardProps,
  ) {
    super(scope, id);

    const currentAccountId = Stack.of(this).account;

    if (!props.grafanaConfig) {
      return;
    }

    const grafanaConfig = props.grafanaConfig!;
    const dashboardJsonPath = grafanaConfig.dashboardFilePath
      ? path.resolve(grafanaConfig.dashboardFilePath)
      : path.join(
          __dirname,
          '../../resources/ecs-generic-grafana-dashboard-template.json',
        );

    if (!fs.existsSync(dashboardJsonPath)) {
      throw new Error(`Dashboard JSON file not found: ${dashboardJsonPath}`);
    }

    let dashboardJson = JSON.parse(fs.readFileSync(dashboardJsonPath, 'utf8'));

    if (grafanaConfig.dashboardFields) {
      dashboardJson = replaceJsonFields(
        dashboardJson,
        grafanaConfig.dashboardFields,
      );
    }

    let amgRole: Role;

    // If AMG is in a different account, assume a cross-account IAM role
    if (grafanaConfig.amgAccountId !== currentAccountId) {
      if (!grafanaConfig.amgRoleArn) {
        throw new Error(
          `Cross-account AMG requires an existing IAM role ARN to assume. Provide 'amgRoleArn'.`,
        );
      }
      amgRole = Role.fromRoleArn(
        this,
        'AMGCrossAccountRole',
        grafanaConfig.amgRoleArn,
      ) as Role;
    } else {
      // Use a normal IAM role if AMG is in the same account
      amgRole = new Role(this, 'AMGDirectRole', {
        assumedBy: new ServicePrincipal('grafana.amazonaws.com'),
        description: 'IAM Role to allow CDK to create dashboards in AMG',
      });

      amgRole.addToPolicy(
        new PolicyStatement({
          actions: ['grafana:CreateDashboard', 'grafana:UpdateDashboard'],
          resources: [
            `arn:aws:grafana:${grafanaConfig.amgRegion}:${grafanaConfig.amgAccountId}:workspace/${grafanaConfig.amgWorkspaceId}`,
          ],
        }),
      );
    }

    // Custom Resource to push the dashboard JSON to AMG
    new AwsCustomResource(this, 'GrafanaDashboard', {
      onCreate: {
        service: 'Grafana',
        action: 'createDashboard',
        parameters: {
          workspaceId: grafanaConfig.amgWorkspaceId,
          dashboard: dashboardJson,
          overwrite: true,
        },
        physicalResourceId: PhysicalResourceId.of('GrafanaDashboard'),
      },
      role: amgRole,
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          actions: ['grafana:CreateDashboard', 'grafana:UpdateDashboard'],
          resources: [
            `arn:aws:grafana:${grafanaConfig.amgRegion}:${grafanaConfig.amgAccountId}:workspace/${grafanaConfig.amgWorkspaceId}`,
          ],
        }),
      ]),
    });
  }
}
