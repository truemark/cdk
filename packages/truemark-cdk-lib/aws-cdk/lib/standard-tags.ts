import {Construct, IConstruct} from "constructs";
import {IAspect, Stack, TagProps, Tags} from "aws-cdk-lib";

/**
 * Properties for automation component tags.
 */
export interface AutomationComponentTagsProps extends TagProps {

  /**
   * The ID of the component. Default is scope.constructor.name.
   *
   * @default scope.constructor.name
   */
  readonly id: string;

  /**
   * The URL of the component.
   */
  readonly url?: string;

  /**
   * The vendor of the component.
   */
  readonly vendor?: string;
}

/**
 * Properties for automation tags.
 */
export interface AutomationTagsProps extends TagProps {

  /**
   * The ID of the stack. If one if not provided, the name of the stack is used.
   *
   * @default - Stack.of(this).stackName
   */
  readonly id: string;

  /**
   * The URL to where the automation is stored or published. This field is required
   * when applying automation tags.
   */
  readonly url?: string;
}

/**
 * Properties for cost center tags.
 */
export interface CostCenterTagsProps extends TagProps {

  /**
   * Name of the business unit responsible for the costs associated with the tagged resources.
   */
  readonly businessUnitName: string;

  /**
   * Identifier for the business unit responsible for the costs associated with the tagged resources.
   * If not set, the tag is not created.
   */
  readonly businessUnitId?: string;

  /**
   * Name of the project responsible for creating the costs.
   */
  readonly projectName: string;

  /**
   * Identifier for the project responsible for creating the costs.
   * If not set, the tag is not created.
   */
  readonly projectId?: string;

  /**
   * Name of the environment incurring the costs. Example "stage" or "prod"
   * If not set, the tag is not created.
   */
  readonly environment?: string;

  /**
   * Name of the contact responsible for costs associated with the tagged resources.
   * If not set, the tag is not created.
   */
  readonly contactName?: string;

  /**
   * Email of the contact responsible for the costs associated with the tagged resources.
   * If not set, the tag is not created.
   */
  readonly contactEmail?: string;

  /**
   * Phone number of the contact responsible for costs associated with the tagged resources.
   * If not set, the tag is not created.
   */
  readonly contactPhone?: string;
}

/**
 * Holds values that may be applied to the data-classification security tag.
 */
export enum DataClassification {
  /**
   * Used when data may not leave the geographic region in which it is stored.
   * This is usually related to government restrictions applied to the data.
   */
  ExportRestricted = "export-restricted",

  /**
   * Used when unauthorized disclosure, alteration or destruction of data would
   * result in a significant risk to the organization. This includes PII, PHI
   * and PCI data.
   */
  Restricted = "restricted",

  /**
   * Used when unauthorized disclosure, alteration or destruction of the data would
   * result in moderate risk. This includes all data that is not in one of the other
   * classifications.
   */
  Controlled = "controlled",

  /**
   * Used when handled or stored data readily available to the public.
   */
  Public = "public"
}

/**
 * Holds values that may be applied to the data-sensitivity security tag.
 */
export enum DataSensitivity {

  /**
   * Used when resources are in PCI scope.
   */
  PCI = "pci",

  /**
   * Used when resources handle or store personally identifiable information.
   */
  PII = "pii",

  /**
   * Used when resources handle or store personal health information and are
   * subject to HIPPA rules.
   */
  PHI = "phi"
}

/**
 * Properties for security tags.
 */
export interface SecurityTagsProps extends TagProps {

  /**
   * Data classification value. See the TrueMark AWS tagging strategy documentation.
   */
  readonly dataClassification: DataClassification;

  /**
   * Data sensitivity. See the TrueMark AWS tagging strategy documentation.
   */
  readonly dataSensitivity?: DataSensitivity;
}

/**
 * Properties for team tags.
 */
export interface TeamTagsProps extends TagProps {

  /**
   * Name of the team.
   */
  readonly name: string;

  /**
   * Identifier if different than the team name.
   */
  readonly id?: string;

  /**
   * Name of the team lead.
   */
  readonly contactName?: string;

  /**
   * Email of the team lead.
   */
  readonly contactEmail?: string;

  /**
   * Phone number for the team lead.
   */
  readonly contactPhone?: string;

  /**
   * Business unit the team belongs to.
   */
  readonly businessUnit?: string;

  /**
   * Department the team belongs to.
   */
  readonly department?: string;
}

/**
 * Contains standard tagging properties.
 */
export interface StandardTagsProps {

  /**
   * Automation component tags.
   */
  readonly automationComponentTags?: AutomationComponentTagsProps;

  /**
   * Automation tags to apply to created resources.
   */
  readonly automationTags?: AutomationTagsProps;

  /**
   * Cost center tags to apply to created resources.
   */
  readonly costCenterTags?: CostCenterTagsProps;

  /**
   * Security tags to apply to created resources.
   */
  readonly securityTags?: SecurityTagsProps;

  /**
   * Team tags to apply to created resources.
   */
  readonly teamTags?: TeamTagsProps;

  /**
   * Setting this to true will suppress the creation of tags this resource creates.
   * Default value is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Provides convenience methods to tag resources following TrueMark's tagging strategy.
 */
export class StandardTags {

  /**
   * The scope being tagged.
   */
  readonly scope: Construct;

  /**
   * The tags.
   */
  readonly tags: Tags;

  /**
   * If tags were suppressed.
   */
  readonly suppressed: boolean;

  /**
   * Creates a new StandardTags instance.
   *
   * @param scope the scope to tag
   * @param props the properties
   */
  constructor(scope: Construct, props?: StandardTagsProps) {
    this.scope = scope;
    this.tags = Tags.of(scope);
    this.suppressed = props?.suppressTagging ?? false;

    this.addAutomationComponentTags(props?.automationComponentTags);
    this.addAutomationTags(props?.automationTags);
    this.addCostCenterTags(props?.costCenterTags);
    this.addSecurityTags(props?.securityTags);
    this.addTeamTags(props?.teamTags);
  }

  /**
   * Adds automation component tags. These are meant to be used in individual constructs to identify
   * what resources were stood up by specific constructs.
   *
   * @param props optional properties for the tags
   */
  addAutomationComponentTags(props?: AutomationComponentTagsProps): StandardTags {
    if (props && !this.suppressed) {
      if (props.id === "{{TMCDK}}") {
        this.tags.add("automation:component-id", this.scope.constructor.name, props);
        this.tags.add("automation:component-url", "https://github.com/truemark/cdk", props);
        this.tags.add("automation:component-vendor", "TrueMark", props);
      } else {
        if (props.id) {
          this.tags.add("automation:component-id", props.id, props);
        }
        if (props.url) {
          this.tags.add("automation:component-url", props.url, props);
        }
        if (props.vendor) {
          this.tags.add("automation:component-vendor", props.vendor, props);
        }
      }
    }
    return this;
  }

  /**
   * Adds automation tags.
   *
   * @param props properties for the tags
   */
  addAutomationTags(props?: AutomationTagsProps): StandardTags {
    if (!this.suppressed) {
      let id: string | undefined = props?.id
      if (!id) {
        id = Stack.of(this.scope).stackName
      }
      this.tags.add("automation:id", id, props);
      if (props?.url) {
        this.tags.add("automation:url", props.url, props);
      }
    }
    return this;
  }

  /**
   * Adds cost center tags.
   *
   * @param props properties for the tags
   */
  addCostCenterTags(props?: CostCenterTagsProps): StandardTags {
    if (props && !this.suppressed) {
      this.tags.add("cost-center:business-unit-name", props.businessUnitName, props);
      if (props.businessUnitId) {
        this.tags.add("cost-center:business-unit-id", props.businessUnitId, props);
      }
      this.tags.add("cost-center:project-name", props.projectName, props);
      if (props.projectId) {
        this.tags.add("cost-center:project-id", props.projectId, props);
      }
      if (props.environment) {
        this.tags.add("cost-center:environment", props.environment, props);
      }
      if (props.contactName) {
        this.tags.add("cost-center:contact-name", props.contactName, props);
      }
      if (props.contactEmail) {
        this.tags.add("cost-center:contact-email", props.contactEmail, props);
      }
      if (props.contactPhone) {
        this.tags.add("cost-center:contact-phone", props.contactPhone, props);
      }
    }
    return this;
  }

  /**
   * Adds security tags.
   *
   * @param props properties for security tags
   */
  addSecurityTags(props?: SecurityTagsProps): StandardTags {
    if (props && !this.suppressed) {
      this.tags.add("security:data-classification", props.dataClassification, props);
      if (props.dataSensitivity) {
        this.tags.add("security:data-sensitivity", props.dataSensitivity, props);
      }
    }
    return this;
  }

  /**
   * Adds team tags.
   *
   * @param props properties for team tags
   */
  addTeamTags(props?: TeamTagsProps): StandardTags {
    if (props && !this.suppressed) {
      this.tags.add("team:name", props.name, props);
      if (props.id) {
        this.tags.add("team:id", props.id, props);
      }
      if (props.contactName) {
        this.tags.add("team:contact-name", props.contactName, props);
      }
      if (props.contactEmail) {
        this.tags.add("team:contact-email", props.contactEmail, props);
      }
      if (props.contactPhone) {
        this.tags.add("team:contact-hone", props.contactPhone, props);
      }
      if (props.businessUnit) {
        this.tags.add("team:business-unit", props.businessUnit, props);
      }
      if (props.department) {
        this.tags.add("team:department", props.department, props);
      }
    }
    return this;
  }

  static merge(from?: StandardTagsProps, to?: StandardTagsProps): StandardTagsProps {
    let automationComponentTags: AutomationComponentTagsProps | undefined = undefined;
    if (from?.automationComponentTags || to?.automationComponentTags) {
      automationComponentTags = {
        id: to?.automationComponentTags?.id ?? from?.automationComponentTags?.id ?? "",
        ...from?.automationComponentTags,
        ...to?.automationComponentTags
      }
    }

    let automationTags: AutomationTagsProps | undefined = undefined;
    if (from?.automationTags || to?.automationTags) {
      automationTags = {
        id: to?.automationTags?.id ?? from?.automationTags?.id ?? "",
        ...from?.automationTags,
        ...to?.automationTags
      }
    }
    let costCenterTags: CostCenterTagsProps | undefined = undefined;
    if (from?.costCenterTags || to?.costCenterTags) {
      costCenterTags = {
        businessUnitName: to?.costCenterTags?.businessUnitName ?? from?.costCenterTags?.businessUnitName ?? "",
        projectName: to?.costCenterTags?.projectName ?? from?.costCenterTags?.projectName ?? "",
        ...from?.costCenterTags,
        ...to?.costCenterTags
      }
    }
    let securityTags: SecurityTagsProps | undefined = undefined;
    if (from?.securityTags || to?.securityTags) {
      securityTags = {
        dataClassification: to?.securityTags?.dataClassification ?? from?.securityTags?.dataClassification ?? DataClassification.Controlled,
        ...from?.securityTags,
        ...to?.securityTags
      }
    }
    let teamTags: TeamTagsProps | undefined = undefined;
    if (from?.teamTags || to?.teamTags) {
      teamTags = {
        name: to?.teamTags?.name ?? from?.teamTags?.name ?? "",
        ...from?.teamTags,
        ...to?.teamTags
      }
    }
    return {
      automationComponentTags,
      automationTags,
      costCenterTags,
      securityTags,
      teamTags
    }
  }
}

export interface IAutomationComponent {

  readonly automationComponentTags?: AutomationComponentTagsProps;

}

export const InternalAutomationComponentTags: AutomationComponentTagsProps = {
  id: "{{TMCDK}}"
}

export function isAutomationComponent(o: any): o is IAutomationComponent {
  return "automationComponentTags" in o;
}

export class AutomationComponentAspect implements IAspect {

  readonly suppressed: boolean;

  constructor(suppressTagging?: boolean) {
    this.suppressed = suppressTagging ?? false;
  }

  visit(node: IConstruct): void {
    if (isAutomationComponent(node) && !this.suppressed) {
      new StandardTags(node, { automationComponentTags: node.automationComponentTags })
    }
  }
}
