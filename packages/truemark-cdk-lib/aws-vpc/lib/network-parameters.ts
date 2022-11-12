import {Construct} from "constructs";
import {StringListParameter, StringParameter} from "aws-cdk-lib/aws-ssm";
import {TrueMarkTags} from "../../aws-tags";

/**
 * Properties for NetworkParameters.
 */
export interface NetworkParametersProps {

  /**
   * Name of the network. This is normally the name of your VPC.
   */
  readonly name: string;

  /**
   * Prefix from which to store and retrieve parameters. Default is "/network".
   *
   * @default - "/network"
   */
  readonly prefix?: string;

  /**
   * Setting this to false will disable the creation of resources in this construct. Default is true.
   *
   * @default - true
   */
  readonly create?: boolean;

  /**
   * Setting this to true will suppress the creation of default tags on resources created by this
   * construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;

  /**
   * VPC ID to store.
   */
  readonly vpcId?: string;

  /**
   * Availability-zone values to store.
   */
  readonly azs?: string[];

  /**
   * Public subnet IDs to store.
   */
  readonly publicSubnetIds?: string[];

  /**
   * Private subnet IDs to store.
   */
  readonly privateSubnetIds?: string[];

  /**
   * Intra subnet IDs to store.
   */
  readonly intraSubnetIds?: string[];

  /**
   * Redshift subnet IDs to store.
   */
  readonly redshiftSubnetIds?: string[];

  /**
   * Database subnet IDs to store.
   */
  readonly databaseSubnetIds?: string[];

  /**
   * Elasticache subnet IDs to store.
   */
  readonly elasticacheSubnetIds?: string[];

  /**
   * Outpost subnet IDs to store.
   */
  readonly outpostSubnetIds?: string[];

  /**
   * Public ALB ARNs to store.
   */
  readonly publicAlbArns?: string[];

  /**
   * Private ALB ARNs to store.
   */
  readonly privateAlbArns?: string[];

  /**
   * Lookup VPC value if not provided. Default is true.
   *
   * @default - true
   */
  readonly lookupVpc?: boolean;

  /**
   * Lookup availability zones if not provided. Default is true.
   *
   * @default - true
   */
  readonly lookupAzs?: boolean;

  /**
   * Lookup public subnets if not provided. Default is true.
   *
   * @default - true
   */
  readonly lookupPublicSubnets?: boolean;

  /**
   * Lookup private subnets if not provided. Default is true.
   *
   * @default - true
   */
  readonly lookupPrivateSubnets?: boolean;

  /**
   * Lookup intra subnets if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupIntraSubnets?: boolean;

  /**
   * Lookup redshift subnets if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupRedshiftSubnets?: boolean;

  /**
   * Lookup database subnets if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupDatabaseSubnets?: boolean;

  /**
   * Lookup elasticache subnets if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupElasticacheSubnets?: boolean;

  /**
   * Lookup outpost subnets if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupOutpostSubnets?: boolean;

  /**
   * Lookup public ALBs if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupPublicAlbs?: boolean;

  /**
   * Lookup private ALBs if not provided. Default is false.
   *
   * @default - false
   */
  readonly lookupPrivateAlbs?: boolean;
}

/**
 * Stores and retrieves network infrastructure identifiers using
 * AWS Systems Manager Parameter Store.
 */
export class NetworkParameters extends Construct {

  /**
   * Path to the VPC ID
   */
  readonly vpcParameterPath: string;

  /**
   * Path to the availability zones
   */
  readonly azsParameterPath: string;

  /**
   * Path to the public subnet IDs
   */
  readonly publicSubnetsParameterPath: string;

  /**
   * Path to the private subnet IDs
   */
  readonly privateSubnetsParameterPath: string;

  /**
   * Path to the intra subnet IDs
   */
  readonly intraSubnetsParameterPath: string;

  /**
   * Path to the redshift subnet IDs
   */
  readonly redshiftSubnetsParameterPath: string;

  /**
   * Path to the database subnet IDs
   */
  readonly databaseSubnetsParameterPath: string;

  /**
   * Path to the elasticache subnet IDs
   */
  readonly elasticacheSubnetsParameterPath: string;

  /**
   * Path to the outpost subnet IDs.
   */
  readonly outpostSubnetsParameterPath: string;

  /**
   * Path to the public ALB ARNs.
   */
  readonly publicAlbsParameterPath: string;

  /**
   * Path to the private ALB ARNs.
   */
  readonly privateAlbsParameterPaths: string;

  /**
   * The parameter created if vpcId was provided.
   */
  readonly vpcParameter?: StringParameter;

  /**
   * The parameter created if azs were provided.
   */
  readonly azsParameter?: StringListParameter;

  /**
   * The parameter crated if publicSubnetIds were provided.
   */
  readonly publicSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if privateSubnetIds were provided.
   */
  readonly privateSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if intraSubnetIds were provided.
   */
  readonly intraSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if redshiftSubnetIds were provided.
   */
  readonly redshiftSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if databaseSubnetIds were provided.
   */
  readonly databaseSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if elasticacheSubnetIds were provided.
   */
  readonly elasticacheSubnetsParameter?: StringListParameter;

  /**
   * The parameter created if outpostSubnetIds were provided.
   */
  readonly outpostSubnetsPrameter?: StringListParameter;

  /**
   * The parameter created if publicAlbArns were provided.
   */
  readonly publicAlbsParameter?: StringListParameter;

  /**
   * The parameter created if privateAlbArns were provided.
   */
  readonly privateAlbsParameter?: StringListParameter;

  /**
   * The vpcId if provided or lookups are enabled.
   */
  readonly vpcId?: string;

  /**
   * The availability zones if provided or lookups are enabled.
   */
  readonly azs?: string[];

  /**
   * The public subnet IDs if provided or lookups are enabled.
   */
  readonly publicSubnetIds?: string[];

  /**
   * The private subnet IDs if provided or lookups are enabled.
   */
  readonly privateSubnetIds?: string[];

  /**
   * The intra subnet IDs if provided or lookups are enabled.
   */
  readonly intraSubnetIds?: string[];

  /**
   * The redshift subnet IDs if provided or lookups are enabled.
   */
  readonly redshiftSubnetIds?: string[];

  /**
   * The database subnet IDs if provided or lookups are enabled.
   */
  readonly databaseSubnetIds?: string[];

  /**
   * The elasticache subnet IDs if provided or lookups are enabled.
   */
  readonly elasticacheSubnetIds?: string[];

  /**
   * The outpost subnet IDs if provided or lookups are enabled.
   */
  readonly outpostSubnetIds?: string[];

  /**
   * The public ALB ARNs if provided or lookups are enabled.
   */
  readonly publicAlbArns?: string[];

  /**
   * The private ALB ARNs if provided or lookups are enabled.
   */
  readonly privateAlbArns?: string[];

  /**
   * Creates a new NetworkParameters instance.
   *
   * @param scope the parent scope
   * @param id the id of the instance
   * @param props properties for the instance
   */
  constructor(scope: Construct, id: string, props: NetworkParametersProps) {
    super(scope, id);

    const create = props.create ?? true;
    const prefix = props.prefix ?? "/network";
    const path = `${prefix}/${props.name}`;
    this.vpcParameterPath = `${path}/vpc`;
    this.azsParameterPath = `${path}/azs`;
    this.publicSubnetsParameterPath = `${path}/public_subnets`;
    this.privateSubnetsParameterPath = `${path}/private_subnets`;
    this.intraSubnetsParameterPath = `${path}/intra_subnets`;
    this.redshiftSubnetsParameterPath = `${path}/redshift_subnets`;
    this.databaseSubnetsParameterPath = `${path}/database_subnets`;
    this.elasticacheSubnetsParameterPath = `${path}/elasticache_subnets`;
    this.outpostSubnetsParameterPath = `${path}/outpost_subnets`;
    this.publicAlbsParameterPath = `${path}/public_albs`;
    this.privateAlbsParameterPaths = `${path}/private_albs`;

    if (create) {
      if (props.vpcId) {
        this.vpcParameter = new StringParameter(this, "vpcId", {
          parameterName: this.vpcParameterPath,
          stringValue: props.vpcId
        });
        this.vpcId = props.vpcId;
      }
      if (props.azs) {
        this.azsParameter = new StringListParameter(this, "azs", {
          parameterName: this.azsParameterPath,
          stringListValue: props.azs
        });
        this.azs = props.azs;
      }
      if (props.publicSubnetIds) {
        this.publicSubnetsParameter = new StringListParameter(this, "publicSubnets", {
          parameterName: this.publicSubnetsParameterPath,
          stringListValue: props.publicSubnetIds
        });
        this.publicSubnetIds = props.privateSubnetIds;
      }
      if (props.privateSubnetIds) {
        this.privateSubnetsParameter = new StringListParameter(this, "privateSubnets", {
          parameterName: this.privateSubnetsParameterPath,
          stringListValue: props.privateSubnetIds
        });
        this.privateSubnetIds = props.privateSubnetIds;
      }
      if (props.intraSubnetIds) {
        this.intraSubnetsParameter = new StringListParameter(this, "intraSubnets", {
          parameterName: this.intraSubnetsParameterPath,
          stringListValue: props.intraSubnetIds
        });
        this.intraSubnetIds = props.intraSubnetIds;
      }
      if (props.redshiftSubnetIds) {
        this.redshiftSubnetsParameter = new StringListParameter(this, "redshiftSubnets", {
          parameterName: this.redshiftSubnetsParameterPath,
          stringListValue: props.redshiftSubnetIds
        });
        this.redshiftSubnetIds = props.redshiftSubnetIds;
      }
      if (props.databaseSubnetIds) {
        this.databaseSubnetsParameter = new StringListParameter(this, "databaseSubnets", {
          parameterName: this.databaseSubnetsParameterPath,
          stringListValue: props.databaseSubnetIds
        });
        this.databaseSubnetIds = props.databaseSubnetIds;
      }
      if (props.elasticacheSubnetIds) {
        this.elasticacheSubnetsParameter = new StringListParameter(this, "elasticacheSubnets", {
          parameterName: this.elasticacheSubnetsParameterPath,
          stringListValue: props.elasticacheSubnetIds
        });
        this.elasticacheSubnetIds = props.elasticacheSubnetIds;
      }
      if (props.outpostSubnetIds) {
        this.outpostSubnetsPrameter = new StringListParameter(this, "outpostSubnets", {
          parameterName: this.outpostSubnetsParameterPath,
          stringListValue: props.outpostSubnetIds
        });
        this.outpostSubnetIds = props.outpostSubnetIds
      }
      if (props.publicAlbArns) {
        this.publicAlbsParameter = new StringListParameter(this, "publicAlbs", {
          parameterName: this.publicAlbsParameterPath,
          stringListValue: props.publicAlbArns
        });
        this.publicAlbArns = props.publicAlbArns;
      }
      if (props.privateAlbArns) {
        this.privateAlbsParameter = new StringListParameter(this, "privateAlbs", {
          parameterName: this.privateAlbsParameterPaths,
          stringListValue: props.privateAlbArns
        });
        this.privateAlbArns = props.privateAlbArns;
      }
    }
    if (props.lookupVpc ?? true) {
      if (!this.vpcId) {
        this.vpcId = StringParameter.valueFromLookup(this, this.vpcParameterPath);
      }
    }
    if (props.lookupAzs ?? true) {
      if (!this.azs) {
        this.azs = StringParameter.valueFromLookup(this, this.azsParameterPath).split(",");
      }
    }
    if (props.lookupPublicSubnets ?? true) {
      if (!this.publicSubnetIds) {
        this.publicSubnetIds = StringParameter.valueFromLookup(this, this.publicSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupPrivateSubnets ?? true) {
      if (!this.privateSubnetIds) {
        this.privateSubnetIds = StringParameter.valueFromLookup(this, this.privateSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupIntraSubnets ?? false) {
      if (!this.intraSubnetIds) {
        this.intraSubnetIds = StringParameter.valueFromLookup(this, this.intraSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupRedshiftSubnets ?? false) {
      if (!this.redshiftSubnetIds) {
        this.redshiftSubnetIds = StringParameter.valueFromLookup(this, this.redshiftSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupDatabaseSubnets ?? false) {
      if (!this.databaseSubnetIds) {
        this.databaseSubnetIds = StringParameter.valueFromLookup(this, this.databaseSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupElasticacheSubnets ?? false) {
      if (!this.elasticacheSubnetIds) {
        this.elasticacheSubnetIds = StringParameter.valueFromLookup(this, this.elasticacheSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupOutpostSubnets ?? false) {
      if (!this.outpostSubnetIds) {
        this.outpostSubnetIds = StringParameter.valueFromLookup(this, this.outpostSubnetsParameterPath).split(",");
      }
    }
    if (props.lookupPublicAlbs ?? false) {
      if (!this.publicAlbArns) {
        this.publicAlbArns = StringParameter.valueFromLookup(this, this.publicAlbsParameterPath).split(",");
      }
    }
    if (props.lookupPrivateAlbs ?? false) {
      if (!this.privateAlbArns) {
        this.privateAlbArns = StringParameter.valueFromLookup(this, this.privateAlbsParameterPaths).split(",");
      }
    }
    new TrueMarkTags(this, {
      suppress: props.suppressTagging
    }).addAutomationComponentTags();
  }
}
