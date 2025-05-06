/**
 * Grafana configuration properties
 */
export interface GrafanaDashboardConfig {
  /**
   * Optional: Enables or disables the creation for .
   */
  readonly enabled?: boolean;

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
