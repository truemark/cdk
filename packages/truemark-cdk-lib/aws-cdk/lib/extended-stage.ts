import {Stage, StageProps} from "aws-cdk-lib";
import {StandardTags, StandardTagsProps} from "./standard-tags";
import {Construct} from "constructs";

export interface ExtendedStageOptions {
  readonly standardTags?: StandardTagsProps;
}

export interface ExtendedStageProps extends StageProps, ExtendedStageOptions {}

export class ExtendedStage extends Stage {

  constructor(scope: Construct, id: string, props?: ExtendedStageProps) {
    super(scope, id, props);

    // Setup standard tags
    new StandardTags(this, props?.standardTags);
  }
}
