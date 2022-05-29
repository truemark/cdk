import {Construct} from "constructs";
import {Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {CdkArtifactBucket} from "./cdk-artifact-bucket";
import {ComputeType, IBuildImage, LinuxBuildImage} from "aws-cdk-lib/aws-codebuild";

export interface CdkCodePipelineProps {

  /**
   * By default, CDK will create KMS keys for cross account deployments. This
   * can be costly if you have a large number of pipelines. This property
   * allows a common key to be shared across pipelines.
   */
  readonly keyArn: string;

  /**
   * List of account IDs this pipeline will deploy into.
   */
  readonly accountIds: string[];

  /**
   * Arn of the CodeStar connection used to access the source code repository.
   */
  readonly connectionArn: string;

  /**
   * Name of the source code repository.
   */
  readonly repo: string;

  /**
   * Branch to use inside the source code repository.
   */
  readonly branch: string;

  /**
   * Name of the pipeline stack to synthesize.
   */
  readonly stackName: string;

  /**
   * Enable docker for the 'synth' step.
   *
   * @default true
   */
  readonly dockerEnabledForSynth?: boolean;

  /**
   * Enable docker for the self-mutate step.
   *
   * @default true
   */
  readonly dockerEnabledForSelfMutation?: boolean;

  /**
   * Type of compute to use for this build.
   *
   * @default ComputeType.SMALL
   */
  readonly computeType?: ComputeType;

  /**
   * The image to use for builds.
   *
   * @default LinuxBuildImage.AMAZON_LINUX_2_3
   */
  readonly buildImage?: IBuildImage;

}

/**
 * A useful abstraction to CodePipeline for creating CDK pipelines.
 */
export class CdkCodePipeline extends CodePipeline {

  constructor(scope: Construct, id: string, props: CdkCodePipelineProps) {

    const artifactBucket = new CdkArtifactBucket(scope, id + 'Artifacts', {
      keyArn: props.keyArn,
      accountIds: props.accountIds,
    });

    const underlyingPipeline = new Pipeline(scope, id + 'Pipeline', {
      artifactBucket
    });

    const input = CodePipelineSource.connection(props.repo, props.branch, {
      connectionArn: props.connectionArn
    });

    super(scope, id, {
      codePipeline: underlyingPipeline,
      dockerEnabledForSynth: props.dockerEnabledForSynth??true,
      dockerEnabledForSelfMutation: props.dockerEnabledForSelfMutation??true,
      synth: new ShellStep('Synth', {
        primaryOutputDirectory: 'cdk.out',
        input,
        commands: [
          'npm ci',
          'npm run build',
          'npm run test',
          `npm cdk synth ${props.stackName}`
        ],
        additionalInputs: {},
      }),
      synthCodeBuildDefaults: {
        buildEnvironment: {
          computeType: props.computeType??ComputeType.SMALL,
          buildImage: props.buildImage??LinuxBuildImage.AMAZON_LINUX_2_3
        }
      }
    });
  }
}
