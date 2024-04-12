import {Construct} from 'constructs';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';
import {ICertificate} from 'aws-cdk-lib/aws-certificatemanager';
import {IHostedZone} from 'aws-cdk-lib/aws-route53';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';
import * as aoss from 'aws-cdk-lib/aws-opensearchserverless';

/**
 * Properties for OpensearchServerlessConstruct
 */
export interface ServerlessOpensearchCollectionProps
  extends ExtendedConstructProps {
  /**
   * The name to be used for the OpenSearch Serverless collection.
   */
  collectionName: string;

  /**
   * The type of collection.
   * @default - SEARCH
   */
  type?: CollectionType;

  /**
   * Optional custom domain configuration for the OpenSearch Serverless collection.
   */
  customEndpoint?: {
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
      name: props.collectionName,
      type: props.type || CollectionType.SEARCH,
    });

    if (props.accessPolicies) {
      const accessPolicies = props.accessPolicies;
    }

    if (props.networkPolicies) {
      const networkPolicy = props.networkPolicies;
    }

    if (props.encryptionPolicy) {
      const encryptionPolicy = props.encryptionPolicy;
      collection.addDependency(encryptionPolicy);
    }
  }
}
