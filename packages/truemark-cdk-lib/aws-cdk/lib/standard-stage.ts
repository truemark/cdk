import {Stage, StageProps} from "aws-cdk-lib";
import {StandardApp} from "./standard-app";
import {
  AutomationTagsProps,
  CostCenterTagsProps,
  SecurityTagsProps,
  StandardTagsOptions,
  TeamTagsProps
} from "./standard-tags";

/**
 * Properties for StandardStage.
 */
export interface StandardStageProps extends StageProps, StandardTagsOptions {

}

/**
 * Adds support for tags.
 */
export class StandardStage extends Stage {

  private readonly app: StandardApp;
  readonly automationTags?: AutomationTagsProps;
  readonly costCenterTags?: CostCenterTagsProps;
  readonly securityTags?: SecurityTagsProps;
  readonly teamTags?: TeamTagsProps;
  readonly suppressTags?: boolean;

  constructor(scope: StandardApp, id: string, props: StandardStageProps) {
    super(scope, id, props);
    this.app = scope;
    this.automationTags = props.automationTags ?? scope.automationTags;
    this.costCenterTags = props.costCenterTags ?? scope.costCenterTags;
    this.securityTags = props.securityTags ?? scope.securityTags;
    this.teamTags = props.teamTags ?? scope.teamTags;
    this.suppressTags = props.suppressTags ?? scope.suppressTags;
  }
}
