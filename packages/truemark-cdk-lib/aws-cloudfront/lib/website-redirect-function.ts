import {Function, FunctionAssociation, FunctionCode, FunctionEventType} from "aws-cdk-lib/aws-cloudfront";
import {Construct} from "constructs";
import {DomainName} from "../../aws-route53";

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
  if ("INDEX_FILE" !== "" && uri.endsWith("/")) {
    event.request.uri = uri + "INDEX_FILE";
  }
  return event.request;
}`
        .replace(/APEX_DOMAIN/g, props.apexDomain?.toString() ?? "")
        .replace(/INDEX_FILE/g, props.indexFile ?? "index.html"))
    });
  }
}
