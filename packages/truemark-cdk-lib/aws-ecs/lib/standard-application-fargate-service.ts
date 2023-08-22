import {StandardFargateService, StandardFargateServiceProps} from "./standard-fargate-service";
import {Construct} from "constructs";
import {Duration} from "aws-cdk-lib";
import {
  ApplicationListener,
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ApplicationTargetGroup, IApplicationListener, IApplicationLoadBalancer, ListenerCondition,
  TargetGroupLoadBalancingAlgorithmType
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import {ARecord, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {DomainName} from "../../aws-route53";
import {LoadBalancerTarget} from "aws-cdk-lib/aws-route53-targets";

/**
 * Properties for StandardApplicationFargateService
 */
export interface StandardApplicationFargateServiceProps extends StandardFargateServiceProps {

  /**
   * The name of an application-based stickiness cookie.
   *
   * @default - lb_affinity
   */
  readonly stickinessCookieName?: string;

  /**
   * The stickiness cookie expiration period. Set to 0 to disable.
   *
   * @default - Duration.days(1)
   */
  readonly stickinessCookieDuration?: Duration;

  /**
   * The time period during which the load balancer sends a newly registered target a
   * linearly increasing share of the traffic to the target group. Set this to 0
   * to disable.
   *
   * @default - Duration.seconds(30)
   */
  readonly slowStart?: Duration;

  /**
   * The protocol used by the application in the container.
   *
   * @default - ApplicationProtocol.HTTP
   */
  readonly applicationProtocol?: ApplicationProtocol;

  /**
   * The amount of time for Elastic Load Balancing to wait before deregistering a target.
   *
   * @default - Duration.seconds(10)
   */
  readonly deregistrationDelay?: Duration;

  /**
   * The approximate number of seconds between health checks for an individual target.
   *
   * @default - Duration.seconds(10)
   */
  readonly healthCheckInterval?: Duration

  /**
   * The ping path destination where Elastic Load Balancing sends health check requests.
   *
   * @default - /health
   */
  readonly healthCheckPath?: string;

  /**
   * The amount of time, in seconds, during which no response from a target means a failed health check
   *
   * @default - Duration.seconds(3)
   */
  readonly healthCheckTimeout?: Duration;

  /**
   * The number of consecutive health checks successes required before considering an unhealthy target healthy.
   *
   * @default - 2
   */
  readonly healthyThresholdCount?: number;

  /**
   * The number of consecutive health check failures required before considering a target unhealthy.
   *
   * @default - 2
   */
  readonly unhealthyThresholdCount?: number;

  /**
   * HTTP code to use when checking for a successful response from a target
   *
   * @default - 200-299
   */
  readonly healthyHttpCodes?: string;

  /**
   * The load balancing algorithm to select targets for routing requests.
   * To set this to LEAST_OUTSTANDING_REQUESTS, stickiness must be disabled.
   *
   * @default - ROUND_ROBIN
   */
  readonly loadBalancingAlgorithmType?: TargetGroupLoadBalancingAlgorithmType;

  /**
   * The number of ALB requests to target for scaling.
   * Disabled by default.
   */
  readonly scaleRequestPerTarget?: number;

  /**
   * Domain name associated with this service.
   */
  readonly domainName?: string;

  /**
   * Additional domain names to associate with this service.
   */
  readonly domainNames?: string[];

  /**
   * Path pattern to match on the load balancer.
   *
   * @default - ["/*"]
   */
  readonly pathPattern?: string[];

  /**
   * Load balancer to attach this service to. If passed an ARN or name a lookup will be
   * performed to locate the load balancer.
   */
  readonly loadBalancer: IApplicationLoadBalancer | string;

  /**
   * The listener protocol to attach this service to.
   *
   * @default - ApplicationProtocol.HTTPS
   */
  readonly listenerProtocol?: ApplicationProtocol;

  /**
   * The priority to give the target group on the ALB.
   *
   * @default - 1
   */
  readonly targetGroupPriority?: number;

  /**
   * Zone of the domain name. If set, a route53 record is created for the service.
   */
  readonly domainZone?: IHostedZone;
}

/**
 * Domain name information associated with a service.
 */
export interface StandardApplicationFargateServiceDomain {
  readonly domainName: DomainName;
  readonly route53Record: ARecord;
}

/**
 * Creates an ECS Fargate service and maps it to an Application Load Balancer (ALB).
 */
export class StandardApplicationFargateService extends StandardFargateService {

  readonly loadBalancer: IApplicationLoadBalancer;
  readonly listener: IApplicationListener;
  readonly domainName?: DomainName;
  readonly route53Record?: ARecord;
  readonly domainRecords: Record<string, StandardApplicationFargateServiceDomain>;

  constructor(scope: Construct, id: string, props: StandardApplicationFargateServiceProps) {
    super(scope, id, props);

    let stickinessCookieDuration: Duration | undefined = props.stickinessCookieDuration ?? Duration.days(1);
    if (stickinessCookieDuration.toSeconds() === 0) {
      stickinessCookieDuration = undefined;
    }

    let stickinessCookieName: string | undefined;
    if (stickinessCookieDuration !== undefined) {
      stickinessCookieName = props.stickinessCookieName ?? "lb_affinity"
    }

    let slowStart: Duration | undefined = props.slowStart ?? Duration.seconds(30);
    if (slowStart.toSeconds() === 0) {
      slowStart = undefined;
    }

    const targetGroup = new ApplicationTargetGroup(this, "TargetGroup", {
      targets: [this.service],
      vpc: props.cluster.vpc,
      port: this.port,
      protocol: props.applicationProtocol ?? ApplicationProtocol.HTTP,
      deregistrationDelay: props.deregistrationDelay ?? Duration.seconds(10),
      slowStart,
      healthCheck: {
        enabled: true,
        interval: props.healthCheckInterval ?? Duration.seconds(10),
        path: props.healthCheckPath ?? "/health",
        timeout: props.healthCheckTimeout ?? Duration.seconds(3),
        healthyThresholdCount: props.healthyThresholdCount ?? 2,
        unhealthyThresholdCount: props.unhealthyThresholdCount ?? 2,
        healthyHttpCodes: props.healthyHttpCodes ?? "200-299"
      },
      stickinessCookieName,
      stickinessCookieDuration,
      loadBalancingAlgorithmType: props.loadBalancingAlgorithmType ?? TargetGroupLoadBalancingAlgorithmType.ROUND_ROBIN
    });

    if (props.scaleRequestPerTarget !== undefined) {
      this.scaling.scaleOnRequestCount("RequestCountScaling", {
        scaleInCooldown: this.scaleInCooldown,
        scaleOutCooldown: this.scaleOutCooldown,
        targetGroup,
        requestsPerTarget: props.scaleRequestPerTarget,
      });
    }

    const targetGroupConditions: ListenerCondition[] = [];
    targetGroupConditions.push(ListenerCondition.pathPatterns(props.pathPattern ?? ["/*"]));
    if (props.domainName !== undefined) {
      targetGroupConditions.push(ListenerCondition.hostHeaders([props.domainName, ...props.domainNames ?? []]));
    }

    let loadBalancer: IApplicationLoadBalancer;
    if (typeof props.loadBalancer === "string") {
      if (props.loadBalancer.startsWith("arn:")) {
        loadBalancer = ApplicationLoadBalancer.fromLookup(this, "LoadBalancer", {
          loadBalancerArn: props.loadBalancer
        });
      } else {
        loadBalancer = ApplicationLoadBalancer.fromLookup(this, "LoadBalancer", {
          loadBalancerTags: {
            Name: props.loadBalancer
          }
        });
      }
    } else {
      loadBalancer = props.loadBalancer;
    }

    const listener = ApplicationListener.fromLookup(this, "Listener", {
      loadBalancerArn: loadBalancer.loadBalancerArn,
      listenerProtocol: props.listenerProtocol ?? ApplicationProtocol.HTTPS
    });

    listener.addTargetGroups(`${id}TargetGroups`, {
      targetGroups: [targetGroup],
      conditions: targetGroupConditions,
      priority: props.targetGroupPriority ?? 1
    });

    this.domainRecords = {};

    if (props.domainName !== undefined && props.domainZone !== undefined) {
      this.domainName = DomainName.fromFqdn(props.domainName, props.domainZone);
      this.route53Record = this.domainName.createARecord(this,
        RecordTarget.fromAlias(new LoadBalancerTarget(loadBalancer)));

      this.domainRecords[props.domainName] = {
        domainName: this.domainName,
        route53Record: this.route53Record
      }
    }

    if (props.domainNames !== undefined && props.domainZone !== undefined) {
      for (const name of props.domainNames) {
        const dn = DomainName.fromFqdn(name, props.domainZone);
        this.domainRecords[name] = {
          domainName: dn,
          route53Record: dn.createARecord(this, RecordTarget.fromAlias(new LoadBalancerTarget(loadBalancer)))
        }
      }
    }

    this.loadBalancer = loadBalancer;
    this.listener = listener;
  }
}
