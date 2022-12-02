import {Stage, StageProps} from "aws-cdk-lib";
import {
  AutomationTagsProps,
  CostCenterTagsProps,
  SecurityTagsProps,
  StandardTagsOptions,
  TeamTagsProps
} from "./standard-tags";
import {Construct} from "constructs";
import {StandardApp} from "./standard-app";
import {StandardStack} from "./standard-stack";

/**
 * Properties for StandardStage.
 */
export interface StandardStageProps extends StageProps, StandardTagsOptions {

}

/**
 * Extends Stage adding support for things like standard tagging.
 */
export class StandardStage extends Stage {

  readonly automationTags?: AutomationTagsProps;
  readonly costCenterTags?: CostCenterTagsProps;
  readonly securityTags?: SecurityTagsProps;
  readonly teamTags?: TeamTagsProps;
  readonly suppressTags?: boolean;

  constructor(scope: Construct, id: string, props?: StandardStageProps) {
    super(scope, id, props);

    const standardScope: StandardApp | StandardStage | StandardStack | undefined =
      scope instanceof StandardApp || scope instanceof StandardStage || scope instanceof StandardStack
        ? scope : undefined;

    this.automationTags = props?.automationTags ?? standardScope?.automationTags;
    this.costCenterTags = props?.costCenterTags ?? standardScope?.costCenterTags;
    this.securityTags = props?.securityTags ?? standardScope?.securityTags;
    this.teamTags = props?.teamTags ?? standardScope?.teamTags;
    this.suppressTags = props?.suppressTags ?? standardScope?.suppressTags;
  }
}
