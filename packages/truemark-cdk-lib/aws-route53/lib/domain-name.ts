import {ARecord, HostedZone, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {Construct} from "constructs";
import {WeightedARecord} from "./weighted-a-record";
import {LatencyARecord} from "./latency-a-record";
import {WeightedLatencyARecord} from "./weighted-latency-a-record";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import * as apigatewayv2 from "@aws-cdk/aws-apigatewayv2-alpha"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import {EndpointType, MTLSConfig, SecurityPolicy} from "@aws-cdk/aws-apigatewayv2-alpha/lib/common/domain-name";
import {IRestApi} from "aws-cdk-lib/aws-apigateway/lib/restapi";

/**
 * Properties for DomainName
 */
export interface DomainNameProps {
  readonly prefix?: string;
  readonly zone: string | IHostedZone;
  readonly privateZone?: boolean;
  readonly vpcId?: string;
}

/**
 * ACM certificate options
 */
export interface CertificateOptions {

  /**
   * The identifier to use.
   *
   * @default ${this.toIdentifier()}-cert
   */
  readonly id?: string;

  /**
   * Alternative domain names on the certificate.
   */
  readonly subjectAlternativeNames?: string[];
}

/**
 * Options for a V2 API gateway domain name.
 */
export interface ApiGatewayV2DomainNameOptions {

  /**
   * The identifier to use.
   *
   * @default ${this.toIdentifier()}-apigwv2
   */
  readonly id?: string;

  /**
   * The type of endpoint for this DomainName.
   *
   * @default EndpointType.REGIONAL
   */
  readonly endpointType?: EndpointType;

  /**
   * The Transport Layer Security (TLS) version + cipher suite for this domain name.
   *
   * @default SecurityPolicy.TLS_1_2
   */
  readonly securityPolicy?: SecurityPolicy;

  /**
   * The mutual TLS authentication configuration for a custom domain name.
   *
   * @default - mTLS is not configured.
   */
  readonly mtls?: MTLSConfig;
}

/**
 * Options for an API gateway domain name
 */
export interface ApiGatewayDomainNameOptions {

  /**
   * The identifier to use.
   *
   * @default ${this.toIdentifier()}-apigw
   */
  readonly id?: string;

  /**
   * If specified, all requests to this domain will be mapped to the production
   * deployment of this API. If you wish to map this domain to multiple APIs
   * with different base paths, don't specify this option and use
   * `addBasePathMapping`.
   *
   * @default - you will have to call `addBasePathMapping` to map this domain to
   * API endpoints.
   */
  readonly mapping?: IRestApi;

  /**
   * The type of endpoint for this DomainName.
   *
   * @default REGIONAL
   */
  readonly endpointType?: EndpointType;

  /**
   * The Transport Layer Security (TLS) version + cipher suite for this domain name.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-domainname.html
   * @default SecurityPolicy.TLS_1_0
   */
  readonly securityPolicy?: SecurityPolicy;

  /**
   * The base path name that callers of the API must provide in the URL after
   * the domain name (e.g. `example.com/base-path`). If you specify this
   * property, it can't be an empty string.
   *
   * @default - map requests from the domain root (e.g. `example.com`). If this
   * is undefined, no additional mappings will be allowed on this domain name.
   */
  readonly basePath?: string;

  /**
   * The mutual TLS authentication configuration for a custom domain name.
   *
   * @default - mTLS is not configured.
   */
  readonly mtls?: MTLSConfig;
}

/**
 * Utility class for holding domain name information and
 * doing useful things with it.
 */
export class DomainName {

  protected readonly prefix: string;
  protected readonly zone: string;
  protected hostedZone?: IHostedZone;
  protected readonly privateZone: boolean;
  protected readonly vpcId?: string;

  /**
   * Creates a new DomainName.
   *
   * @param props the properties of the domain name
   */
  constructor(props: DomainNameProps) {
    this.prefix = props.prefix ?? "";
    if (typeof props.zone === "string") {
      this.zone = props.zone;
    } else {
      this.hostedZone = props.zone;
      this.zone = this.hostedZone.zoneName;
    }
    this.privateZone = props.privateZone ?? false;
    this.vpcId = props.vpcId;
  }

  /**
   * Returns the prefix for this domain name.
   */
  getPrefix(): string {
    return this.prefix;
  }

  /**
   * Returns true if the zone is private. False if otherwise.
   */
  inPrivateZone(): boolean {
    return this.privateZone;
  }

  /**
   * Returns the vpc ID for this zone or undefined if one does not exist
   */
  getVpcId(): string | undefined {
    return this.vpcId;
  }

  /**
   * Returns true if the props match the domain name. False if otherwise.
   *
   * @param props the props to compare
   */
  propsMatch(props: DomainNameProps): boolean {
    let propZoneStr = typeof props.zone === "string" ? props.zone : props.zone.zoneName;
    return this.prefix === (props.prefix ?? "")
      && this.zone === propZoneStr
      && this.privateZone === (props.privateZone ?? false)
      && this.vpcId === props.vpcId
  }

  /**
   * Returns the string version of this domain name.
   */
  toString(): string {
    return (this.prefix == "" ? "" : this.prefix + ".") + this.zone;
  }

  /**
   * Returns a friendly identifier for this domain name.
   */
  toIdentifier(): string {
    return this.toString().replace(".", "-");
  }

  /**
   * Returns the zone associated with this domain name.
   */
  getZone(): string {
    return this.zone;
  }

  /**
   * Returns the route53 hosted zone associated with this domain name.
   * This method is safe to call repeatedly, the lookup will only be done once.
   *
   * @param scope the scope to use if a lookup is required
   * @param id an optional ID if a lookup is required; one is generated if not provided
   */
  getHostedZone(scope: Construct, id?: string) : IHostedZone {
    if (this.hostedZone === undefined) {
      this.hostedZone = HostedZone.fromLookup(scope, id ?? `${this.toIdentifier()}-zone`, {
        domainName: this.zone,
        privateZone: this.privateZone,
        vpcId: this.vpcId
      });
    }
    return this.hostedZone;
  }

  /**
   * Creates a Route53 ARecord for this domain name.
   *
   * @param scope the scope to create the record in
   * @param target the target of the record
   */
  createARecord(scope: Construct, target: RecordTarget): ARecord {
    return new ARecord(scope, `${this.toIdentifier()}-arecord`, {
      zone: this.getHostedZone(scope),
      recordName: this.toString(),
      target
    });
  }

  /**
   * Creates a weighted Route53 record for this domain name.
   *
   * @param scope the scope to create the record in
   * @param target the target of the record
   * @param weight the initial weight; defaults to 0
   */
  createWeightedARecord(scope: Construct, target: RecordTarget, weight?: number): WeightedARecord {
    return new WeightedARecord(scope, `${this.toIdentifier()}-arecord`, {
      zone: this.getHostedZone(scope),
      recordName: this.toString(),
      target,
      weight
    });
  }

  /**
   * Creates a latency Route53 record for this domain name.
   *
   * @param scope the scope to create the record in
   * @param target the target of the record
   */
  createLatencyARecord(scope: Construct, target: RecordTarget): LatencyARecord {
    return new LatencyARecord(scope, `${this.toIdentifier()}-arecord`, {
      zone: this.getHostedZone(scope),
      recordName: this.toString(),
      target
    });
  }

  /**
   * Creates a weighted latency Route53 record for this domain name.
   *
   * @param scope the scope to create the record in
   * @param target the target of the record
   * @param weight the initial weight; defaults to 0
   */
  createWeightedLatencyARecord(scope: Construct, target: RecordTarget, weight?: number): WeightedLatencyARecord {
    return new WeightedLatencyARecord(scope, `${this.toIdentifier()}-arecord`, {
      zone: this.getHostedZone(scope),
      recordName: this.toString(),
      target,
      weight
    });
  }

  /**
   * Creates an ACM certificate for the domain name.
   *
   * @param scope the scope to create the record in
   * @param opts additional options
   */
  createCertificate(scope: Construct, opts?: CertificateOptions): Certificate {
    return new Certificate(scope, opts?.id ?? `${this.toIdentifier()}-cert`, {
      domainName: this.toString(),
      validation: CertificateValidation.fromDns(this.getHostedZone(scope)),
      subjectAlternativeNames: opts?.subjectAlternativeNames
    });
  }

  /**
   * Creates an API Gateway V2 domain name.
   *
   * @param scope the scope to create the domain name in
   * @param certificate the certificate to use on the domain name
   * @param opts additional options
   */
  createApiGatewayV2DomainName(scope: Construct, certificate: Certificate, opts?: ApiGatewayV2DomainNameOptions): apigatewayv2.DomainName {
    return new apigatewayv2.DomainName(scope, opts?.id ?? `${this.toIdentifier()}-apigwv2`, {
      domainName: this.toString(),
      certificate,
      ...opts
    });
  }

  /**
   * Creates an API Gateway domain name.
   *
   * @param scope the scope to create the domain name in
   * @param certificate the certificate to use on the domain name
   * @param opts additional options
   */
  createApiGatewayDomainName(scope: Construct, certificate: Certificate, opts?: ApiGatewayDomainNameOptions): apigateway.DomainName {
    return new apigateway.DomainName(scope, opts?.id ?? `${this.toIdentifier()}-apigw`, {
      domainName: this.toString(),
      certificate,
      ...opts
    });
  }

  /**
   * Converts an array of DomainNameProps to DomainName. This function will return an empty array
   * if domainNameProps is undefined.
   *
   * @param domainNameProps the DomainNameProps objects to convert
   */
  static fromProps(domainNameProps?: DomainNameProps[]) : DomainName[] {
    return domainNameProps === undefined ? [] : domainNameProps.map(p => new DomainName(p));
  }

  /**
   * Converts an array of DomainName objects to an array of strings. This function will return an
   * empty array if domainNames is undefined.
   *
   * @param domainNames the DomainName objects to convert
   */
  static toStrings(domainNames?: DomainName[]) : string[] {
    return domainNames === undefined ? [] : domainNames.map(d => d.toString());
  }

  /**
   * Converts an array of DomainNameProps to an array of strings. This function will
   * return an empty array if domainNameProps is undefined.
   *
   * @param domainNameProps the DomainNameProps objects to convert
   */
  static toStringsFromProps(domainNameProps?: DomainNameProps[]) : string[] {
    return domainNameProps === undefined ? [] : DomainName.toStrings(DomainName.fromProps(domainNameProps));
  }

  /**
   * Converts an array of DomainName objects to a map where the key is the domain name string and the value
   * is an IHostedZone. This method will return an empty map if domainNames is undefined. This function
   * is useful when used in conjunction with functions like CertificateValidation.fromDnsMultiZone.
   *
   * @param scope the scope used if a zone lookup is required
   * @param domainNames the DomainName objects to convert
   */
  static toZoneMap(scope: Construct, domainNames?: DomainName[]) : { [domainName: string]: IHostedZone } {
    const map: {[key: string]: IHostedZone} = {}
    if (domainNames !== undefined) {
      domainNames.forEach(d => {
        map[d.toString()] = d.getHostedZone(scope)
      });
    }
    return map;
  }

  /**
   * Converts an array of DomainNameProps objects to a map where the key is the domain name string and the
   * value is an IHostedZone. This method will return an empty map if domainNameProps is undefined. This
   * function is useful when used in conjunction with functions like CertificateValidation.fromDnsMultiZone.
   *
   * @param scope the scope used if a zone lookup is required
   * @param domainNameProps the DomainNameProps objects to convert
   */
  static toZoneMapFromProps(scope: Construct, domainNameProps: DomainNameProps[]) : { [domainName: string]: IHostedZone } {
    return DomainName.toZoneMap(scope, DomainName.fromProps(domainNameProps));
  }

  /**
   * Finds the domain name matching the given properties in an array of DomainName objects.
   *
   * @param props the properties to compare
   * @param domainNames the domain names to search
   * @return the matching domain name or undefined
   */
  static findDomainName(props: DomainNameProps, domainNames?: DomainName[]): DomainName | undefined {
    for (let domainName of domainNames ?? []) {
      if (domainName.propsMatch(props)) {
        return domainName;
      }
    }
    return undefined;
  }
}
