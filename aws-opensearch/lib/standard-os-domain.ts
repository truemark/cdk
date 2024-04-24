import {Construct} from 'constructs';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {SecretValue, RemovalPolicy} from 'aws-cdk-lib';
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager';
import {IHostedZone} from 'aws-cdk-lib/aws-route53';
import {LibStandardTags} from '../../truemark';
import {
  EbsDeviceVolumeType,
  IVpc,
  SubnetSelection,
  ISecurityGroup,
} from 'aws-cdk-lib/aws-ec2';
import * as kms from 'aws-cdk-lib/aws-kms';
import {ILogGroup} from 'aws-cdk-lib/aws-logs';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {
  Domain,
  DomainProps,
  EngineVersion,
  AdvancedSecurityOptions,
  SAMLOptionsProperty,
} from 'aws-cdk-lib/aws-opensearchservice';

/**
 * Properties for creating an OpenSearch Domain.
 */
export interface StandardOpensearchDomainProps extends ExtendedConstructProps {
  /**
   * The Elasticsearch/OpenSearch version that your domain will leverage.
   */
  readonly version: EngineVersion;

  /**
   * Enforces a particular physical domain name.
   *
   * @default - A name will be auto-generated.
   */
  readonly domainName?: string;

  /**
   * Configures the capacity of the cluster such as the instance type and the
   * number of instances.
   */
  readonly capacity?: {
    /**
     * The instance type for your data nodes, such as
     * `m3.medium.search`. For valid values, see [Supported Instance
     * Types](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/supported-instance-types.html)
     * in the Amazon OpenSearch Service Developer Guide.
     *
     * @default - r5.large.search
     */
    dataNodeInstanceType: string;

    /**
     * The number of data nodes (instances) to use in the Amazon OpenSearch Service domain.
     *
     * @default - 1
     */
    dataNodes: number;

    /**
     * The hardware configuration of the computer that hosts the dedicated master
     * node, such as `m3.medium.search`. For valid values, see [Supported
     * Instance Types](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/supported-instance-types.html)
     * in the Amazon OpenSearch Service Developer Guide.
     *
     * @default - r5.large.search
     */
    masterNodeInstanceType?: string;

    /**
     * The number of instances to use for the master node.
     *
     * @default - no dedicated master nodes
     */
    masterNodes?: number;

    /**
     * The number of UltraWarm nodes (instances) to use in the Amazon OpenSearch Service domain.
     *
     * @default - no UltraWarm nodes
     */
    readonly warmNodes?: number;

    /**
     * The instance type for your UltraWarm node, such as `ultrawarm1.medium.search`.
     * For valid values, see [UltraWarm Storage
     * Limits](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/limits.html#limits-ultrawarm)
     * in the Amazon OpenSearch Service Developer Guide.
     *
     * @default - ultrawarm1.medium.search
     */
    readonly warmInstanceType?: string;

    /**
     * A boolean that indicates whether a multi-AZ domain is turned on with a standby AZ.
     * For more information, see Configuring a multi-AZ domain in Amazon OpenSearch Service.
     */
    readonly multiAZWithStandbyEnabled?: boolean;
  };

  /**
   * The configurations of Amazon Elastic Block Store (Amazon EBS) volumes that
   * are attached to data nodes in the Amazon OpenSearch Service domain. For more information, see
   * [Amazon EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html)
   * in the Amazon Elastic Compute Cloud Developer Guide.
   */
  readonly ebs?: {
    /**
     * Specifies whether Amazon EBS volumes are attached to data nodes in the
     * Amazon OpenSearch Service domain.
     *
     * @default - true
     */
    readonly enabled?: boolean;

    /**
     * The number of I/O operations per second (IOPS) that the volume
     * supports. This property applies only to the gp3 and Provisioned IOPS (SSD) EBS
     * volume type.
     *
     * @default - iops are not set.
     */
    readonly iops?: number;

    /**
     * The throughput (in MiB/s) of the EBS volumes attached to data nodes.
     * This property applies only to the gp3 volume type.
     *
     * @default - throughput is not set.
     */
    readonly throughput?: number;

    /**
     * The size (in GiB) of the EBS volume for each data node. The minimum and
     * maximum size of an EBS volume depends on the EBS volume type and the
     * instance type to which it is attached.  For  valid values, see
     * [EBS volume size limits](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/limits.html#ebsresource)
     * in the Amazon OpenSearch Service Developer Guide.
     *
     * @default 10
     */
    readonly volumeSize?: number;

    /**
     * The EBS volume type to use with the Amazon OpenSearch Service domain, such as standard, gp2, io1.
     *
     * @default gp2
     */
    readonly volumeType?: EbsDeviceVolumeType;
  };

  /**
   * Place the domain inside this VPC.
   *
   * @see https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vpc.html
   * @default - Domain is not placed in a VPC.
   */
  readonly vpc?: IVpc;

  /**
   * The list of security groups that are associated with the VPC endpoints
   * for the domain.
   *
   * Only used if `vpc` is specified.
   *
   * @see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
   * @default - One new security group is created.
   */
  readonly securityGroups?: ISecurityGroup[];

  /**
   * The specific vpc subnets the domain will be placed in. You must provide one subnet for each Availability Zone
   * that your domain uses. For example, you must specify three subnet IDs for a three Availability Zone
   * domain.
   *
   * Only used if `vpc` is specified.
   *
   * @see https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html
   * @default - All private subnets.
   */
  readonly vpcSubnets?: SubnetSelection[];

  /**
   * Specifies zone awareness configuration options.
   */
  readonly zoneAwareness?: {
    /**
     * Indicates whether to enable zone awareness for the Amazon OpenSearch Service domain.
     * When you enable zone awareness, Amazon OpenSearch Service allocates the nodes and replica
     * index shards that belong to a cluster across two Availability Zones (AZs)
     * in the same region to prevent data loss and minimize downtime in the event
     * of node or data center failure. Don't enable zone awareness if your cluster
     * has no replica index shards or is a single-node cluster. For more information,
     * see [Configuring a Multi-AZ Domain](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-multiaz.html)
     * in the Amazon OpenSearch Service Developer Guide.
     *
     * @default - false
     */
    readonly enabled?: boolean;

    /**
     * If you enabled multiple Availability Zones (AZs), the number of AZs that you
     * want the domain to use. Valid values are 2 and 3.
     *
     * @default - 2 if zone awareness is enabled.
     */
    readonly availabilityZoneCount?: number;
  };

  /**
   * Domain access policies.
   *
   * @default - No access policies.
   */
  readonly accessPolicies?: PolicyStatement[];

  /**
   * True to require that all traffic to the domain arrive over HTTPS.
   *
   * @default - false
   */
  readonly enforceHttps?: boolean;

  /**
   * Specifies options for fine-grained access control.
   * Requires Elasticsearch version 6.7 or later or OpenSearch version 1.0 or later. Enabling fine-grained access control
   * also requires encryption of data at rest and node-to-node encryption, along with
   * enforced HTTPS.
   *
   * @default - fine-grained access control is disabled
   */
  readonly fineGrainedAccessControl?: {
    /**
     * ARN for the master user. Only specify this or masterUserName, but not both.
     *
     * @default - fine-grained access control is disabled
     */
    readonly masterUserArn?: string;

    /**
     * Username for the master user. Only specify this or masterUserArn, but not both.
     *
     * @default - fine-grained access control is disabled
     */
    readonly masterUserName?: string;

    /**
     * Password for the master user.
     *
     * You can use `SecretValue.unsafePlainText` to specify a password in plain text or
     * use `secretsmanager.Secret.fromSecretAttributes` to reference a secret in
     * Secrets Manager.
     *
     * @default - A Secrets Manager generated password
     */
    readonly masterUserPassword?: SecretValue;

    /**
     * True to enable SAML authentication for a domain.
     *
     * @see https://docs.aws.amazon.com/opensearch-service/latest/developerguide/saml.html
     *
     * @default - SAML authentication is disabled. Enabled if `samlAuthenticationOptions` is set.
     */
    readonly samlAuthenticationEnabled?: boolean;

    /**
     * Container for information about the SAML configuration for OpenSearch Dashboards.
     * If set, `samlAuthenticationEnabled` will be enabled.
     *
     * @default - no SAML authentication options
     */
    readonly samlAuthenticationOptions?: {
      /**
       * The unique entity ID of the application in the SAML identity provider.
       */
      readonly idpEntityId: string;

      /**
       * The metadata of the SAML application, in XML format.
       */
      readonly idpMetadataContent: string;

      /**
       * The SAML master username, which is stored in the domain's internal user database.
       * This SAML user receives full permission in OpenSearch Dashboards/Kibana.
       * Creating a new master username does not delete any existing master usernames.
       *
       * @default - No master user name is configured
       */
      readonly masterUserName?: string;

      /**
       * The backend role that the SAML master user is mapped to.
       * Any users with this backend role receives full permission in OpenSearch Dashboards/Kibana.
       * To use a SAML master backend role, configure the `rolesKey` property.
       *
       * @default - The master user is not mapped to a backend role
       */
      readonly masterBackendRole?: string;

      /**
       * Element of the SAML assertion to use for backend roles.
       *
       * @default - roles
       */
      readonly rolesKey?: string;

      /**
       * Element of the SAML assertion to use for the user name.
       *
       * @default - NameID element of the SAML assertion fot the user name
       */
      readonly subjectKey?: string;

      /**
       * The duration, in minutes, after which a user session becomes inactive.
       *
       * @default - 60
       */
      readonly sessionTimeoutMinutes?: number;
    };
  };

  /**
   * To upgrade an Amazon OpenSearch Service domain to a new version, rather than replacing the entire
   * domain resource, use the EnableVersionUpgrade update policy.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-upgradeopensearchdomain
   *
   * @default - false
   */
  readonly enableVersionUpgrade?: boolean;

  /**
   * Policy to apply when the domain is removed from the stack
   *
   * @default RemovalPolicy.RETAIN
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * To configure a custom domain configure these options
   *
   * If you specify a Route53 hosted zone it will create a CNAME record and use DNS validation for the certificate
   *
   * @default - no custom domain endpoint will be configured
   */
  readonly customEndpoint?: {
    /**
     * The custom domain name to assign
     */
    readonly domainName: string;

    /**
     * The certificate to use
     * @default - create a new one
     */
    readonly certificate?: ICertificate;

    /**
     * The hosted zone in Route53 to create the CNAME record in
     * @default - do not create a CNAME
     */
    readonly hostedZone?: IHostedZone;
  };

  /**
   * Options for enabling a domain's off-peak window, during which OpenSearch Service can perform mandatory
   * configuration changes on the domain.
   *
   * Off-peak windows were introduced on February 16, 2023.
   * All domains created before this date have the off-peak window disabled by default.
   * You must manually enable and configure the off-peak window for these domains.
   * All domains created after this date will have the off-peak window enabled by default.
   * You can't disable the off-peak window for a domain after it's enabled.
   *
   * @see https://docs.aws.amazon.com/it_it/AWSCloudFormation/latest/UserGuide/aws-properties-opensearchservice-domain-offpeakwindow.html
   *
   * @default - Disabled for domains created before February 16, 2023. Enabled for domains created after. Enabled if `offPeakWindowStart` is set.
   */
  readonly offPeakWindowEnabled?: boolean;

  /**
   * Start time for the off-peak window, in Coordinated Universal Time (UTC).
   * The window length will always be 10 hours, so you can't specify an end time.
   * For example, if you specify 11:00 P.M. UTC as a start time, the end time will automatically be set to 9:00 A.M.
   *
   * @default - 10:00 P.M. local time
   */
  readonly offPeakWindowStart?: {
    /**
     * The start hour of the window in Coordinated Universal Time (UTC), using 24-hour time.
     * For example, 17 refers to 5:00 P.M. UTC.
     *
     * @default - 22
     */
    readonly hours: number;
    /**
     * The start minute of the window, in UTC.
     *
     * @default - 0
     */
    readonly minutes: number;
  };

  /**
   * Specifies whether automatic service software updates are enabled for the domain.
   *
   * @see https://docs.aws.amazon.com/it_it/AWSCloudFormation/latest/UserGuide/aws-properties-opensearchservice-domain-softwareupdateoptions.html
   *
   * @default - false
   */
  readonly enableAutoSoftwareUpdate?: boolean;

  /**
   * Specify true to enable node to node encryption.
   * Requires Elasticsearch version 6.0 or later or OpenSearch version 1.0 or later.
   *
   * @default - Node to node encryption is not enabled.
   */
  readonly nodeToNodeEncryption?: boolean;

  /**
   * The hour in UTC during which the service takes an automated daily snapshot
   * of the indices in the Amazon OpenSearch Service domain. Only applies for Elasticsearch versions
   * below 5.3.
   *
   * @default - Hourly automated snapshots not used
   */
  readonly automatedSnapshotStartHour?: number;

  /**
   * Whether the domain should encrypt data at rest, and if so, the AWS Key
   * Management Service (KMS) key to use. Can only be used to create a new domain,
   * not update an existing one. Requires Elasticsearch version 5.1 or later or OpenSearch version 1.0 or later.
   */
  readonly encryptionAtRestOptions?: {
    /**
     * Specify true to enable encryption at rest.
     *
     * @default - encryption at rest is disabled.
     */
    readonly enabled?: boolean;

    /**
     * Supply if using KMS key for encryption at rest.
     *
     * @default - uses default aws/es KMS key.
     */
    readonly kmsKey?: kms.IKey;
  };

  /**
   * Additional options to specify for the Amazon OpenSearch Service domain.
   *
   * @see https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html#createdomain-configure-advanced-options
   * @default - no advanced options are specified
   */
  readonly advancedOptions?: {[key: string]: string};

  /**
   * Configuration log publishing configuration options.
   *
   * @default - No logs are published
   */
  readonly logging?: {
    /**
     * Specify if slow search logging should be set up.
     * Requires Elasticsearch version 5.1 or later or OpenSearch version 1.0 or later.
     * An explicit `false` is required when disabling it from `true`.
     *
     * @default - false
     */
    readonly slowSearchLogEnabled?: boolean;

    /**
     * Log slow searches to this log group.
     *
     * @default - a new log group is created if slow search logging is enabled
     */
    readonly slowSearchLogGroup?: ILogGroup;

    /**
     * Specify if slow index logging should be set up.
     * Requires Elasticsearch version 5.1 or later or OpenSearch version 1.0 or later.
     * An explicit `false` is required when disabling it from `true`.
     *
     * @default - false
     */
    readonly slowIndexLogEnabled?: boolean;

    /**
     * Log slow indices to this log group.
     *
     * @default - a new log group is created if slow index logging is enabled
     */
    readonly slowIndexLogGroup?: ILogGroup;

    /**
     * Specify if Amazon OpenSearch Service application logging should be set up.
     * Requires Elasticsearch version 5.1 or later or OpenSearch version 1.0 or later.
     * An explicit `false` is required when disabling it from `true`.
     *
     * @default - false
     */
    readonly appLogEnabled?: boolean;

    /**
     * Log Amazon OpenSearch Service application logs to this log group.
     *
     * @default - a new log group is created if app logging is enabled
     */
    readonly appLogGroup?: ILogGroup;

    /**
     * Specify if Amazon OpenSearch Service audit logging should be set up.
     * Requires Elasticsearch version 6.7 or later or OpenSearch version 1.0 or later and fine grained access control to be enabled.
     *
     * @default - false
     */
    readonly auditLogEnabled?: boolean;

    /**
     * Log Amazon OpenSearch Service audit logs to this log group.
     *
     * @default - a new log group is created if audit logging is enabled
     */
    readonly auditLogGroup?: ILogGroup;
  };
}

export class StandardOpensearchDomain extends ExtendedConstruct {
  public readonly domain: Domain;

  constructor(
    scope: Construct,
    id: string,
    props: StandardOpensearchDomainProps
  ) {
    super(scope, id, {
      standardTags: StandardTags.merge(props.standardTags, LibStandardTags),
    });

    const domainProps: DomainProps = this.setupDomainProps(props);
    this.domain = new Domain(this, 'Default', domainProps);
  }
  private setupDomainProps(props: StandardOpensearchDomainProps): DomainProps {
    return {
      version: props.version,
      domainName: props.domainName,
      enableVersionUpgrade: props.enableVersionUpgrade,
      enableAutoSoftwareUpdate: props.enableAutoSoftwareUpdate,
      removalPolicy: props.removalPolicy,
      capacity: {
        masterNodes: props.capacity?.masterNodes,
        masterNodeInstanceType: props.capacity?.masterNodeInstanceType,
        dataNodes: props.capacity?.dataNodes,
        dataNodeInstanceType: props.capacity?.dataNodeInstanceType,
        warmNodes: props.capacity?.warmNodes,
        warmInstanceType: props.capacity?.warmInstanceType,
        multiAzWithStandbyEnabled: props.capacity?.multiAZWithStandbyEnabled,
      },
      ebs: props.ebs,
      vpc: props.vpc,
      zoneAwareness: props.zoneAwareness,
      enforceHttps: props.enforceHttps,
      nodeToNodeEncryption: props.nodeToNodeEncryption,
      encryptionAtRest: {
        enabled:
          props.fineGrainedAccessControl?.masterUserPassword !== undefined,
        kmsKey: props.encryptionAtRestOptions?.kmsKey,
      },
      customEndpoint: this.setupCustomEndpoint(props.customEndpoint),
      fineGrainedAccessControl: this.setupAdvancedSecurityOptions(
        props.fineGrainedAccessControl
      ),
      accessPolicies: props.accessPolicies,
      logging: this.setupLoggingOptions(props.logging),
      offPeakWindowEnabled: props.offPeakWindowEnabled,
      offPeakWindowStart: props.offPeakWindowStart,
      automatedSnapshotStartHour: props.automatedSnapshotStartHour,
      advancedOptions: props.advancedOptions,
    };
  }

  private setupCustomEndpoint(endpointConfig?: {
    domainName: string;
    certificate?: ICertificate;
    hostedZone?: IHostedZone;
  }): DomainProps['customEndpoint'] {
    if (!endpointConfig) return undefined;
    return {
      domainName: endpointConfig.domainName,
      certificate: endpointConfig.certificate,
      hostedZone: endpointConfig.hostedZone,
    };
  }

  private setupAdvancedSecurityOptions(options?: {
    masterUserArn?: string;
    masterUserName?: string;
    masterUserPassword?: SecretValue;
    samlAuthenticationEnabled?: boolean;
    samlAuthenticationOptions?: SAMLOptionsProperty;
  }): AdvancedSecurityOptions | undefined {
    if (!options) return undefined;
    return {
      masterUserArn: options.masterUserArn,
      masterUserName: options.masterUserName,
      masterUserPassword: options.masterUserPassword,
      samlAuthenticationEnabled: options.samlAuthenticationEnabled,
      samlAuthenticationOptions: options.samlAuthenticationOptions,
    };
  }

  private setupLoggingOptions(loggingConfig?: {
    slowSearchLogEnabled?: boolean;
    slowSearchLogGroup?: ILogGroup;
    slowIndexLogEnabled?: boolean;
    slowIndexLogGroup?: ILogGroup;
    appLogEnabled?: boolean;
    appLogGroup?: ILogGroup;
    auditLogEnabled?: boolean;
    auditLogGroup?: ILogGroup;
  }): DomainProps['logging'] {
    if (!loggingConfig) return undefined;
    return {
      slowSearchLogEnabled: loggingConfig.slowSearchLogEnabled,
      slowSearchLogGroup: loggingConfig.slowSearchLogGroup,
      slowIndexLogEnabled: loggingConfig.slowIndexLogEnabled,
      slowIndexLogGroup: loggingConfig.slowIndexLogGroup,
      appLogEnabled: loggingConfig.appLogEnabled,
      appLogGroup: loggingConfig.appLogGroup,
      auditLogEnabled: loggingConfig.auditLogEnabled,
      auditLogGroup: loggingConfig.auditLogGroup,
    };
  }
}
