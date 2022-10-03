import {
  BehaviorOptions,
  Distribution,
  DistributionProps,
  ErrorResponse,
  GeoRestriction,
  HttpVersion,
  IOrigin,
  PriceClass,
  SecurityPolicyProtocol,
  SSLMethod,
} from "aws-cdk-lib/aws-cloudfront";
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {IBucket} from "aws-cdk-lib/aws-s3";
import {Construct} from "constructs";
import {BehaviorBuilder, WebsiteDefaultsProps} from "./behavior-builder";
import {DomainName} from "../../aws-route53";

export interface WebsiteRedirectFunctionOptions {

  /**
   * Identifier to use when creating the CloudFront Function.
   *
   * @default "RedirectFunction"
   */
  readonly id?: string;

  /**
   * Optional domain to redirect to if the host header does not match.
   */
  readonly apexDomain?: string;

  /**
   * The default file to request when the URI ends with a '/'. Set to en empty string to disable.
   *
   * @default "index.html"
   */
  readonly indexFile?: string;
}

export class DistributionBuilder {

  protected props: DistributionProps;
  protected defaultBehaviorBuilder: BehaviorBuilder;
  protected additionalBehaviorBuilders: Record<string, BehaviorBuilder>;

  constructor(defaultBehaviorBuilder: BehaviorBuilder) {
    this.props = {
      defaultBehavior: defaultBehaviorBuilder.build()
    }
    this.defaultBehaviorBuilder = defaultBehaviorBuilder;
    this.additionalBehaviorBuilders = {}
  }

  defaultBehavior(): BehaviorBuilder {
    return this.defaultBehaviorBuilder;
  }

  additionalBehaviors(additionalBehaviors?: Record<string, BehaviorOptions>): DistributionBuilder {
    this.props = {
      ...this.props,
      additionalBehaviors
    };
    return this;
  }

  additionalBehavior(pattern: string, origin: IOrigin): BehaviorBuilder {
    const behaviorBuilder = BehaviorBuilder.fromOrigin(origin);
    this.additionalBehaviorBuilders[pattern] = behaviorBuilder;
    return behaviorBuilder
  }

  certificate(certificate?: Certificate): DistributionBuilder {
    this.props = {
      ...this.props,
      certificate
    };
    return this;
  }

  comment(comment?: string): DistributionBuilder {
    this.props = {
      ...this.props,
      comment
    };
    return this;
  }

  defaultRootObject(defaultRootObject?: string): DistributionBuilder {
    this.props = {
      ...this.props,
      defaultRootObject
    };
    return this;
  }

  domainNames(domainNames?: string[]): DistributionBuilder {
    this.props = {
      ...this.props,
      domainNames
    };
    return this;
  }

  domainName(domainName: string | DomainName): DistributionBuilder {
    const domainNames: string[] = this.props.domainNames ?? [];
    domainNames.push(domainName.toString());
    this.props = {
      ...this.props,
      domainNames
    };
    return this;
  }

  enabled(enabled?: boolean): DistributionBuilder {
    this.props = {
      ...this.props,
      enabled
    };
    return this;
  }

  enableIpv6(enableIpv6?: boolean): DistributionBuilder {
    this.props = {
      ...this.props,
      enableIpv6
    };
    return this;
  }

  enableLogging(enableLogging?: boolean): DistributionBuilder {
    this.props = {
      ...this.props,
      enableLogging
    };
    return this;
  }

  geoRestriction(geoRestriction?: GeoRestriction): DistributionBuilder {
    this.props = {
      ...this.props,
      geoRestriction
    };
    return this;
  }

  httpVersion(httpVersion?: HttpVersion): DistributionBuilder {
    this.props = {
      ...this.props,
      httpVersion
    };
    return this;
  }

  logBucket(logBucket?: IBucket): DistributionBuilder {
    this.props = {
      ...this.props,
      logBucket
    };
    return this;
  }

  logIncludesCookies(logIncludesCookies?: boolean): DistributionBuilder {
    this.props = {
      ...this.props,
      logIncludesCookies
    };
    return this;
  }

  logFilePrefix(logFilePrefix?: string): DistributionBuilder {
    this.props = {
      ...this.props,
      logFilePrefix
    };
    return this;
  }

  priceClass(priceClass?: PriceClass): DistributionBuilder {
    this.props = {
      ...this.props,
      priceClass
    };
    return this;
  }

  webAclId(webAclId?: string): DistributionBuilder {
    this.props = {
      ...this.props,
      webAclId
    };
    return this;
  }

  errorResponses(errorResponses?: ErrorResponse[]): DistributionBuilder {
    this.props = {
      ...this.props,
      errorResponses
    };
    return this;
  }

  errorResponse(errorResponse: ErrorResponse): DistributionBuilder {
    const errorResponses: ErrorResponse[] = this.props.errorResponses ?? [];
    errorResponses.push(errorResponse);
    this.props = {
      ...this.props,
      errorResponses
    };
    return this;
  }

  minimumProtocolVersion(minimumProtocolVersion?: SecurityPolicyProtocol): DistributionBuilder {
    this.props = {
      ...this.props,
      minimumProtocolVersion
    };
    return this;
  }

  sslSupportMethod(sslSupportMethod?: SSLMethod): DistributionBuilder {
    this.props = {
      ...this.props,
      sslSupportMethod
    };
    return this;
  }

  defaults(): DistributionBuilder {
    this.defaultBehavior().defaults()
    return this
      .httpVersion(HttpVersion.HTTP2_AND_3)
      .minimumProtocolVersion(SecurityPolicyProtocol.TLS_V1_2_2021)
      .enableIpv6(true)
      .priceClass(PriceClass.PRICE_CLASS_100)
  }

  websiteDefaults(props: WebsiteDefaultsProps) {
    this.defaultBehavior().websiteDefaults(props)
    return this
      .httpVersion(HttpVersion.HTTP2_AND_3)
      .minimumProtocolVersion(SecurityPolicyProtocol.TLS_V1_2_2021)
      .enableIpv6(true)
      .priceClass(PriceClass.PRICE_CLASS_100)
      .errorResponse({
        httpStatus: 404,
        responseHttpStatus: 404,
        responsePagePath: "/404.html"
      });
  }

  build(): DistributionProps {

    const additionalBehaviors: Record<string, BehaviorOptions> = {}
    for (const [pattern, behaviorBuilder] of Object.entries(this.additionalBehaviorBuilders)) {
      additionalBehaviors[pattern] = behaviorBuilder.build();
    }

    return {
      ...this.props,
      defaultBehavior: this.defaultBehaviorBuilder.build(),
      additionalBehaviors: {
        ...this.props.additionalBehaviors,
        ...additionalBehaviors
      }
    }
  }

  toDistribution(scope: Construct, id: string): Distribution {
    return new Distribution(scope, id, this.build());
  }

  static fromOrigin(origin: IOrigin): DistributionBuilder {
    const defaultBehaviorBuilder = BehaviorBuilder.fromOrigin(origin);
    return new DistributionBuilder(defaultBehaviorBuilder);
  }
}
