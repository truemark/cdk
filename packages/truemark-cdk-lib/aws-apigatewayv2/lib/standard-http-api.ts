import {Construct} from "constructs";
import {DomainName, LatencyARecord, WeightedARecord} from "../../aws-route53";
import {StandardDomainName} from "./standard-domain-name";
import {HttpApi, SecurityPolicy} from "@aws-cdk/aws-apigatewayv2-alpha";
import {Stack, Stage} from "aws-cdk-lib";
import {ARecord} from "aws-cdk-lib/aws-route53";
import {IAutomationComponent, InternalAutomationComponentTags} from "../../aws-cdk";

/**
 * Properties for StandardHttpApi.
 */
export interface StandardHttpApiProps {

  /**
   * The prefix of the domain to create the certificate and DNS record for.
   */
  readonly domainPrefix: string;

  /**
   * The zone of the domain to create the certificate and DNS record for.
   */
  readonly domainZone: string;

  /**
   * Name of the API Gateway. One will be generated if not provided.
   */
  readonly apiName?: string;

  /**
   * Determines if a route53 record is created for the API gateway. Defaults to true.
   *
   * @default - true
   */
  readonly createRecord?: boolean;

  /**
   * Creates a weighted route53 record. May not be used with recordLatency.
   */
  readonly recordWeight?: number;

  /**
   * Creates a latency route53 record. May not be used with recordWeight.
   */
  readonly recordLatency?: boolean;

  /**
   * Evaluates target health on the created route53 record if it's a latency or weighted record. Defaults to true.
   *
   * @default - true
   */
  readonly evaluateTargetHealth?: boolean;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Abstraction that creates an HttpApi with support infrastructure.
 */
export class StandardHttpApi extends Construct implements IAutomationComponent {

  readonly automationComponentTags = InternalAutomationComponentTags;

  readonly domainName: StandardDomainName;
  readonly record: ARecord | LatencyARecord | WeightedARecord | undefined;
  readonly httpApi: HttpApi;

  constructor(scope: Construct, id: string, props: StandardHttpApiProps) {
    super(scope, id);

    const domainName = new StandardDomainName(this, "DomainName", {
      prefix: props.domainPrefix,
      zone: props.domainZone,
      securityPolicy: SecurityPolicy.TLS_1_2 // TODO Should be an option
    });

    // TODO Need to add RecordOptions
    if (props.createRecord ?? true) {
      if (props.recordWeight) {
        domainName.createWeightedARecord(props.recordWeight, props.evaluateTargetHealth ?? true)
      } else if (props.recordLatency) {
        domainName.createLatencyARecord(true)
      } else {
        domainName.createARecord()
      }
    } else {
      this.record = undefined;
    }

    const stage = Stage.of(this);
    const stack = Stack.of(this);

    const httpApi = new HttpApi(this, "Default", {
      apiName: props.apiName ?? `${stage?.stageName}${stack?.stackName}Gateway`,
      defaultDomainMapping: {
        domainName: domainName.gatewayDomainName
      }
    });

    this.domainName = domainName;
    this.httpApi = httpApi;
  }
}
