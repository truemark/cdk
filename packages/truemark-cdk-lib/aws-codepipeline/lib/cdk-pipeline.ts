import {Construct} from "constructs";
import {Pipeline} from "aws-cdk-lib/aws-codepipeline";
import {Key} from "aws-cdk-lib/aws-kms";
import {ArtifactBucket} from "./artifact-bucket";
import {
  AddStageOpts,
  CodePipeline,
  CodePipelineSource,
  IFileSetProducer,
  ShellStep,
  StageDeployment,
  Wave,
  WaveOptions
} from "aws-cdk-lib/pipelines";
import {BuildSpec, ComputeType, IBuildImage, LinuxBuildImage} from "aws-cdk-lib/aws-codebuild";
import {PipelineNotificationRule} from "./pipeline-notification-rule";
import {Arn, Stack, Stage} from "aws-cdk-lib";
import {Repository} from "aws-cdk-lib/aws-codecommit";
import {NodePackageManager} from "./enums";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {ISlackChannelConfiguration} from "aws-cdk-lib/aws-chatbot";
import {ITopic} from "aws-cdk-lib/aws-sns";

export enum NodeVersion {
  NODE_16 = "16",
  NODE_18 = "18"
}

/**
 * Properties for CdkPipeline
 */
export interface CdkPipelineProps {

  /**
   * By default, CDK will name the pipeline. Set this to override the name.
   */
  readonly pipelineName?: string;

  /**
   * By default, CDK will create KMS keys for cross account deployments. This
   * can be costly if you have a large number of pipelines. This property
   * allows a common key to be shared across pipelines.
   */
  readonly keyArn: string;

  /**
   * List of account IDs this pipeline will deploy into.
   */
  readonly accountIds?: string[];

  /**
   * Arn of the CodeStar connection used to access the source code repository. If not set, this
   * construct assumes the repository is in AWS CodeCommit.
   */
  readonly connectionArn?: string;

  /**
   * Source code repository.
   */
  readonly repository: string;

  /**
   * Branch to use inside the source code repository.
   */
  readonly branch: string;

  /**
   * Enable or disable self-mutation. Useful for cdk pipeline development.
   *
   * @default true
   */
  readonly selfMutation?: boolean;

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
   * The image to use for builds. Default is LinuxBuildImage.AMAZON_LINUX_2_5.
   */
  readonly buildImage?: IBuildImage;

  /**
   * The ARN of the Slack channel configuration to use for notifications. Mutually exclusive with slackChannelConfiguration.
   */
  readonly slackChannelConfigurationArn?: string;

  /**
   * The Slack channel configuration to use for notifications. Mutually exclusive with slackChannelConfigurationArn.
   */
  readonly slackChannelConfiguration?: ISlackChannelConfiguration;

  /**
   * The SNS topic to use for notifications. Mutually exclusive with notificationTopic.
   */
  readonly notificationTopicArn?: string;

  /**
   * The SNS topic to use for notifications. Mutually exclusive with notificationTopicArn.
   */
  readonly notificationTopic?: ITopic;

  /**
   * The list of notification events to receive. Default is PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS.
   * @default PipelineNotificationRule.PIPELINE_EXECUTION_EVENTS
   * @see https://docs.aws.amazon.com/dtconsole/latest/userguide/concepts.html#events-ref-pipeline
   */
  readonly notificationEvents?: string[];

  /**
   * Additional FileSets to put in other directories
   */
  readonly additionalInputs?: Record<string, IFileSetProducer>;

  /**
   * Overrides default commands.
   */
  readonly commands?: string[];

  /**
   * Public assets in multiple CodeBuild projects. Default is false.
   */
  readonly publishAssetsInParallel?: boolean;

  /**
   * Package manager to use when executing CDK.
   *
   * @default NodePackageManager.PNPM
   */
  readonly packageManager?: NodePackageManager;

  /**
   * The directory the CDK project is located in the repo.
   *
   * @default - "."
   */
  readonly cdkDirectory?: string;

  /**
   * Policy statements to add to the role used by synth.
   */
  readonly rolePolicy?: PolicyStatement[];

  /**
   * Grants read access to the provided AWS CodeArtifact domains.
   */
  readonly codeArtifactDomains?: string[];

  /**
   * Grants read access to the provided AWS CodeArtifact repositories.
   */
  readonly codeArtifactRepositories?: string[];

  /**
   * The version of Node to use in the pipeline. Default is NODE_18
   */
  readonly nodeVersion?: NodeVersion | string;
}

/**
 * An abstraction to ease CDK pipeline creation and configuration.
 */
export class CdkPipeline extends Construct {

  readonly pipeline: CodePipeline;
  readonly pipelineNotificationRule?: PipelineNotificationRule;

  constructor(scope: Construct, id: string, props: CdkPipelineProps) {
    super(scope, id);

    const encryptionKey = Key.fromKeyArn(this, 'EncryptionKey', props.keyArn);

    const artifactBucket = new ArtifactBucket(this, 'ArtifactBucket', {
      encryptionKey,
      accountIds: props.accountIds
    });

    const underlyingPipeline = new Pipeline(this, 'Pipeline', {
      artifactBucket,
      pipelineName: props.pipelineName
    });

    let input: CodePipelineSource;
    if (props.connectionArn !== undefined) {
      input = CodePipelineSource.connection(props.repository, props.branch, {
        connectionArn: props.connectionArn
      });
    } else {
      const repository = props.repository.startsWith("arn:")
        ? Repository.fromRepositoryArn(this, "Repository", props.repository)
        : Repository.fromRepositoryName(this, "Repository", props.repository)
      input = CodePipelineSource.codeCommit(repository, props.branch);
    }

    const stackName = Stack.of(this).stackName;
    const cdkDirectory = props.cdkDirectory ?? ".";

    let commands: string[] | undefined = props.commands;
    if (commands === undefined && props.packageManager === NodePackageManager.PNPM) {
      commands = [
        `cd ${cdkDirectory ?? "."}`,
        'npm -g install pnpm',
        'pnpm install --frozen-lockfile --prefer-offline',
        'pnpm run build',
        'pnpm run test',
        `pnpx cdk synth ${stackName}`
      ]
    } else if (commands === undefined) {
      commands = [
        `cd ${cdkDirectory ?? "."}`,
        'npm config set fund false',
        'npm ci --prefer-offline',
        'npm run build',
        'npm run test',
        `npx cdk synth ${stackName}`
      ]
    }

    const stack = Stack.of(this);

    const codeArtifactDomains = props.codeArtifactDomains?.map(domain => {
      return domain.startsWith("arn:aws") ? domain : Arn.format({
        service: "codeartifact",
        resource: "domain",
        resourceName: domain
      }, stack);
    });

    const codeArtifactRepositories = props.codeArtifactRepositories?.map(repository => {
      return repository.startsWith("arn:aws") ? repository : Arn.format({
        service: "codeartifact",
        resource: "repository",
        resourceName: repository,
      }, stack);
    });

    const rolePolicy = props.rolePolicy ?? [];
    if (codeArtifactDomains) {
      rolePolicy.push(new PolicyStatement({
        resources: codeArtifactDomains,
        actions: ["codeartifact:GetAuthorizationToken"],
        effect: Effect.ALLOW
      }));
      rolePolicy.push(new PolicyStatement({
        resources: ["*"],
        actions: ["sts:GetServiceBearerToken"],
        effect: Effect.ALLOW
      }));
    }
    if (codeArtifactRepositories) {
      rolePolicy.push(new PolicyStatement({
        resources: codeArtifactRepositories,
        actions: [
          "codeartifact:DescribePackageVersion",
          "codeartifact:DescribeRepository",
          "codeartifact:GetPackageVersionReadme",
          "codeartifact:GetRepositoryEndpoint",
          "codeartifact:ListPackages",
          "codeartifact:ListPackageVersions",
          "codeartifact:ListPackageVersionAssets",
          "codeartifact:ListPackageVersionDependencies",
          "codeartifact:ReadFromRepository"
        ],
        effect: Effect.ALLOW
      }));
    }

    this.pipeline = new CodePipeline(this, 'CodePipeline', {
      codePipeline: underlyingPipeline,
      selfMutation: props.selfMutation ?? true,
      dockerEnabledForSynth: props.dockerEnabledForSynth ?? true,
      dockerEnabledForSelfMutation: props.dockerEnabledForSelfMutation ?? true,
      publishAssetsInParallel: props.publishAssetsInParallel ?? false,
      synth: new ShellStep('Synth', {
        primaryOutputDirectory: `${cdkDirectory}/cdk.out`,
        input,
        commands,
        additionalInputs: props.additionalInputs??{}
      }),
      synthCodeBuildDefaults: {
        // cache: Cache.local(), // TODO Not supported on ARM
        partialBuildSpec: BuildSpec.fromObject({
          // TODO Need to look into this further
          cache: {
            paths: "/tmp/npm-cache"
          },
          phases: {
            install: {
              commands: [
                `n ${props.nodeVersion ?? NodeVersion.NODE_18}`, // Install node
                "npm i --location=global --no-fund esbuild" // Install esbuild locally
              ]
            }
          }
        }),
        buildEnvironment: {
          computeType: props.computeType ?? ComputeType.SMALL,
          buildImage: props.buildImage ?? LinuxBuildImage.AMAZON_LINUX_2_5
        },
        rolePolicy
      },
      assetPublishingCodeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.AMAZON_LINUX_2_5
        }
      },
      selfMutationCodeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.AMAZON_LINUX_2_5
        }
      },
      codeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.AMAZON_LINUX_2_5
        }
      }
    });

    // Handle pipeline notifications
    if (props.slackChannelConfiguration && props.slackChannelConfigurationArn) {
      throw new Error("Only one of slackChannelConfiguration and slackChannelConfigurationArn can be specified");
    }
    if (props.notificationTopic && props.notificationTopicArn) {
      throw new Error("Only one of notificationTopic and notificationTopicArn can be specified");
    }
    if (props.slackChannelConfiguration || props.slackChannelConfiguration
        || props.notificationTopicArn || props.notificationTopic) {
      this.pipelineNotificationRule = new PipelineNotificationRule(this, 'Notification', {
        events: props.notificationEvents,
        source: underlyingPipeline,
      });
      if (props.slackChannelConfiguration) {
        this.pipelineNotificationRule.addSlackChannel(props.slackChannelConfiguration);
      } else if (props.slackChannelConfigurationArn) {
        this.pipelineNotificationRule.addSlackChannelArn('SlackChannel', props.slackChannelConfigurationArn);
      }
      if (props.notificationTopic) {
        this.pipelineNotificationRule.addTopic(props.notificationTopic);
      } else if (props.notificationTopicArn) {
        this.pipelineNotificationRule.addTopicArn('NotificationTopic', props.notificationTopicArn)
      }
    }
  }

  addStage(stage: Stage, options?: AddStageOpts): StageDeployment {
    return this.pipeline.addStage(stage, options);
  }

  addWave(id: string, options?: WaveOptions): Wave {
    return this.pipeline.addWave(id, options);
  }
}
