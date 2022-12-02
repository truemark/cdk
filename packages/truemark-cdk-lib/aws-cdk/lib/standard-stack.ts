import {ExtendedStack, ExtendedStackProps} from "./extended-stack";
import {StandardApp} from "./standard-app";
import {StandardStage} from "./standard-stage";
import {StandardEnvironment} from "./standard-environment";
import {CDK_NPMJS_URL, CDK_VENDOR, StringHelper} from "../../helpers";
import {
  AutomationTagsProps,
  CostCenterTagsProps,
  SecurityTagsProps,
  StandardTags,
  StandardTagsOptions,
  TeamTagsProps
} from "./standard-tags";
import {Construct} from "constructs";

/**
 * Properties for StandardStack.
 */
export interface StandardStackProps extends ExtendedStackProps, StandardTagsOptions {

}

/**
 * Adds support for tags and environment names.
 */
export class StandardStack extends ExtendedStack {

  readonly automationTags?: AutomationTagsProps;
  readonly costCenterTags?: CostCenterTagsProps;
  readonly securityTags?: SecurityTagsProps;
  readonly teamTags?: TeamTagsProps;
  readonly suppressTags?: boolean;

  constructor(scope: Construct, id: string, props: StandardStackProps) {
    super(scope, id, props);

    const standardScope: StandardApp | StandardStage | StandardStack | undefined =
      scope instanceof StandardApp || scope instanceof StandardStage || scope instanceof StandardStack
        ? scope : undefined;

    this.automationTags = props.automationTags ?? standardScope?.automationTags;
    this.costCenterTags = props.costCenterTags ?? standardScope?.costCenterTags;
    this.securityTags = props.securityTags ?? standardScope?.securityTags;
    this.teamTags = props.teamTags ?? standardScope?.teamTags;
    this.suppressTags = props.suppressTags ?? standardScope?.suppressTags;

    new StandardTags(this, {suppress: props.suppressTags})
      .addAutomationComponentTags({
        url: CDK_NPMJS_URL,
        vendor: CDK_VENDOR,
        includeResourceTypes: ["AWS::CloudFormation::Stack"]
      })
      .addAutomationTags(props.automationTags)
      .addCostCenterTags(props.costCenterTags)
      .addSecurityTags(props.securityTags)
      .addTeamTags(props.teamTags);
  }
}
