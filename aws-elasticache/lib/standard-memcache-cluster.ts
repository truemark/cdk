import {Construct} from 'constructs';
import {CfnCacheCluster, CfnSubnetGroup} from 'aws-cdk-lib/aws-elasticache';
import {IVpc, SecurityGroup} from 'aws-cdk-lib/aws-ec2';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';

/**
 * Properties for creating a Standard Memcache Cluster.
 */
export interface StandardMemcacheClusterProps extends ExtendedConstructProps {
  /**
   * The VPC where the Memcache cluster will be deployed.
   */
  readonly vpc: IVpc;
  /**
   * The cache node type for the Memcache cluster.
   */
  readonly cacheNodeType: string;

  /**
   * The number of cache nodes in the Memcache cluster.
   */
  readonly numCacheNodes: number;

  /**
   * The CW log group name.
   */
  readonly logGroupName: string;

  /**
   * The engine version of Memcache.
   * @default - The latest supported engine version.
   */
  readonly engineVersion?: string;

  /**
   * The ARNs of Memcache snapshots to restore from.
   */
  readonly snapshotArns?: string[];

  /**
   * The name of the Memcache snapshot to restore from.
   */
  readonly snapshotName?: string;

  /**
   * The number of Memcache snapshots to retain.
   */
  readonly snapshotRetentionLimit?: number;

  /**
   * The daily time range (in UTC) during which ElastiCache takes a daily snapshot of the Memcache cluster.
   */
  readonly snapshotWindow?: string;

  /**
   * Specifies whether the nodes in this cluster are created in a single AZ or multiple AZs.
   */
  readonly azMode?: string;

  /**
   * The network type you choose when modifying a cluster, either ipv4 or ipv6
   */
  readonly ipDiscovery?: string;

  /**
   * Must be either ipv4 or ipv6 or	dual_stack.
   */
  readonly networkType?: string;

  /**
   * Specifies whether automatic failover is enabled for the Memcache cluster.
   * @default - Automatic failover is disabled.
   */
  readonly automaticFailoverEnabled?: boolean;

  /**
   * Specifies whether minor engine version upgrades are applied automatically to the Memcache cluster during the maintenance window.
   * @default - Minor engine version upgrades are not applied automatically.
   */
  readonly autoMinorVersionUpgrade?: boolean;

  /**
   * The security group IDs to associate with the Memcache cluster.
   */
  readonly securityGroupIds?: string[];

  /**
   * The name of the cache subnet group to associate with the Memcache cluster.
   */
  readonly subnetGroupName?: string;

  /**
   * The name of the parameter group to associate with the Memcache cluster.
   */
  readonly parameterGroupName?: string;

  /**
   * The maintenance window for the Memcache cluster.
   */
  readonly maintenanceWindow?: string;

  /**
   * The ARN of the SNS topic to send ElastiCache notifications to.
   */
  readonly notificationTopicArn?: string;

  /**
   * The port number on which the Memcache cluster accepts connections.
   * @default - The default Memcache port (11211).
   */
  readonly port?: number;

  /**
   * The ID of the replication group to which the Memcache cluster belongs.
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

export class StandardMemcacheCluster extends ExtendedConstruct {
  /**
   * Creates a new StandardMemcacheCluster.
   * @param scope The parent construct.
   * @param id The construct ID.
   * @param props The cluster properties.
   */
  constructor(
    scope: Construct,
    id: string,
    props: StandardMemcacheClusterProps
  ) {
    super(scope, id, {
      standardTags: StandardTags.merge(props.standardTags, LibStandardTags),
    });

    const subnetGroup = new CfnSubnetGroup(this, 'MemcacheSubnetGroup', {
      description: 'Subnet Group for Memcache',
      subnetIds: props.vpc.selectSubnets().subnetIds,
    });

    const securityGroup = new SecurityGroup(this, 'MemcacheSecurityGroup', {
      vpc: props.vpc,
    });

    // Dynamically constructing the cache cluster configuration
    const cacheClusterProps: any = {
      cacheNodeType: props.cacheNodeType,
      engine: 'memcache',
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
          logType: 'slow-log',
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
    if (props.azMode) cacheClusterProps.azMode = props.azMode;
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
    new CfnCacheCluster(this, 'MemcacheCluster', cacheClusterProps);
  }
}
