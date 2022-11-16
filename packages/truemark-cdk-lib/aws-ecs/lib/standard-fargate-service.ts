import {Construct} from "constructs";
import {
  CapacityProviderStrategy,
  ContainerImage,
  CpuArchitecture,
  DeploymentControllerType,
  FargatePlatformVersion,
  FargateService,
  FargateTaskDefinition,
  ICluster,
  LogDriver,
  OperatingSystemFamily,
  Protocol, ScalableTaskCount,
  Secret
} from "aws-cdk-lib/aws-ecs";
import {LogConfiguration} from "./log-configuration";
import {SubnetSelection, SubnetType} from "aws-cdk-lib/aws-ec2";
import {LogGroup, RetentionDays} from "aws-cdk-lib/aws-logs";
import {Duration, RemovalPolicy} from "aws-cdk-lib";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";
import {BasicStepScalingPolicyProps} from "aws-cdk-lib/aws-autoscaling";
import {IMetric} from "aws-cdk-lib/aws-cloudwatch";
import {ScalingSchedule} from "aws-cdk-lib/aws-applicationautoscaling";
import {StandardTags} from "../../aws-tags";
import {CDK_NPMJS_URL, CDK_VENDOR} from "../../helpers";

/**
 * Properties for StandardFargateService.
 */
export interface StandardFargateServiceProps {

  /**
   * The CPU allocated to the task.
   *
   * @default - 2048
   */
  readonly cpu?: number;

  /**
   * The memory allocated to the task.
   *
   * @default - 4096
   */
  readonly memoryLimitMiB?: number;

  /**
   * Optional ephemeral storage allocated to the task.
   *
   * @default - 20
   */
  readonly ephemeralStorageGiB?: number;

  /**
   * CPU architecture to use for the task
   *
   * @default - CpuArchitecture.ARM64
   */
  readonly cpuArchitecture?: CpuArchitecture;

  /**
   * Log configuration for this service.
   */
  readonly logConfiguration?: LogConfiguration;

  /**
   * Enables X-Ray for this service.
   *
   * @default - true
   */
  readonly enableXray?: boolean

  /**
   * Enables the ability to push custom metrics to CloudWatch from the service.
   *
   * @default - true
   */
  readonly enablePublishMetrics?: boolean

  /**
   * The cluster to place services in.
   */
  readonly cluster: ICluster;

  /**
   * The container port.
   *
   * @default 8080
   */
  readonly port?: number;

  /**
   * Whether the port is TCP or UDP.
   *
   * @default Protocol.TCP
   */
  readonly protocol?: Protocol;

  /**
   * Container image to deploy in this service.
   */
  readonly image: ContainerImage;

  /**
   * Subnets to put the service in. If this is left empty, subnet type PRIVATE_WITH_EGRESS is used.
   */
  readonly vpcSubnets?: SubnetSelection;

  /**
   * Environment variables to pass to this service.
   */
  readonly environment?: Record<string, string>;

  /**
   * A key/value map of labels to add to the container.
   */
  readonly dockerLabels?: Record<string, string>;

  /**
   * The secret environment variables to pass to the container.
   */
  readonly secrets?: Record<string, Secret>;

  /**
   * The maximum number of tasks, specified as a percentage of the Amazon ECS
   * service's DesiredCount value, that can run in a service during a
   * deployment.
   *
   * @default - 200
   */
  readonly maxHealthyPercent?: number;

  /**
   * The minimum number of tasks, specified as a percentage of
   * the Amazon ECS service's DesiredCount value, that must
   * continue to run and remain healthy during a deployment.
   *
   * @default - 100
   */
  readonly minHealthyPercent?: number;

  /**
   * Enable rollback on deployment failure
   *
   * @default - true
   */
  readonly enableRollback?: boolean;

  /**
   * Specifies which deployment controller to use for the service
   *
   * @default - DeploymentControllerType.ECS
   */
  readonly deploymentControllerType?: DeploymentControllerType;

  /**
   * Whether to enable the ability to execute into a container
   *
   * @default - true
   */
  readonly enableExecuteCommand?: boolean;

  /**
   * The platform version on which to run your service.
   *
   * @default - FargatePlatformVersion.LATEST
   */
  readonly platformVersion?: FargatePlatformVersion;

  /**
   * Whether to assign a public IP address to the containers.
   *
   * @default - false
   */
  readonly assignPublicIp?: boolean;

  /**
   * Specifies whether to enable Amazon ECS managed tags for the tasks within the service
   *
   * @default - true
   */
  readonly enableECSManagedTags?: boolean;

  /**
   * The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started.
   *
   * @default - Duration.seconds(30)
   */
  readonly healthCheckGracePeriod?: Duration;

  /**
   * Desired count for this service. If not set, defaults to minCapacity.
   *
   * @default - minCapacity
   */
  readonly desiredCount?: number;

  /**
   * Minimum capacity to scale to.
   *
   * @default - 1
   */
  readonly minCapacity?: number;

  /**
   * Maximum capacity to scale to.
   *
   * @default - 2
   */
  readonly maxCapacity?: number;

  /**
   * Period after a scale in activity completes before another scale in activity can start.
   *
   * @default - Duration.seconds(10)
   */
  readonly scaleInCooldown?: Duration;

  /**
   * Period after a scale out activity completes before another scale out activity can start.
   *
   * @default - Duration.seconds(60)
   */
  readonly scaleOutCooldown?: Duration;

  /**
   * The target value for CPU utilization across all tasks in the service.
   * Set this to 0 to disable CPU scaling.
   *
   * @default - 60
   */
  readonly scaleCpuTargetUtilizationPercent?: number;

  /**
   * The target value for memory utilization across all tasks in the service.
   * Disabled by default.
   */
  readonly scaleMemoryTargetUtilizationPercent?: number;

  /**
   * Capacity weight for the FARGATE capacity provider. Default is to not use capacity providers.
   */
  readonly capacityWeight?: number;

  /**
   * The minimum number of tasks to run on the FARGATE capacity provider. Default is to not use capacity providers.
   */
  readonly capacityBase?: number;

  /**
   * Capacity weight for the FARGATE_SPOT capacity provider. Default is to not use capacity providers.
   */
  readonly spotCapacityWeight?: number;

  /**
   * The minimum number of tasks to run on the FARGATE_SPOT capacity provider. Default is to not use capacity providers.
   */
  readonly spotCapacityBase?: number;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Standard class for creating a FargateService. It's recommended to use the StandardApplicationFargateService or
 * StandardNetworkFargateService instead of this class.
 */
export class StandardFargateService extends Construct {

  readonly taskDefinition: FargateTaskDefinition;
  readonly logGroup?: LogGroup;
  readonly service: FargateService;
  readonly port: number;
  readonly scaling: ScalableTaskCount;
  readonly scaleInCooldown: Duration;
  readonly scaleOutCooldown: Duration;

  protected resolveLogGroup(scope: Construct, props: StandardFargateServiceProps): LogGroup | undefined {
    if (props.logConfiguration?.enabled ?? true) {
      return new LogGroup(scope, "LogGroup", {
        retention: props.logConfiguration?.retention ?? RetentionDays.FIVE_DAYS,
        logGroupName: props.logConfiguration?.logGroupName,
        encryptionKey: props.logConfiguration?.encryptionKey,
        removalPolicy: props.logConfiguration?.removalPolicy ?? RemovalPolicy.DESTROY
      });
    }
    return undefined;
  }

  protected resolveLogDriver(scope: Construct, props: StandardFargateServiceProps, logGroup: LogGroup | undefined):
    LogDriver | undefined {
    if (props.logConfiguration?.enabled ?? true) {
      return LogDriver.awsLogs({
        streamPrefix: scope.node.id,
        logGroup
      });
    }
    return undefined;
  }

  protected resolveVpcSubnets(scope: Construct, props: StandardFargateServiceProps): SubnetSelection {
    if (props.vpcSubnets === undefined) {
      return {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS
      }
    }
    return props.vpcSubnets
  }

  protected resolvedCapacityProviderStrategies(props: StandardFargateServiceProps):
    CapacityProviderStrategy[] | undefined {
    let strategies: CapacityProviderStrategy[] = [];
    if (props.capacityWeight !== undefined || props.capacityBase !== undefined) {
      strategies.push({
        capacityProvider: "FARGATE",
        base: props.capacityBase,
        weight: props.capacityWeight
      });
    }
    if (props.spotCapacityWeight !== undefined || props.spotCapacityBase !== undefined) {
      strategies.push({
        capacityProvider: "FARGATE_SPOT",
        base: props.spotCapacityBase,
        weight: props.spotCapacityWeight
      });
    }
    return strategies.length > 0 ? strategies : undefined;
  }

  constructor(scope: Construct, id: string, props: StandardFargateServiceProps) {
    super(scope, id);

    const taskDefinition = new FargateTaskDefinition(this, "Resource", {
      cpu: props.cpu ?? 2048,
      memoryLimitMiB: props.memoryLimitMiB ?? 4096,
      ephemeralStorageGiB: props.ephemeralStorageGiB,
      runtimePlatform: {
        operatingSystemFamily: OperatingSystemFamily.LINUX,
        cpuArchitecture: props.cpuArchitecture ?? CpuArchitecture.ARM64
      }
    });

    if (props.enableXray ?? true) {
      taskDefinition.addToTaskRolePolicy(
        new PolicyStatement({
          resources: ['*'],
          actions: ['cloudwatch:PutMetricData'],
        })
      );
    }

    const logGroup = this.resolveLogGroup(this, props);
    const logging = this.resolveLogDriver(this, props, logGroup);
    const port = props.port ?? 8080;
    const protocol = props.protocol ?? Protocol.TCP;

    taskDefinition.addContainer("Container", {
      image: props.image,
      portMappings: [
        {
          containerPort: port,
          hostPort: port,
          protocol
        }
      ],
      logging,
      environment: props.environment,
      dockerLabels: props.dockerLabels,
      secrets: props.secrets
    });

    // TODO Otel Collector

    const vpcSubnets = this.resolveVpcSubnets(this, props);
    const desiredCount = props.desiredCount ?? props.minCapacity ?? 1;
    const capacityProviderStrategies = this.resolvedCapacityProviderStrategies(props);

    const service = new FargateService(this, "Default", {
      cluster: props.cluster,
      taskDefinition,
      maxHealthyPercent: props.maxHealthyPercent ?? 200,
      minHealthyPercent: props.minHealthyPercent ?? 100,
      desiredCount,
      circuitBreaker: {
        rollback: props.enableRollback ?? true
      },
      deploymentController: {
        type: props.deploymentControllerType ?? DeploymentControllerType.ECS
      },
      vpcSubnets,
      platformVersion: props.platformVersion ?? FargatePlatformVersion.LATEST,
      enableExecuteCommand: props.enableExecuteCommand ?? true,
      assignPublicIp: props.assignPublicIp ?? false,
      enableECSManagedTags: props.enableECSManagedTags ?? true,
      healthCheckGracePeriod: props.healthCheckGracePeriod ?? Duration.seconds(30),
      capacityProviderStrategies
    });

    const scaling = service.autoScaleTaskCount({
      minCapacity: props.minCapacity ?? 1,
      maxCapacity: props.maxCapacity ?? 2
    });
    const scaleInCooldown = props.scaleInCooldown ?? Duration.seconds(10);
    const scaleOutCooldown = props.scaleOutCooldown ?? Duration.seconds(60);

    if (props.scaleCpuTargetUtilizationPercent !== 0) {
      scaling.scaleOnCpuUtilization("CpuScaling", {
        scaleInCooldown,
        scaleOutCooldown,
        targetUtilizationPercent: props.scaleCpuTargetUtilizationPercent ?? 60,
      });
    }

    if (props.scaleMemoryTargetUtilizationPercent !== undefined) {
      scaling.scaleOnMemoryUtilization("MemoryScaling", {
        scaleInCooldown,
        scaleOutCooldown,
        targetUtilizationPercent: props.scaleMemoryTargetUtilizationPercent
      });
    }

    this.port = port;
    this.taskDefinition = taskDefinition;
    this.logGroup = logGroup;
    this.service = service;
    this.scaling = scaling;
    this.scaleInCooldown = scaleInCooldown;
    this.scaleOutCooldown = scaleOutCooldown;

    new StandardTags(this, {
      suppress: props?.suppressTagging
    }).addAutomationComponentTags({
      url: CDK_NPMJS_URL,
      vendor: CDK_VENDOR
    });
  }

  /**
   * Helper method to conduct scaling based on tracking custom metrics.
   *
   * @param id the id to give the scaling
   * @param metric the metric to track
   * @param targetValue the target value
   */
  scaleToTrackCustomMetric(id: string, metric: IMetric,  targetValue: number) {
    this.scaling.scaleToTrackCustomMetric(id, {
      scaleInCooldown: this.scaleInCooldown,
      scaleOutCooldown: this.scaleOutCooldown,
      metric,
      targetValue
    });
  }

  /**
   * Convenience method to scale based on a metric.
   *
   * @param id the id to give the scaling policy
   * @param props scaling properties
   */
  scaleOnMetric(id: string, props: BasicStepScalingPolicyProps) {
    this.scaling.scaleOnMetric(id, props);
  }

  /**
   * Convenience method to scale based on a schedule.
   *
   * @param id the id to give the scaling policy
   * @param props scaling properties
   */
  scaleOnSchedule(id: string, props: ScalingSchedule) {
    this.scaling.scaleOnSchedule(id, props);
  }
}
