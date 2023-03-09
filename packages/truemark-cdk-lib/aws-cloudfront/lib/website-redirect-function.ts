import {Function, FunctionAssociation, FunctionCode, FunctionEventType} from "aws-cdk-lib/aws-cloudfront";
import {Construct} from "constructs";
import {DomainName} from "../../aws-route53";

export type Behavior = "None" | "ForwardToIndex" | "RedirectToIndex";

export interface WebsiteRedirectFunctionProps {

  /**
   * Optional domain to redirect to if the host header does not match.
   */
  readonly apexDomain?: string | DomainName;

  /**
   * The default file to request when the URI ends with a '/'. Set to en empty string to disable.
   *
   * @default "index.html"
   */
  readonly indexFile?: string;

  /**
   * Sets the behavior of paths with trailing slashes. Default is "ForwardToIndex".
   *
   * @default "ForwardToIndex"
   */
  readonly trailingSlashBehavior?: Behavior;

  /**
   * Sets the behavior of paths with no file extension. Default is "None"
   *
   * @default "None"
   */
  readonly noFileExtensionBehavior?: Behavior;
}

export class WebsiteRedirectFunction extends Function {

  constructor(scope: Construct, id: string, props: WebsiteRedirectFunctionProps) {
    super(scope, id, {
      code: FunctionCode.fromInline(`
function handler(event) {
  var host = event.request.headers.host.value;
  var uri = event.request.uri;
  if ("APEX_DOMAIN" !== "" && host !== "APEX_DOMAIN") {
    return {
      statusCode: 301,
      statusDescription: "Permanently moved",
      headers: {
        "location": { "value": "https://APEX_DOMAIN" + uri }
      }
    }
  }
  if ("INDEX_FILE" !== "" && "NO_FILE_EXTENSION_BEHAVIOR" !== "None" && uri.split("/").pop().split(".") <= 1) {
    if ("NO_FILE_EXTENSION_BEHAVIOR" === "ForwardToIndex") {
      event.request.uri = uri + "/INDEX_FILE";
    } else {
      return {
        statusCode: 301,
        statusDescription: "Permanently moved",
        headers: {
          "location": { "value": "uri + "/INDEX_FILE" }
        }
      }
    }
  }
  if ("INDEX_FILE" !== "" && "TRAILING_SLASH_BEHAVIOR" !== "None" && (uri.endsWith("/") || ) {
    if ("TRAILING_SLASH_BEHAVIOR" === "ForwardToIndex") {
      event.request.uri = uri + "INDEX_FILE";
    } else {
      return {
        statusCode: 301,
        statusDescription: "Permanently moved",
        headers: {
          "location": { "value": "uri + "INDEX_FILE" }
        }
      }
    }
  }
  return event.request;
}`
        .replace(/APEX_DOMAIN/g, props.apexDomain?.toString() ?? "")
        .replace(/INDEX_FILE/g, props.indexFile ?? "index.html")
        .replace(/NO_FILE_EXTENSION_BEHAVIOR/g, props.noFileExtensionBehavior ?? "None")
        .replace(/TRAILING_SLASH_BEHAVIOR/g, props.trailingSlashBehavior ?? "ForwardToIndex"))
    });
  }
}
