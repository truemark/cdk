import {Construct} from 'constructs';
import {
  StandardTags,
  ExtendedConstruct,
  ExtendedConstructProps,
} from '../../aws-cdk';
import {LibStandardTags} from '../../truemark';

/**
 * Properties for creating a Serverless Opensearch Collection.
 */
export interface ServerlessOpensearchCollectionProps
  extends ExtendedConstructProps {
  /**
   * The OS collection name.
   */
  readonly collectionName: string;
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
  }
}
