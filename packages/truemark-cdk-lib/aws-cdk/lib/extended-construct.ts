import {Construct} from "constructs";
import {StandardTags, StandardTagsProps} from "./standard-tags";

/**
 * Props for ExtendedConstruct.
 */
export interface ExtendedConstructProps {
  /**
   * Sets standard tags for this Construct. Values set here will override those set on the parent scope.
   */
  readonly standardTags?: StandardTagsProps;
}

export class ExtendedConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: ExtendedConstructProps) {
    super(scope, id);

    // Setup standard tags
    new StandardTags(this, props?.standardTags);
  }
}
