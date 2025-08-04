import {Construct} from 'constructs';
import {FunctionAlarms, FunctionAlarmsOptions} from './function-alarms';
import {FunctionDeployment} from './function-deployment';
import {DeployedFunctionOptions} from './extended-function';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';
import {
  Architecture,
  LayerVersion,
  LoggingFormat,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import {Duration, Stack} from 'aws-cdk-lib';
import {Effect, PolicyStatement} from 'aws-cdk-lib/aws-iam';
import * as fs from 'fs';
import * as path from 'path';
import {
  NodejsFunction,
  NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import {OtelLambdaConfig} from './otel-types';
import {
  DEFAULT_APPLICATION_METRICS_NAMESPACE,
  initializeOtelConfigDataFromSSM,
} from './otel-collector-layer-utils';

/**
 * Properties for ExtendedNodejsFunction.
 */
export interface ExtendedNodejsFunctionProps
  extends NodejsFunctionProps,
    FunctionAlarmsOptions,
    DeployedFunctionOptions {
  /**
   * Whether to use ESM (ECMAScript Modules) for bundling. This will add ESM options to the bundling configuration and allows for functionality such as top level awaits.
   */
  readonly esm?: boolean;
  /**
   * The OpenTelemetry configuration for the function.
   */
  readonly otel?: OtelLambdaConfig;
}

export class ExtendedNodejsFunction extends NodejsFunction {
  readonly alarms: FunctionAlarms;
  readonly deployment?: FunctionDeployment;

  private static findDepsLockFile(
    entry: string | undefined,
  ): string | undefined {
    if (entry !== undefined) {
      const depsLockFilePath = path.join(
        path.dirname(entry),
        'package-lock.json',
      );
      if (fs.existsSync(depsLockFilePath)) {
        return depsLockFilePath;
      }
    }
    return undefined;
  }

  constructor(
    scope: Construct,
    id: string,
    props: ExtendedNodejsFunctionProps,
  ) {
    const stack = Stack.of(scope);
    const region = stack.region;
    const otelConfig = props.otel;
    const otelLayerVersionArn = otelConfig?.layerVersionArn;
    const isOtelEnabled = otelConfig?.enabled;
    let telemetryLayers;
    let prometheusWorkspaceId;

    if (isOtelEnabled) {
      const collectorInstanceLayer = LayerVersion.fromLayerVersionArn(
        scope,
        'OpenTelemetry',
        otelLayerVersionArn ??
          `arn:aws:lambda:${region}:901920570463:layer:aws-otel-nodejs-arm64-ver-1-30-2:1`,
      );
      const {otelSsmCollectorConfigLayer, workspaceId} =
        otelConfig?.ssmConfigContentParam
          ? initializeOtelConfigDataFromSSM(
              scope,
              'Otel',
              otelConfig.ssmConfigContentParam,
              otelConfig.serviceName,
              otelConfig?.applicationMetricsNamespace,
            )
          : {otelSsmCollectorConfigLayer: undefined, workspaceId: undefined};
      prometheusWorkspaceId = workspaceId;
      telemetryLayers = otelSsmCollectorConfigLayer
        ? [otelSsmCollectorConfigLayer, collectorInstanceLayer]
        : [collectorInstanceLayer];
    }

    super(scope, id, {
      logRetention: RetentionDays.THREE_DAYS, // change default from INFINITE
      architecture: Architecture.ARM_64, // change default from X86_64
      memorySize: 768, // change default from 128
      timeout: Duration.seconds(30), // change default from 3
      runtime: Runtime.NODEJS_22_X,
      depsLockFilePath: ExtendedNodejsFunction.findDepsLockFile(props.entry),
      ...props,
      loggingFormat: props.loggingFormat ?? LoggingFormat.JSON,
      ...(telemetryLayers && {layers: telemetryLayers}),
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        ...(isOtelEnabled && {
          AWS_LAMBDA_EXEC_WRAPPER: '/opt/otel-handler',
          OTEL_RESOURCE_ATTRIBUTES: `service.name=${otelConfig?.serviceName}-${otelConfig.environmentName}`,
          OTEL_METRICS_EXPORTER: 'otlp',
          OPENTELEMETRY_EXTENSION_LOG_LEVEL: otelConfig?.logLevel ?? 'info',
          OPENTELEMETRY_COLLECTOR_CONFIG_URI: otelConfig?.ssmConfigContentParam
            ? '/opt/collector.yaml'
            : '/var/task/collector.yaml',
          METRICS_SERVICE_NAME: `${otelConfig?.serviceName}-${otelConfig.environmentName}`,
        }),
        ...props.environment,
        ...(otelConfig?.environmentVariables ?? {}),
      },
      bundling: {
        sourceMap: props.bundling?.sourceMap ?? true,
        minify: true,
        ...(props.esm
          ? {
              format: OutputFormat.ESM,
              mainFields: ['module', 'main'],
              esbuildArgs: {
                '--conditions': 'module',
              },
            }
          : {}),
        ...props.bundling,
      },
    });

    if (isOtelEnabled) {
      const cloudWatchMetricsPolicy = new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
        conditions: {
          StringEquals: {
            'cloudwatch:namespace':
              otelConfig?.applicationMetricsNamespace ??
              DEFAULT_APPLICATION_METRICS_NAMESPACE,
          },
        },
      });
      this.addToRolePolicy(cloudWatchMetricsPolicy);
    }

    if (prometheusWorkspaceId) {
      this.addToRolePolicy(
        new PolicyStatement({
          resources: [
            `arn:aws:aps:${region}:${
              stack.account
            }:workspace/${prometheusWorkspaceId}`,
          ],
          actions: [
            'aps:RemoteWrite',
            'aps:GetSeries',
            'aps:GetLabels',
            'aps:GetMetricMetadata',
          ],
        }),
      );
    }
    this.alarms = new FunctionAlarms(this, 'Alarms', {
      function: this,
      logGroup: this.logGroup,
      ...props,
    });

    if (props.deploymentOptions?.createDeployment ?? true) {
      this.deployment = new FunctionDeployment(this, 'Deployment', {
        ...props.deploymentOptions,
        function: this,
      });
      if (props.deploymentOptions?.includeCriticalAlarms ?? true) {
        this.deployment.addAlarms(...this.alarms.getCriticalAlarms());
      }
      if (props.deploymentOptions?.includeWarningAlarms ?? false) {
        this.deployment.addAlarms(...this.alarms.getWarningAlarms());
      }
    }
  }
}
