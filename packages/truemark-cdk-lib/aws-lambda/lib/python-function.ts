import {Architecture, Code, FunctionOptions, Runtime, RuntimeFamily, Tracing} from 'aws-cdk-lib/aws-lambda';
import {Construct} from "constructs";
import {BundlingOptions, BundlingOutput, Duration} from "aws-cdk-lib";
import {RetentionDays} from "aws-cdk-lib/aws-logs";
import {FunctionAlarmProps, ObservedFunction} from '../../aws-lambda';
import {ILocalBundling} from "aws-cdk-lib/core/lib/bundling";
import {ShellHelper} from "../../helpers";

/**
 * Properties for PythonFunction.
 */
export interface PythonFunctionProps extends FunctionOptions, FunctionAlarmProps {

  /**
   * Path to the source of the function.
   *
   * Example: path.join(__dirname, '..', 'mylambda')
   */
  readonly entry: string;

  /**
   * The path (relative to entry) to the index file containing the exported handler.
   *
   * @default 'index.py'
   */
  readonly index?: string;

  /**
   * The name of the exported handler in the index file.
   *
   * @default 'handler'
   */
  readonly handler?: string;


  /**
   * Turns off local bundling.
   *
   * @default false
   */
  readonly disableLocalBundling?: boolean

  /**
   * Turns off docker bundling.
   *
   * @default false
   */
  readonly disableDockerBundling?: boolean

  /**
   * Overrides the default bundling script.
   *
   * @default PythonFunction.DEFAULT_BUNDLE_SCRIPT
   */
  readonly bundlingScript?: string

  /**
   * Additional environment variable to be passed to the bundling script.
   */
  readonly bundlingEnvironment?: {
    [key: string]: string;
  };

  /**
   * Bundling options to use for this function. Use this to specify custom bundling options like
   * the bundling Docker image, asset hash type, custom hash, architecture, etc.
   *
   * @default
   */
  readonly bundling?: BundlingOptions;

  /**
   * The runtime environment. Only runtimes of the Python family are supported.
   *
   * @default Runtime.PYTHON_3_9
   */
  readonly runtime?: Runtime;

}

/**
 * Python based Lambda Function
 */
export class PythonFunction extends ObservedFunction {

  static readonly DEFAULT_BUNDLE_SCRIPT = `
  #!/usr/bin/env bash
  set -euo pipefail
  if [ -f requirements.txt ]; then
    pip install --target "\${CDK_BUNDLING_OUTPUT_DIR}" -r requirements.txt
  fi
  echo "MOOO: \${PIP_PROGRESS_BAR}"
  cp -a * "\${CDK_BUNDLING_OUTPUT_DIR}"
  `

  /**
   * Creates a new Lambda Function
   */
  constructor(scope: Construct, id: string, props: PythonFunctionProps) {

    const runtime = props.runtime??Runtime.PYTHON_3_9
    if (runtime.family !== RuntimeFamily.PYTHON) {
      throw new Error('Runtime must be a Python runtime');
    }

    const handler = (props.index??'index.py').replace('.py', '') + '.' + (props.handler??'handler');

    const local: ILocalBundling | undefined = props.disableLocalBundling ? undefined : {
      tryBundle(outputDir: string, options: BundlingOptions): boolean {
        try {
          if (!ShellHelper.pythonVersion()) {
            return false;
          }
        } catch {
          return false;
        }
        return ShellHelper.executeBash({
          script: props.bundlingScript??PythonFunction.DEFAULT_BUNDLE_SCRIPT,
          workingDirectory: props.entry,
          environment: {
            ...options.environment,
            CDK_BUNDLING_OUTPUT_DIR: outputDir,
          }
        });
      }
    };

    const command = props.disableDockerBundling ? undefined : ['bash', '-c', props.bundlingScript??PythonFunction.DEFAULT_BUNDLE_SCRIPT];

    const bundling: BundlingOptions = {
      image: props.runtime?.bundlingImage??Runtime.PYTHON_3_9.bundlingImage,
      local,
      command,
      environment: {
        CDK_BUNDLING_OUTPUT_DIR: '/asset-output/',
        PIP_PROGRESS_BAR: 'off',
        PIP_DISABLE_PIP_VERSION_CHECK: '1',
        ...props.bundlingEnvironment
      },
      outputType: BundlingOutput.NOT_ARCHIVED,
      ...props.bundling
    }

    super(scope, id, {
      tracing: Tracing.PASS_THROUGH,
      logRetention: RetentionDays.THREE_DAYS,
      architecture: Architecture.ARM_64,
      memorySize: 768,
      timeout: Duration.seconds(30),
      ...props,
      runtime,
      handler,
      code: Code.fromAsset(props.entry, {bundling})
    });
  }
}
