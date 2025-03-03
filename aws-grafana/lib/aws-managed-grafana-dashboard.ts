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

/**
 * Properties for AWS Managed Grafana Dashboard.
 */
export interface AwsManagedGrafanaDashboardProps
  extends ExtendedConstructProps {
  /**
   * AWS Managed Grafana workspace id.
   */
  readonly amgWorkspaceId: string;

  /**
   * AWS Managed Grafana account id.
   */
  readonly amgAccountId: string;

  /**
   * AWS Managed Grafana region.
   */
  readonly amgRegion: string;

  /**
   * AWS Managed Grafana role ARN for cross-account access to Grafana.
   */
  readonly amgRoleArn?: string;

  /**
   * Grafana template file path. If not provided, a default JSON template will be used.
   */
  readonly dashboardFilePath?: string;

  /**
   * Dashboard fields to replace in the JSON template.
   */
  readonly dashboardFields?: {[key: string]: string};
}

export class AwsManagedGrafanaDashboard extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: AwsManagedGrafanaDashboardProps,
  ) {
    super(scope, id);

    const currentAccountId = Stack.of(this).account;

    const dashboardJsonPath = props.dashboardFilePath
      ? path.resolve(props.dashboardFilePath)
      : path.join(
          __dirname,
          '../../resources/ecs-generic-grafana-dashboard-template.json',
        );

    if (!fs.existsSync(dashboardJsonPath)) {
      throw new Error(`Dashboard JSON file not found: ${dashboardJsonPath}`);
    }

    let dashboardJson = JSON.parse(fs.readFileSync(dashboardJsonPath, 'utf8'));

    if (props.dashboardFields) {
      dashboardJson = replaceJsonFields(dashboardJson, props.dashboardFields);
    }

    let amgRole: Role;

    // If AMG is in a different account, assume a cross-account IAM role
    if (props.amgAccountId !== currentAccountId) {
      if (!props.amgRoleArn) {
        throw new Error(
          `Cross-account AMG requires an existing IAM role ARN to assume. Provide 'amgRoleArn'.`,
        );
      }
      amgRole = Role.fromRoleArn(
        this,
        'AMGCrossAccountRole',
        props.amgRoleArn,
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
            `arn:aws:grafana:${props.amgRegion}:${props.amgAccountId}:workspace/${props.amgWorkspaceId}`,
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
          workspaceId: props.amgWorkspaceId,
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
            `arn:aws:grafana:${props.amgRegion}:${props.amgAccountId}:workspace/${props.amgWorkspaceId}`,
          ],
        }),
      ]),
    });
  }
}
