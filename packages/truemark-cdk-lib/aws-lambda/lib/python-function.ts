import {Architecture, Code, Function, FunctionOptions, Runtime, RuntimeFamily, Tracing} from 'aws-cdk-lib/aws-lambda';
import {Construct} from "constructs";
import {BundlingOptions, BundlingOutput, Duration} from "aws-cdk-lib";
import {RetentionDays} from "aws-cdk-lib/aws-logs";
import {FunctionAlarmProps, ObservedFunction} from "./observed-function";
import {ILocalBundling} from "aws-cdk-lib/core/lib/bundling";
import {spawnSync} from "child_process";

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

  /**
   * Creates a new Lambda Function
   */
  constructor(scope: Construct, id: string, props: PythonFunctionProps) {

    const runtime = props.runtime??Runtime.PYTHON_3_9
    if (runtime.family !== RuntimeFamily.PYTHON) {
      throw new Error('Runtime must be a Python runtime');
    }

    const handler = (props.index??'index.py').replace('.py', '') + '.' + (props.handler??'handler');

    const local: ILocalBundling = {
      tryBundle(outputDir: string, options: BundlingOptions): boolean {
        try {
          spawnSync('pip -V')
        } catch {
          return false;
        }
        spawnSync('bash', ['-c', [
          `cp -a ${props.entry}/* ${outputDir}`
        ].join('&&')]);
        // spawnSync('ls -l && pwd');
        // spawnSync(`cp -ra * ${outputDir}`);
        return true;
      }
    };

    const command = [
      'bash', '-c', [
        'pip install --target /asset-output/ -r requirements.txt',
        'cp -ra * /asset-output/'
      ].join('&&')
    ];

    const bundling: BundlingOptions = {
      image: props.runtime?.bundlingImage??Runtime.PYTHON_3_9.bundlingImage,
      local,
      command,
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
