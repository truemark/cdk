import {App, AppProps, Environment} from "aws-cdk-lib";
import {
  AutomationTagsProps,
  CostCenterTagsProps,
  SecurityTagsProps, StandardTagsOptions,
  TeamTagsProps
} from "./standard-tags";
import {StringHelper} from "../../helpers";

/**
 * Properties for StandardApp
 */
export interface StandardAppProps extends AppProps, StandardTagsOptions {

}

/**
 * Extends App providing support for tags and a standard for environment names.
 */
export class StandardApp extends App {

  readonly environmentName: string;
  readonly automationTags?: AutomationTagsProps;
  readonly costCenterTags?: CostCenterTagsProps;
  readonly securityTags?: SecurityTagsProps;
  readonly teamTags?: TeamTagsProps;
  readonly suppressTags?: boolean;

  constructor(props?: StandardAppProps) {
    super(props);
    this.automationTags = props?.automationTags;
    this.costCenterTags = props?.costCenterTags;
    this.securityTags = props?.securityTags;
    this.teamTags = props?.teamTags;
    this.suppressTags = props?.suppressTags;
  }
}
