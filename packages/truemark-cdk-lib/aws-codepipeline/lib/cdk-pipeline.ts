import {Construct} from "constructs";
import {Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {Key} from "aws-cdk-lib/aws-kms";
import {ArtifactBucket} from "./artifact-bucket";
import {
  AddStageOpts,
  CodePipeline,
  CodePipelineSource,
  ShellStep,
  StageDeployment,
  Wave,
  WaveOptions
} from "aws-cdk-lib/pipelines";
import {ComputeType, IBuildImage, LinuxBuildImage} from "aws-cdk-lib/aws-codebuild";
import {PipelineNotificationRule} from "./pipeline-notification-rule";
import {Stack, Stage} from "aws-cdk-lib";

export interface CdkPipelineProps {

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

  /**
   * The Slack channel configuration to use for notifications.
   */
  readonly slackChannelConfigurationArn?: string;

  /**
   * The list of notification events to receive. By default this is all notifications.
   *
   * @see https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline
   */
  readonly notificationEvents?: string[];
}

export class CdkPipeline extends Construct {

  readonly pipeline: CodePipeline;
  readonly pipelineNotificationRule: PipelineNotificationRule;

  constructor(scope: Construct, id: string, props: CdkPipelineProps) {
    super(scope, id);

    const encryptionKey = Key.fromKeyArn(this, 'EncryptionKey', props.keyArn);

    const artifactBucket = new ArtifactBucket(this, 'ArtifactBucket', {
      encryptionKey,
      accountIds: props.accountIds
    });

    const underlyingPipeline = new Pipeline(this, 'Pipeline', {
      artifactBucket
    });

    const input = CodePipelineSource.connection(props.repo, props.branch, {
      connectionArn: props.connectionArn
    });

    const stackName = Stack.of(this).stackName;

    this.pipeline = new CodePipeline(this, 'CodePipeline', {
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
          `npm cdk synth ${stackName}`
        ],
        additionalInputs: {}
      }),
      synthCodeBuildDefaults: {
        buildEnvironment: {
          computeType: props.computeType??ComputeType.SMALL,
          buildImage: props.buildImage??LinuxBuildImage.AMAZON_LINUX_2_3
        }
      }
    });
    if (props.slackChannelConfigurationArn) {
      this.pipelineNotificationRule = new PipelineNotificationRule(this, 'Notification', {
        source: underlyingPipeline,
        slackChannelConfigurationArn: props.slackChannelConfigurationArn
      });
    }
  }

  addStage(stage: Stage, options?: AddStageOpts): StageDeployment {
    return this.pipeline.addStage(stage, options);
  }

  addWave(id: string, options?: WaveOptions): Wave {
    return this.pipeline.addWave(id, options);
  }
}
