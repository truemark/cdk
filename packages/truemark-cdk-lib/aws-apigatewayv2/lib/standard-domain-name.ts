import {Construct} from "constructs";
import * as tmroute53 from "../../aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import {ICertificate} from "aws-cdk-lib/aws-certificatemanager";
import {DomainName, SecurityPolicy} from "@aws-cdk/aws-apigatewayv2-alpha";
import {ARecord, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CDK_NPMJS_URL, CDK_VENDOR} from "../../helpers";
import {StandardTags} from "../../aws-cdk";
import {ExtendedRecordTarget} from "../../aws-route53";

export interface StandardDomainNameProps extends tmroute53.DomainNameProps {

  /**
   * The optional ACM certificate for this domain name.
   *
   * @default - one is generated
   */
  readonly certificate?: ICertificate;

  /**
   * The Transport Layer Security (TLS) version + cipher suite for this domain name.
   *
   * @default - SecurityPolicy.TLS_1_2
   */
  readonly securityPolicy?: SecurityPolicy;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Standard construct used to create an API Gateway V2 Domain Name.
 */
export class StandardDomainName extends Construct {

  readonly domainName: tmroute53.DomainName;
  readonly certificate: ICertificate;
  readonly gatewayDomainName: DomainName;

  constructor(scope: Construct, id: string, props: StandardDomainNameProps) {
    super(scope, id);
    this.domainName = new tmroute53.DomainName(props);
    this.certificate = props.certificate ?? this.domainName.createCertificate(scope);
    this.gatewayDomainName = new DomainName(this, "Default", {
      domainName: this.domainName.toString(),
      certificate: this.certificate,
      securityPolicy: props.securityPolicy
    });

    new StandardTags(this, {
      suppress: props?.suppressTagging
    }).addAutomationComponentTags({
      url: CDK_NPMJS_URL,
      vendor: CDK_VENDOR
    });
  }

  toRecordTarget(evaluateTargetHealth?: boolean): RecordTarget {
    const domainProperties = new targets.ApiGatewayv2DomainProperties(
      this.gatewayDomainName.regionalDomainName, this.gatewayDomainName.regionalHostedZoneId);
    return evaluateTargetHealth
      ? ExtendedRecordTarget.fromAlias(domainProperties, evaluateTargetHealth)
      : RecordTarget.fromAlias(domainProperties);
  }

  /**
   * Creates a route53 ARecord pointing to this domain name.
   */
  createARecord(evaluateTargetHealth?: boolean): ARecord {
    return this.domainName.createARecord(this, this.toRecordTarget(evaluateTargetHealth ?? true));
  }

  /**
   * Creates a route53 weighted record pointing to this domain name.
   *
   * @param weight the initial weight; defaults to 0
   * @param evaluateTargetHealth Determines if route53 evaluates the target's health. Defaults to true.
   */
  createWeightedARecord(weight?: number, evaluateTargetHealth?: boolean): ARecord {
    return this.domainName.createWeightedARecord(this, this.toRecordTarget(evaluateTargetHealth ?? true), weight);
  }

  /**
   * Creates a route53 latency record pointing to this domain name.
   *
   * @param evaluateTargetHealth Determines if route53 evaluates the target's health. Defaults to true.
   */
  createLatencyARecord(evaluateTargetHealth?: boolean): ARecord {
    return this.domainName.createLatencyARecord(this, this.toRecordTarget(evaluateTargetHealth ?? true));
  }

  /**
   * Returns the FQDN of this domain name.
   */
  toString(): string {
    return this.domainName.toString();
  }
}
