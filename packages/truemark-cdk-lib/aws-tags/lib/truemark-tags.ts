import {Construct} from "constructs";
import {Tags} from "aws-cdk-lib";

/**
 * Properties for automation component tags.
 */
export interface AutomationComponentTagsProps {

  /**
   * The ID of the component. If one is not provided, constructor.name is used.
   */
  readonly id?: string;

  /**
   * The URL of the component. If one is not provide, the default is "https://github.com/truemark/cdk".
   *
   * @default - "https://github.com/truemark/cdk"
   */
  readonly url?: string;

  /**
   * The vendor of the component. If one is not provided, "TrueMark" is used.
   */
  readonly vendor?: string;
}

/**
 * Properties for TrueMarkTags.
 */
export interface TrueMarkTagsProps {
  readonly suppress?: boolean;
}

/**
 * Provides convenience methods to tag resources following TrueMark's tagging strategy.
 */
export class TrueMarkTags {

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
   * Creates a new TrueMarkTags instance.
   *
   * @param scope the scope to tag
   * @param props the properties
   */
  constructor(scope: Construct, props?: TrueMarkTagsProps) {
    this.scope = scope;
    this.tags = Tags.of(scope);
    this.suppressed = props?.suppress ?? false;
  }

  /**
   * Adds automation component tags.
   *
   * @param props optional properties
   */
  addAutomationComponentTags(props?: AutomationComponentTagsProps): TrueMarkTags {
    if(!this.suppressed) {
      this.tags.add("truemark:automation:component-id", props?.id ?? this.scope.constructor.name);
      this.tags.add("truemark:automation:component-url", props?.url ?? "https://github.com/truemark/cdk");
      this.tags.add("truemark:automation:component-vendor", props?.vendor ?? "TrueMark");
    }
    return this;
  }
}
