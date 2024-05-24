import {
  AllowedMethods,
  BehaviorOptions,
  CachedMethods,
  CachePolicy,
  Distribution,
  DistributionProps,
  EdgeLambda,
  FunctionAssociation,
  FunctionEventType,
  ICachePolicy,
  IFunction,
  IKeyGroup,
  IOrigin,
  IOriginRequestPolicy,
  IResponseHeadersPolicy,
  OriginRequestPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import {RedirectFunction, RedirectFunctionProps} from './redirect-function';
import {OriginGroup} from 'aws-cdk-lib/aws-cloudfront-origins';
import {DistributionBuilder} from './distribution-builder';
import {IBucket} from 'aws-cdk-lib/aws-s3';
import {CloudFrontBucket} from '../../aws-s3';
import {StandardApiCachePolicy} from './standard-api-cache-policy';
import {StandardApiOriginRequestPolicy} from './standard-api-origin-request-policy';
import {ExtendedConstruct} from '../../aws-cdk';
import {StringHelper} from '../../helpers';
import {DomainName} from '../../aws-route53';
function pathToIdentifier(path: string): string {
  return StringHelper.toPascalCase(
    path.replace(/\*/g, 'wildcard').replace(/\//g, '-')
  );
}

export const ALL_FALLBACK_STATUS_CODES = [
  400, 403, 404, 405, 500, 502, 503, 504,
];
export const DEFAULT_FALLBACK_STATUS_CODES = [500, 502, 503, 504];

export class BehaviorBuilder extends ExtendedConstruct {
  readonly path: string | undefined;
  protected options: BehaviorOptions;
  protected scope: DistributionBuilder;

  constructor(
    scope: DistributionBuilder,
    origin: IOrigin,
    path: string | undefined
  ) {
    super(
      scope,
      (path === undefined || path === '' ? 'Default' : pathToIdentifier(path)) +
        'Behavior'
    );
    this.path = path;
    scope.addBehavior(this, path);
    this.scope = scope;
    this.options = {
      origin,
    };
  }

  fallbackOrigin(
    fallbackOrigin?: IOrigin,
    fallbackStatusCodes?: number[]
  ): BehaviorBuilder {
    if (fallbackOrigin) {
      const originGroup = new OriginGroup({
        primaryOrigin: this.options.origin,
        fallbackOrigin,
        fallbackStatusCodes:
          fallbackStatusCodes ?? DEFAULT_FALLBACK_STATUS_CODES,
      });
      this.options = {
        ...this.options,
        origin: originGroup,
      };
    }
    return this;
  }

  allowedMethods(allowedMethods?: AllowedMethods): BehaviorBuilder {
    this.options = {
      ...this.options,
      allowedMethods,
    };
    return this;
  }

  cachedMethods(cachedMethods?: CachedMethods): BehaviorBuilder {
    this.options = {
      ...this.options,
      cachedMethods,
    };
    return this;
  }

  cachePolicy(cachePolicy: ICachePolicy): BehaviorBuilder {
    this.options = {
      ...this.options,
      cachePolicy,
    };
    return this;
  }

  compress(compress?: boolean): BehaviorBuilder {
    this.options = {
      ...this.options,
      compress,
    };
    return this;
  }

  originRequestPolicy(
    originRequestPolicy?: IOriginRequestPolicy
  ): BehaviorBuilder {
    this.options = {
      ...this.options,
      originRequestPolicy,
    };
    return this;
  }

  responseHeadersPolicy(
    responseHeadersPolicy?: IResponseHeadersPolicy
  ): BehaviorBuilder {
    this.options = {
      ...this.options,
      responseHeadersPolicy,
    };
    return this;
  }

  smoothStreaming(smoothStreaming?: boolean): BehaviorBuilder {
    this.options = {
      ...this.options,
      smoothStreaming,
    };
    return this;
  }

  viewerProtocolPolicy(
    viewerProtocolPolicy?: ViewerProtocolPolicy
  ): BehaviorBuilder {
    this.options = {
      ...this.options,
      viewerProtocolPolicy,
    };
    return this;
  }

  functionAssociations(
    functionAssociations?: FunctionAssociation[]
  ): BehaviorBuilder {
    this.options = {
      ...this.options,
      functionAssociations,
    };
    return this;
  }

  viewerRequestFunction(viewerRequestFunction: IFunction): BehaviorBuilder {
    const functionAssociations: FunctionAssociation[] =
      this.options.functionAssociations ?? [];
    functionAssociations.push({
      function: viewerRequestFunction,
      eventType: FunctionEventType.VIEWER_REQUEST,
    });
    this.options = {
      ...this.options,
      functionAssociations,
    };
    return this;
  }

  redirectFunction(props: RedirectFunctionProps): BehaviorBuilder {
    const redirectFunction = new RedirectFunction(
      this,
      'RedirectFunction',
      props
    );
    this.viewerRequestFunction(redirectFunction);
    return this;
  }

  viewerResponseFunction(viewerResponseFunction: IFunction): BehaviorBuilder {
    const functionAssociations: FunctionAssociation[] =
      this.options.functionAssociations ?? [];
    functionAssociations.push({
      function: viewerResponseFunction,
      eventType: FunctionEventType.VIEWER_RESPONSE,
    });
    this.options = {
      ...this.options,
      functionAssociations,
    };
    return this;
  }

  edgeLambdas(edgeLambdas?: EdgeLambda[]): BehaviorBuilder {
    this.options = {
      ...this.options,
      edgeLambdas,
    };
    return this;
  }

  trustedKeyGroups(trustedKeyGroups?: IKeyGroup[]): BehaviorBuilder {
    this.options = {
      ...this.options,
      trustedKeyGroups,
    };
    return this;
  }

  s3Defaults(): BehaviorBuilder {
    return this.originRequestPolicy(OriginRequestPolicy.CORS_S3_ORIGIN);
  }

  apiDefaults(additionalHeaders?: string[]): BehaviorBuilder {
    const cachePolicy = new StandardApiCachePolicy(
      this,
      'ApiCachePolicy',
      additionalHeaders
    );
    const originRequestPolicy = new StandardApiOriginRequestPolicy(
      this,
      'ApiOriginRequestPolicy',
      additionalHeaders
    );
    return this.allowedMethods(AllowedMethods.ALLOW_ALL)
      .cachePolicy(cachePolicy)
      .originRequestPolicy(originRequestPolicy);
  }

  buildBehavior(): BehaviorOptions {
    if (this.options.viewerProtocolPolicy === undefined) {
      this.viewerProtocolPolicy(ViewerProtocolPolicy.REDIRECT_TO_HTTPS);
    }

    if (this.options.allowedMethods === undefined) {
      this.allowedMethods(AllowedMethods.ALLOW_GET_HEAD_OPTIONS);
    }

    if (this.options.cachedMethods === undefined) {
      this.cachedMethods(CachedMethods.CACHE_GET_HEAD_OPTIONS);
    }

    if (this.options.cachePolicy === undefined) {
      this.cachePolicy(CachePolicy.CACHING_OPTIMIZED);
    }

    if (this.options.originRequestPolicy === undefined) {
      this.originRequestPolicy(OriginRequestPolicy.ALL_VIEWER);
    }

    if (this.options.compress === undefined) {
      this.compress(true);
    }

    return this.options;
  }

  build(): DistributionProps {
    return this.scope.build();
  }

  behavior(origin: IOrigin, path: string): BehaviorBuilder {
    return this.scope.behavior(origin, path);
  }

  behaviorFromBucket(bucket: IBucket, path: string): BehaviorBuilder {
    return this.scope.behaviorFromBucket(bucket, path);
  }

  behaviorFromCloudFromBucket(
    bucket: CloudFrontBucket,
    path: string
  ): BehaviorBuilder {
    return this.scope.behaviorFromCloudFromBucket(bucket, path);
  }

  behaviorFromDomainName(
    domainName: string | DomainName,
    path: string
  ): BehaviorBuilder {
    return this.scope.behaviorFromDomainName(domainName, path);
  }

  toDistribution(): Distribution {
    return this.scope.toDistribution();
  }
}
