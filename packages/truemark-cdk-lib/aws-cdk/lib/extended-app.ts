import {App, AppProps} from "aws-cdk-lib";
import {StandardTagsProps} from "./standard-tags";

/**
 * Properties for ExtendedApp.
 */
export interface ExtendedAppProps extends AppProps {

  readonly standardTags?: StandardTagsProps;
}

/**
 * Adds functionality to the base App class to support standard tags
 * and access to the account and region being used to execute the
 * CDK process.
 */
export class ExtendedApp extends App {

  readonly account: string;
  readonly region: string;

  constructor(props?: ExtendedAppProps) {
    super(props);

    const account = process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID;
    if (account === undefined) {
      throw new Error("Unable to identify default account");
    }
    this.account = account;
    const region = process.env.CDK_DEFAULT_REGION || process.env.AWS_DEFAULT_REGION;
    if (region === undefined) {
      throw new Error("Unable to identify default region");
    }
    this.region = region;

    this.node.setContext("standardTags", props?.standardTags);
  }
}

