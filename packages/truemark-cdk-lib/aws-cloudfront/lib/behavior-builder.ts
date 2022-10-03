import {
  AllowedMethods,
  BehaviorOptions,
  CachedMethods, CachePolicy,
  EdgeLambda,
  FunctionAssociation,
  FunctionEventType,
  ICachePolicy,
  IFunction,
  IKeyGroup,
  IOrigin,
  IOriginRequestPolicy,
  IResponseHeadersPolicy, OriginRequestPolicy,
  ViewerProtocolPolicy
} from "aws-cdk-lib/aws-cloudfront";
import {Construct} from "constructs";
import {WebsiteRedirectFunction, WebsiteRedirectFunctionProps} from "./website-redirect-function";
import {OriginGroup} from "aws-cdk-lib/aws-cloudfront-origins";

export class BehaviorBuilder {

  protected options: BehaviorOptions;

  protected constructor(origin: IOrigin) {
    this.options = {
      origin
    }
  }

  fallbackOrigin(fallbackOrigin: IOrigin): BehaviorBuilder {
    const originGroup = new OriginGroup({
      primaryOrigin: this.options.origin,
      fallbackOrigin
    });
    this.options = {
      ...this.options,
      origin: originGroup
    }
    return this;
  }

  allowedMethods(allowedMethods?: AllowedMethods): BehaviorBuilder {
    this.options = {
      ...this.options,
      allowedMethods
    }
    return this;
  }

  cachedMethods(cachedMethods?: CachedMethods): BehaviorBuilder {
    this.options = {
      ...this.options,
      cachedMethods
    }
    return this;
  }

  cachePolicy(cachePolicy: ICachePolicy): BehaviorBuilder {
    this.options = {
      ...this.options,
      cachePolicy
    }
    return this;
  }

  compress(compress?: boolean): BehaviorBuilder {
    this.options = {
      ...this.options,
      compress
    }
    return this;
  }

  originRequestPolicy(originRequestPolicy?: IOriginRequestPolicy): BehaviorBuilder {
    this.options = {
      ...this.options,
      originRequestPolicy
    }
    return this;
  }

  responseHeadersPolicy(responseHeadersPolicy?: IResponseHeadersPolicy): BehaviorBuilder {
    this.options = {
      ...this.options,
      responseHeadersPolicy
    }
    return this;
  }

  smoothStreaming(smoothStreaming?: boolean): BehaviorBuilder {
    this.options = {
      ...this.options,
      smoothStreaming
    }
    return this;
  }

  viewerProtocolPolicy(viewerProtocolPolicy?: ViewerProtocolPolicy): BehaviorBuilder {
    this.options = {
      ...this.options,
      viewerProtocolPolicy
    }
    return this;
  }

  functionAssociations(functionAssociations?: FunctionAssociation[]): BehaviorBuilder {
    this.options = {
      ...this.options,
      functionAssociations
    }
    return this;
  }

  viewerRequestFunction(viewerRequestFunction: IFunction): BehaviorBuilder {
    const functionAssociations: FunctionAssociation[] = this.options.functionAssociations ?? [];
    functionAssociations.push({
      function: viewerRequestFunction,
      eventType: FunctionEventType.VIEWER_REQUEST
    });
    this.options = {
      ...this.options,
      functionAssociations
    }
    return this;
  }

  websiteRedirectFunction(scope: Construct, id: string, props: WebsiteRedirectFunctionProps): BehaviorBuilder {
    const websiteRedirectFunction = new WebsiteRedirectFunction(scope, id, props);
    this.viewerRequestFunction(websiteRedirectFunction);
    return this;
  }

  viewerResponseFunction(viewerResponseFunction: IFunction): BehaviorBuilder {
    const functionAssociations: FunctionAssociation[] = this.options.functionAssociations ?? [];
    functionAssociations.push({
      function: viewerResponseFunction,
      eventType: FunctionEventType.VIEWER_RESPONSE
    });
    this.options = {
      ...this.options,
      functionAssociations
    }
    return this;
  }

  edgeLambdas(edgeLambdas?: EdgeLambda[]): BehaviorBuilder {
    this.options = {
      ...this.options,
      edgeLambdas
    }
    return this;
  }

  trustedKeyGroups(trustedKeyGroups?: IKeyGroup[]): BehaviorBuilder {
    this.options = {
      ...this.options,
      trustedKeyGroups
    }
    return this;
  }

  defaults(): BehaviorBuilder {
    return this
      .viewerProtocolPolicy(ViewerProtocolPolicy.REDIRECT_TO_HTTPS)
      .compress(true)
      .allowedMethods(AllowedMethods.ALLOW_ALL)
      .cachedMethods(CachedMethods.CACHE_GET_HEAD_OPTIONS)
      .cachePolicy(CachePolicy.CACHING_OPTIMIZED)
      .originRequestPolicy(OriginRequestPolicy.ALL_VIEWER);
  }

  build(): BehaviorOptions {
    return this.options;
  }

  static fromOrigin(origin: IOrigin) {
    return new BehaviorBuilder(origin);
  }
}
