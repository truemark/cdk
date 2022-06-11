import {Construct} from "constructs";
import {IBucket} from "aws-cdk-lib/aws-s3";
import {
  FunctionCode,
  OriginAccessIdentity,
  Function,
  Distribution,
  ViewerProtocolPolicy, FunctionEventType, HttpVersion, SecurityPolicyProtocol, PriceClass
} from "aws-cdk-lib/aws-cloudfront";
import {OriginGroup, S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {ARecord, HostedZone, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";
import {BucketDeployment, CacheControl, Source} from "aws-cdk-lib/aws-s3-deployment";
import {BundlingOptions, Duration} from "aws-cdk-lib";
import {DockerImage} from "aws-cdk-lib";
import {StandardBucket} from "../../aws-s3";

export enum SourceType {
  Custom = "Custom",
  Hugo = "Hugo",
  NpmDist = "NpmDist",
  Static = "Static"
}

export class DomainName {
  readonly prefix: string;
  readonly zone: string | IHostedZone;
  readonly createRecord?: boolean;

  constructor(prefix: string, zone: string | IHostedZone, createRecord?: boolean) {
    this.prefix = prefix;
    this.zone = zone;
    this.createRecord = createRecord
  }

  toString() {
    return (this.prefix == '' ? '' : this.prefix + '.') + this.zone;
  }

  toIdentifier() {
    return this.toString().replace('.', '-');
  }
}

export interface WebsiteProps {

  /**
   * Bucket to use to store website content. If one is not provided, one will be generated.
   */
  readonly bucket?: IBucket;

  /**
   * Bucket to use if the primary bucket fails. If one is not provided a fallback is not setup.
   */
  readonly fallbackBucket?: IBucket;

  /**
   * The ARN to the ACM Certificate to use on the CloudFront distribution. If one is not
   * provided and domainNames is populated, one will be generated.
   */
  readonly certificateArn?: string

  /**
   * The domain names to be serviced. The first domain name in the list is treated as the apex domain.
   */
  readonly domainNames?: DomainName[]

  /**
   * Redirect traffic to the first domain in the list of domainNames.
   *
   * @default true
   */
  readonly redirectToApexDomain?: boolean;

  /**
   * Price class for the CloudFront distribution.
   *
   * @default PriceClass.PRICE_CLASS_100
   */
  readonly priceClass?: PriceClass

  /**
   * Minimum protocol version to allow.
   *
   * @default SecurityPolicyProtocol.TLS_V1_2_2021,
   */
  readonly minimumProtocolVersion?: SecurityPolicyProtocol;

  /**
   * Minimum HTTP version to allow.
   *
   * @default HttpVersion.HTTP1_1
   */
  readonly httpVersion?: HttpVersion;

  /**
   * Cache-control max age.
   *
   * @default Duration.minutes(60)
   */
  readonly maxAge?: Duration;

  /**
   * The source type of the website.
   *
   * @default SourceType.Static
   */
  readonly sourceType?: SourceType;

  /**
   * The directory where the website sources are located.
   */
  readonly sourceDirectory: string;

  /**
   * Custom bundling options to use to bundle website sources. The sourceType
   * must be set to SourceType.Custom.
   */
  readonly sourceBundlingOptions?: BundlingOptions
}

export class Website extends Construct {

  /**
   * The default bundling options for SourceType.Hugo.
   */
  static readonly HUGO_BUNDLING_OPTIONS: BundlingOptions = {
    image: DockerImage.fromRegistry("klakegg/hugo:latest-ext"),
    command: [
      '-d', '/asset-output'
    ]
  }

  /**
   * The default bundling options for SourceType.NpmDist. It's expected that "npm run dist" command
   * will place files in ${CDK_BUNDLING_OUTPUT_DIR}. Example: "ng build --output-path=/asset-output"
   */
  static readonly NPM_DIST_BUNDLING_OPTIONS: BundlingOptions = {
    image: DockerImage.fromRegistry("node:16-alpine"),
    command: [
      // TODO Figure out how to cache .npmcache
      'sh', '-c', [
        'mkdir -p .npmcache',
        'npm ci --cache .npmcache --prefer-offline',
        'npm run dist'
      ].join(' && ')
    ]
  }

  readonly bucket: IBucket;
  readonly fallbackBucket?: IBucket;
  readonly originAccessIdentity: OriginAccessIdentity;
  readonly apexDomain: string;
  readonly viewerRequestFunction: Function;
  readonly distribution: Distribution;
  readonly distributionUrl: string;
  readonly aRecords: ARecord[];
  readonly deployment: BucketDeployment;
  readonly fallbackDeployment?: BucketDeployment;

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    this.bucket = props.bucket??new StandardBucket(this, 'Bucket');
    this.fallbackBucket = props.fallbackBucket;

    this.originAccessIdentity = new OriginAccessIdentity(this, 'Access');
    this.bucket.grantRead(this.originAccessIdentity);
    if (this.fallbackBucket) {
      this.fallbackBucket.grantRead(this.originAccessIdentity);
    }

    this.apexDomain = props?.domainNames?.[0].toString() || '';

    this.viewerRequestFunction = new Function(this, 'ViewerRequestFunction', {
      code: FunctionCode.fromInline(`
function handler(event) {
  var host = event.request.headers.host.value;
  var uri = event.request.uri;
  var matchApex = MATCH_APEX;
  if (matchApex && host !== 'APEX_DOMAIN') {
    return {
      statusCode: 301,
      statusDescription: 'Permanently moved',
      headers: {
        "location": { "value": "https://APEX_DOMAIN" + uri }
      }
    }
  }
  if (uri.endsWith('/')) {
    event.request.uri = uri + 'index.html';
  }
  return event.request;
}`
        .replace(/APEX_DOMAIN/g, this.apexDomain)
        .replace(/MATCH_APEX/g, this.apexDomain !== '' && (props.redirectToApexDomain??true) ? 'true' : 'false'))
    });

    const bucketOrigin = new S3Origin(this.bucket, {
      originAccessIdentity: this.originAccessIdentity
    });

    const fallbackBucketOrigin = this.fallbackBucket === undefined ? undefined : new S3Origin(this.fallbackBucket, {
      originAccessIdentity: this.originAccessIdentity
    });

    const defaultOrigin = fallbackBucketOrigin === undefined ? bucketOrigin : new OriginGroup({
      primaryOrigin: bucketOrigin,
      fallbackOrigin: fallbackBucketOrigin
    });

    this.distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: defaultOrigin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: this.viewerRequestFunction,
            eventType: FunctionEventType.VIEWER_REQUEST
          }
        ]
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html'
        }
      ],
      httpVersion: props.httpVersion??HttpVersion.HTTP1_1,
      minimumProtocolVersion: props.minimumProtocolVersion??SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultRootObject: "index.html",
      certificate: props?.certificateArn == undefined ? undefined : Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      domainNames: props?.domainNames?.map((domainName) => domainName.toString()),
      enableIpv6: true,
      priceClass: props.priceClass??PriceClass.PRICE_CLASS_100
    });

    this.distributionUrl = `https://${(this.apexDomain != '' ? this.apexDomain : this.distribution.distributionDomainName)}`

    this.aRecords = [];

    if (props?.domainNames != undefined && props.domainNames.length > 0) {
      for (let domainName of props.domainNames) {
        if (domainName.createRecord??true) {
          let zone = typeof domainName.zone !== "string" ? domainName.zone : HostedZone.fromLookup(this, 'zone-' + domainName.toIdentifier(), {
            domainName: domainName.zone
          });
          this.aRecords.push(new ARecord(this, domainName.toIdentifier(), {
            zone: zone,
            recordName: domainName.toString(),
            target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution))
          }));
        }
      }
    }

    let bundlingOptions: BundlingOptions | undefined = undefined

    if (props.sourceType === SourceType.Custom) {
      if (!props.sourceBundlingOptions) {
        throw new Error("sourceBundlingOptions is required if source type is Custom");
      }
      bundlingOptions = props.sourceBundlingOptions
    }

    if (props.sourceType === SourceType.Static) {
      if (props.sourceBundlingOptions) {
        throw new Error("Cannot use sourceBundlingOptions with source type Static");
      }
    }

    if (props.sourceType === SourceType.Hugo) {
      bundlingOptions = Website.HUGO_BUNDLING_OPTIONS
      if (props.sourceBundlingOptions) {
        throw new Error("Cannot use sourceBundlingOptions with source type Hugo");
      }
    } else if (props.sourceType === SourceType.NpmDist) {
      bundlingOptions = Website.NPM_DIST_BUNDLING_OPTIONS
      if (props.sourceBundlingOptions) {
        throw new Error("Cannot use sourceBundlingOptions with source type NpmDist");
      }
    }

    const source = Source.asset(props.sourceDirectory, {
      bundling: bundlingOptions
    });

    this.deployment = new BucketDeployment(this, "Assets", {
      sources: [source],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      cacheControl: [CacheControl.maxAge(props.maxAge??Duration.minutes(60))],
      prune: false
    });

    if (this.fallbackBucket) {
      this.fallbackDeployment = new BucketDeployment(this, "FallbackAssets", {
        sources: [source],
        destinationBucket: this.fallbackBucket,
        cacheControl: [CacheControl.maxAge(props.maxAge??Duration.minutes(60))],
        prune: false
      })
    }
  }
}
