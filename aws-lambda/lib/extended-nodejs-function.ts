import {Construct} from 'constructs';
import {FunctionAlarms, FunctionAlarmsOptions} from './function-alarms';
import {FunctionDeployment} from './function-deployment';
import {DeployedFunctionOptions} from './extended-function';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';
import {Architecture, LoggingFormat, Runtime} from 'aws-cdk-lib/aws-lambda';
import {Duration} from 'aws-cdk-lib';
import * as fs from 'fs';
import * as path from 'path';
import {
  NodejsFunction,
  NodejsFunctionProps,
  OutputFormat,
} from 'aws-cdk-lib/aws-lambda-nodejs';

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
    super(scope, id, {
      logRetention: RetentionDays.THREE_DAYS, // change default from INFINITE
      architecture: Architecture.ARM_64, // change default from X86_64
      memorySize: 768, // change default from 128
      timeout: Duration.seconds(30), // change default from 3
      runtime: Runtime.NODEJS_22_X,
      depsLockFilePath: ExtendedNodejsFunction.findDepsLockFile(props.entry),
      ...props,
      loggingFormat: props.loggingFormat ?? LoggingFormat.JSON,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        ...props.environment,
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
