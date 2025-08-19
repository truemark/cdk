import {Construct} from 'constructs';
import {CfnCacheCluster, CfnSubnetGroup} from 'aws-cdk-lib/aws-elasticache';
import {IVpc, SecurityGroup} from 'aws-cdk-lib/aws-ec2';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';
import {StringParameter} from 'aws-cdk-lib/aws-ssm';

/**
 * Properties for creating a Standard Redis Cluster.
 */
export interface StandardRedisClusterProps extends ExtendedConstructProps {
  /**
   * The VPC where the Redis cluster will be deployed.
   */
  readonly vpc: IVpc;
  /**
   * The cache node type for the Redis cluster.
   */
  readonly cacheNodeType: string;

  /**
   * The number of cache nodes in the Redis cluster.
   */
  readonly numCacheNodes: number;

  /**
   * The CW log group name.
   */
  readonly logGroupName: string;

  /**
   * The engine version of Redis.
   * @default - The latest supported engine version.
   */
  readonly engineVersion?: string;

  /**
   * The ARNs of Redis snapshots to restore from.
   */
  readonly snapshotArns?: string[];

  /**
   * The name of the Redis snapshot to restore from.
   */
  readonly snapshotName?: string;

  /**
   * The number of Redis snapshots to retain.
   */
  readonly snapshotRetentionLimit?: number;

  /**
   * The daily time range (in UTC) during which ElastiCache takes a daily snapshot of the Redis cluster.
   */
  readonly snapshotWindow?: string;

  /**
   * The network type you choose when modifying a cluster, either ipv4 or ipv6
   */
  readonly ipDiscovery?: string;

  /**
   * The ssm param path to store the endpoint.
   */
  readonly endPointSSMParamPath?: string;

  /**
   * Must be either ipv4 or ipv6 or	dual_stack.
   */
  readonly networkType?: string;

  /**
   * Specifies whether automatic failover is enabled for the Redis cluster.
   * @default - Automatic failover is disabled.
   */
  readonly automaticFailoverEnabled?: boolean;

  /**
   * Specifies whether minor engine version upgrades are applied automatically to the Redis cluster during the maintenance window.
   * @default - Minor engine version upgrades are not applied automatically.
   */
  readonly autoMinorVersionUpgrade?: boolean;

  /**
   * The security group IDs to associate with the Redis cluster.
   */
  readonly securityGroupIds?: string[];

  /**
   * The name of the cache subnet group to associate with the Redis cluster.
   */
  readonly subnetGroupName?: string;

  /**
   * The name of the parameter group to associate with the Redis cluster.
   */
  readonly parameterGroupName?: string;

  /**
   * A list of cache node IDs to be removed.
   */
  readonly cacheNodeIdsToRemove?: string[];

  /**
   * The maintenance window for the Redis cluster.
   */
  readonly maintenanceWindow?: string;

  /**
   * The ARN of the SNS topic to send ElastiCache notifications to.
   */
  readonly notificationTopicArn?: string;

  /**
   * The port number on which the Redis cluster accepts connections.
   * @default - The default Redis port (6379).
   */
  readonly port?: number;

  /**
   * The ID of the replication group to which the Redis cluster belongs.
   */
  readonly replicationGroupId?: string;

  /**
   * A flag that enables in-transit encryption when set to true.
   */
  readonly transitEncryptionEnabled?: boolean;

  /**
   * A flag that enables encryption at rest when set to true.
   */
  readonly atRestEncryptionEnabled?: boolean;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

export class StandardRedisCluster extends ExtendedConstruct {
  /**
   * Creates a new StandardRedisCluster.
   * @param scope The parent construct.
   * @param id The construct ID.
   * @param props The cluster properties.
   */
  constructor(scope: Construct, id: string, props: StandardRedisClusterProps) {
    super(scope, id, {
      standardTags: StandardTags.merge(props.standardTags, LibStandardTags),
    });

    const subnetGroup = new CfnSubnetGroup(this, 'RedisSubnetGroup', {
      description: 'Subnet Group for Redis',
      subnetIds: props.vpc.selectSubnets().subnetIds,
    });

    const securityGroup = new SecurityGroup(this, 'RedisSecurityGroup', {
      vpc: props.vpc,
    });

    // Dynamically constructing the cache cluster configuration
    const cacheClusterProps: any = {
      cacheNodeType: props.cacheNodeType,
      engine: 'redis',
      numCacheNodes: props.numCacheNodes,
      cacheSubnetGroupName: subnetGroup.ref,
      vpcSecurityGroupIds: [securityGroup.securityGroupId],
      logDeliveryConfigurations: [
        {
          destinationDetails: {
            cloudWatchLogsDetails: {
              logGroup: props.logGroupName,
            },
          },
          destinationType: 'cloudwatch-logs',
          logFormat: 'json',
          logType: 'engine-log',
        },
      ],
    };

    //Additional Optional Props
    if (props.engineVersion)
      cacheClusterProps.engineVersion = props.engineVersion;
    if (props.snapshotArns) cacheClusterProps.snapshotArns = props.snapshotArns;
    if (props.snapshotName) cacheClusterProps.snapshotName = props.snapshotName;
    if (props.snapshotRetentionLimit)
      cacheClusterProps.snapshotRetentionLimit = props.snapshotRetentionLimit;
    if (props.snapshotWindow)
      cacheClusterProps.snapshotWindow = props.snapshotWindow;
    if (props.networkType) cacheClusterProps.networkType = props.networkType;
    if (props.automaticFailoverEnabled)
      cacheClusterProps.automaticFailoverEnabled =
        props.automaticFailoverEnabled;
    if (props.autoMinorVersionUpgrade)
      cacheClusterProps.autoMinorVersionUpgrade = props.autoMinorVersionUpgrade;
    if (props.subnetGroupName)
      cacheClusterProps.cacheSubnetGroupName = props.subnetGroupName;
    if (props.parameterGroupName)
      cacheClusterProps.cacheParameterGroupName = props.parameterGroupName;
    if (props.cacheNodeIdsToRemove)
      cacheClusterProps.cacheNodeIdsToRemove = props.cacheNodeIdsToRemove;
    if (props.maintenanceWindow)
      cacheClusterProps.preferredMaintenanceWindow = props.maintenanceWindow;
    if (props.notificationTopicArn)
      cacheClusterProps.notificationTopicArn = props.notificationTopicArn;
    if (props.port) cacheClusterProps.port = props.port;
    if (props.replicationGroupId)
      cacheClusterProps.replicationGroupId = props.replicationGroupId;
    if (props.transitEncryptionEnabled)
      cacheClusterProps.transitEncryptionEnabled =
        props.transitEncryptionEnabled;
    if (props.atRestEncryptionEnabled)
      cacheClusterProps.atRestEncryptionEnabled = props.atRestEncryptionEnabled;

    //Pass the config
    const cacheCluster = new CfnCacheCluster(
      this,
      'RedisCluster',
      cacheClusterProps
    );

    //Create SSM parameter to store the endpoint
    if (props.atRestEncryptionEnabled) {
      new StringParameter(this, 'RedisEnpointParamter', {
        parameterName: props.endPointSSMParamPath,
        stringValue: cacheCluster.getAtt('RedisEndpoint.Address').toString(),
        description: `This is a secure string parameter to store endopoint of cluserId ${cacheClusterProps.cacheClusterId}`,
      });
    }
  }
}
