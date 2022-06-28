import { BundlingOptions, BundlingOutput } from 'aws-cdk-lib';
import { Code, FunctionOptions, Runtime } from 'aws-cdk-lib/aws-lambda';
import { DockerImage, ILocalBundling } from 'aws-cdk-lib/core/lib/bundling';
import { Construct } from 'constructs';
import { ShellHelper } from '../../helpers';
import { DeployedFunctionOptions, Function } from './function';
import { FunctionAlarmsOptions } from './function-alarms';

/**
 * Options for BundledFunction.
 */
export interface BundledFunctionOptions {

  /**
   * Turns off local bundling.
   *
   * @default false
   */
  readonly disableLocalBundling?: boolean;

  /**
   * Turns off docker bundling.
   *
   * @default false
   */
  readonly disableDockerBundling?: boolean;

  /**
   * Overrides the default bundling script.
   */
  readonly bundlingScript?: string;

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
   * Path to the source of the function.
   *
   * Example: path.join(__dirname, '..', 'mylambda')
   */
  readonly entry: string;
}

/**
 * Properties for BundledFunction
 */
export interface BundledFunctionProps extends FunctionOptions, FunctionAlarmsOptions, DeployedFunctionOptions, BundledFunctionOptions {

  /**
   * Callback function to check if local bundling is supported.
   */
  // isLocalBundlingSupported() : boolean;
  readonly isLocalBundlingSupported: boolean;

  /**
   * The default bundling script to use.
   */
  readonly defaultBundlingScript: string;

  /**
   * The default bundling image to use.
   */
  readonly defaultBundlingImage: DockerImage;

  /**
   * The runtime environment for the Lambda function.
   */
  readonly runtime: Runtime;

  /**
   * The name of the method to execute the Lambda function.
   */
  readonly handler: string;
}

export class BundledFunction extends Function {

  constructor(scope: Construct, id: string, props: BundledFunctionProps) {

    const local: ILocalBundling | undefined = props.disableLocalBundling ? undefined : {
      tryBundle(outputDir: string, options: BundlingOptions): boolean {
        try {
          if (!props.isLocalBundlingSupported) {
            return false;
          }
        } catch {
          return false;
        }
        return ShellHelper.executeBash({
          script: props.bundlingScript??props.defaultBundlingScript,
          workingDirectory: props.entry,
          environment: {
            ...options.environment,
            CDK_BUNDLING_OUTPUT_DIR: outputDir,
          },
        });
      },
    };

    const command = props.disableDockerBundling ? undefined : ['bash', '-c', props.bundlingScript??props.defaultBundlingScript];

    super(scope, id, {
      ...props,
      code: Code.fromAsset(props.entry, {
        bundling: {
          image: props.defaultBundlingImage,
          local,
          command,
          environment: {
            CDK_BUNDLING_OUTPUT_DIR: '/asset-output/',
            ...props.bundlingEnvironment,
          },
          outputType: BundlingOutput.NOT_ARCHIVED,
          ...props.bundling,
        },
      }),
    });
  }
}
