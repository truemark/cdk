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

/**
 * Properties for StandardStack.
 */
export interface StandardStackProps extends ExtendedStackProps, StandardTagsOptions {

  /**
   * Environment the stack will be deployed to.
   */
  readonly env: StandardEnvironment;
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

  constructor(scope: StandardApp | StandardStage, stackName: string, props: StandardStackProps) {

    if (!StringHelper.isPascalCase(stackName)) {
      throw new Error("stackName must be PascalCase");
    }
    super(scope, `${stackName}${StringHelper.toPascalCase(props.env.name)}`, props);
    this.automationTags = props.automationTags ?? scope.automationTags;
    this.costCenterTags = props.costCenterTags ?? scope.costCenterTags;
    this.securityTags = props.securityTags ?? scope.securityTags;
    this.teamTags = props.teamTags ?? scope.teamTags;
    this.suppressTags = props.suppressTags ?? scope.suppressTags;

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
