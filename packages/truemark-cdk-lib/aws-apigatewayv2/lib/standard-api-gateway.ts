import {Construct} from "constructs";
import {DomainName, WeightedLatencyARecord} from "../../aws-route53";
import {StandardDomainName} from "./standard-domain-name";
import {HttpApi, SecurityPolicy} from "@aws-cdk/aws-apigatewayv2-alpha";
import {Stack, Stage} from "aws-cdk-lib";
import {StandardTags} from "../../aws-cdk";
import {CDK_NPMJS_URL, CDK_VENDOR} from "../../helpers";

export interface StandardApiGatewayProps {

  /**
   * The prefix of the domain to create the certificate and DNS record for.
   */
  readonly domainPrefix: string;

  /**
   * The zone of the domain to create the certificate and DNS record for.
   */
  readonly domainZone: string;

  /**
   * Setting this to false will change the weight of the DNS record created to 0. Default is true.
   *
   * @default - true
   */
  readonly enabled?: boolean;

  /**
   * Name of the API Gateway. One will be generated if not provided.
   */
  readonly apiName?: string;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Abstraction that creates an API Gateway with a custom domain name, certificate and latency based routing
 * record in Route53.
 */
export class StandardApiGateway extends Construct {

  readonly domainName: StandardDomainName;
  readonly record: WeightedLatencyARecord;
  readonly gateway: HttpApi;

  constructor(scope: Construct, id: string, props: StandardApiGatewayProps) {
    super(scope, id);

    const domainName = new StandardDomainName(this, "DomainName", {
      prefix: props.domainPrefix,
      zone: props.domainZone,
      securityPolicy: SecurityPolicy.TLS_1_2
    });
    const record = domainName.createWeightedLatencyARecord(props.enabled ?? true ? 1 : 0);

    const stage = Stage.of(this);
    const stack = Stack.of(this);

    const gateway = new HttpApi(this, "Default", {
      apiName: props.apiName ?? `${stage?.stageName}${stack?.stackName}Gateway`,
      defaultDomainMapping: {
        domainName: domainName.gatewayDomainName
      }
    });

    this.domainName = domainName;
    this.record = record;
    this.gateway = gateway;

    new StandardTags(this, {
      suppress: props?.suppressTagging
    }).addAutomationComponentTags({
      url: CDK_NPMJS_URL,
      vendor: CDK_VENDOR
    });
  }
}
