import {Environment} from "aws-cdk-lib";

/**
 * Adds a name to the environment properties used by StandardStack.
 */
export interface StandardEnvironment extends Environment {

  /**
   * Name of the environment.
   */
  readonly name: string;

}
