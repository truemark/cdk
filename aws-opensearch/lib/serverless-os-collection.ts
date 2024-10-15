import {Construct} from 'constructs';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager';
import {IHostedZone} from 'aws-cdk-lib/aws-route53';
import * as aoss from 'aws-cdk-lib/aws-opensearchserverless';

/**
 * Properties for OpensearchServerlessConstruct
 */
export interface ServerlessOpensearchCollectionProps
  extends ExtendedConstructProps {
  /**
   * The name to be used for the OpenSearch Serverless collection.
   */
  readonly name: string;

  /**
   * The description to be used for the OpenSearch Serverless collection.
   */
  readonly description?: string;

  /**
   * The type of collection.
   * @default - SEARCH
   */
  readonly type?: CollectionType;

  /**
   * Optional custom domain configuration for the OpenSearch Serverless collection.
   */
  readonly customEndpoint?: {
    domainName: string;
    certificate?: ICertificate;
    hostedZone?: IHostedZone;
  };

  /**
   * Creates a data access policy for OpenSearch Serverless. Access policies limit access to collections and the resources within them, and allow a user to
   * access that data irrespective of the access mechanism or network source.
   *
   * @default - No access policies are set by default.
   */
  readonly accessPolicies?: aoss.CfnAccessPolicy;

  /**
   * Network policies specify access to a collection and its OpenSearch Dashboards endpoint from public networks or specific VPC endpoints.
   *
   * @default - No network policies are configured by default, which may restrict all external access depending on the environment.
   */
  readonly networkPolicies?: aoss.CfnSecurityPolicy;

  /**
   * Encryption policies specify a KMS encryption key to assign to particular collections.
   * This setting enables encryption for the collection using an AWS-managed key,
   * ensuring data is encrypted at rest.
   *
   * @default - Encryption is enabled with AWS-managed keys if not specified.
   */
  readonly encryptionPolicy?: aoss.CfnSecurityPolicy;

  /**
   * Specifies a security configuration for OpenSearch Serverless. For more information, see [SAML authentication for Amazon OpenSearch Serverless](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-saml.html) .
   *
   * @default - No security config will be added.
   */
  readonly securityConfig?: aoss.CfnSecurityConfig;

  /**
   * Creates a lifecyle policy to be applied to OpenSearch Serverless indexes.
   *
   * @default - Encryption is enabled with AWS-managed keys if not specified.
   */
  readonly lifeCyclePolicies?: aoss.CfnLifecyclePolicy;

  /**
   * Creates an OpenSearch Serverless-managed interface VPC endpoint.
   *
   * @default - Collection will be public.
   */
  readonly vpcEndpoint?: aoss.CfnVpcEndpoint;
}

/**
 * Defines the types of collections available.
 * @enum {string}
 */
export enum CollectionType {
  /**
   * Search collection type
   */
  SEARCH = 'SEARCH',
  /**
   * Timeseries collection type
   */
  TIMESERIES = 'TIMESERIES',
  /**
   * Vectorsearch collection type
   */
  VECTORSEARCH = 'VECTORSEARCH',
}
export class ServerlessOsCollection extends ExtendedConstruct {
  /**
   * Creates a new ServerlessOsCollection.
   * @param scope The parent construct.
   * @param id The construct ID.
   * @param props The collection properties.
   */
  constructor(
    scope: Construct,
    id: string,
    props: ServerlessOpensearchCollectionProps
  ) {
    super(scope, id, {
      standardTags: StandardTags.merge(props.standardTags, LibStandardTags),
    });

    const collection = new aoss.CfnCollection(this, 'OpensearchCollection', {
      name: props.name,
      type: props.type || CollectionType.SEARCH,
      description: props.description,
    });

    if (props.encryptionPolicy) {
      const encryptionPolicy = props.encryptionPolicy;
      collection.addDependency(encryptionPolicy);
    }

    if (props.accessPolicies) {
      const accessPolicies = props.accessPolicies;
      accessPolicies.addDependency(collection);
    }

    if (props.networkPolicies) {
      const networkPolicy = props.networkPolicies;
      networkPolicy.addDependency(collection);
    }

    if (props.securityConfig) {
      const securityConfig = props.securityConfig;
      securityConfig.addDependency(collection);
    }

    if (props.lifeCyclePolicies) {
      const lifeCyclePolicy = props.lifeCyclePolicies;
      lifeCyclePolicy.addDependency(collection);
    }

    if (props.vpcEndpoint) {
      const vpcEndpoint = props.vpcEndpoint;
      vpcEndpoint.addDependency(collection);
    }
  }
}
