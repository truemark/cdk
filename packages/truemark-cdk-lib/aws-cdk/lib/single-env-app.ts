import {StandardApp, StandardAppProps} from "./standard-app";
import {StringHelper} from "../../helpers";

/**
 * Properties for SingleEnvApp
 */
export interface SingleEnvAppProps extends StandardAppProps {

  /**
   * The name of the property in the context where the environment name is stored.
   * Default is "env".
   *
   * @default - env
   */
  readonly environmentPropertyName?: string;
}

/**
 * Extension of StandardApp that supports a standard way to declare environment names.
 */
export class SingleEnvApp extends StandardApp {

  readonly environmentName: string;

  constructor(props?: SingleEnvAppProps) {
    super(props);
    const environmentPropertyName = props?.environmentPropertyName ?? "env";
    this.environmentName = this.node.tryGetContext(environmentPropertyName);
    if (!this.environmentName) {
      throw new Error(`Environment is missing. Please add \"-c ${environmentPropertyName}=<name>\" to your CDK command`);
    }
    if (!StringHelper.isLowerAlphanumeric(this.environmentName)) {
      throw new Error("Environment name must be lower case alpha numeric");
    }
  }

  /**
   * Returns the name of the environment.
   */
  getEnvironmentName(): string {
    return this.environmentName;
  }

  /**
   * Returns the name of the environment in title case.
   */
  getEnvironmentNameTitleCase(): string {
    return StringHelper.toPascalCase(this.environmentName);
  }
}
