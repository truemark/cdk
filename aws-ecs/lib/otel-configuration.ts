/**
 * Standard OpenTelemetry (OTEL) configuration for ECS services.
 */
export interface OtelConfig {
  /**
   * Optional: Enables or disables the OpenTelemetry (OTEL) container for this service.
   *
   * @default - false
   */
  readonly enabled?: boolean;

  /**
   * The container image to use for the OTEL (OpenTelemetry) container.
   * This allows the user to override the default image.
   *
   * @default - 'public.ecr.aws/aws-observability/aws-otel-collector:latest'
   */
  readonly collectorImage?: string;

  /**
   * SSM Parameter content path for OTEL configuration. When set, this value takes precedence over configPath.
   */
  readonly ssmConfigContentParam?: string;

  /**
   * Environment variables specific to the OTEL container.
   */
  readonly environmentVariables?: Record<string, string>;

  /**
   * Path to the OTEL configuration file or URL. It is only set when the ssmConfigContentParam is not set.
   * Default value is already set in the CDK itself pointing to the library's resources folder.
   */
  readonly configPath?: string;

  /**
   * AMP (Amazon Managed Prometheus) workspace ID for remote write.
   */
  readonly ampWorkSpaceId?: string;

  /**
   * Otel Collector side-car container name.
   *
   * @default otel-collector
   */
  readonly containerName?: string;

  /**
   * The CPU allocated to the otel container.
   *
   * @default - 256
   */
  readonly containerCpu?: number;

  /**
   * The memory allocated to the otel container.
   *
   * @default - 512
   */
  readonly containerMemoryLimitMiB?: number;
}
