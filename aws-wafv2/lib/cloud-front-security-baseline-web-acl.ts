import {Construct} from 'constructs/lib/construct';
import {
  CfnLoggingConfiguration,
  CfnRuleGroup,
  CfnWebACL,
} from 'aws-cdk-lib/aws-wafv2';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';

export type Mode = 'count' | 'active';

/**
 * Properties for CloudFrontSecurityBaselineWebAcl.
 */
export interface CloudFrontSecurityBaselineWebAclProps {
  readonly mode?: Mode;
  readonly name?: string;
  /**
   * The number of days log events are kept in CloudWatch Logs. Default is 1 year.
   */
  readonly logRetention?: RetentionDays;
}

/**
 * Creates a rule group and web ACL for CloudFront distributions to use.
 */
export class CloudFrontSecurityBaselineWebAcl extends Construct {
  readonly ruleGroup: CfnRuleGroup;
  readonly webAcl: CfnWebACL;
  constructor(
    scope: Construct,
    id: string,
    props?: CloudFrontSecurityBaselineWebAclProps
  ) {
    super(scope, id);

    this.ruleGroup = new CfnRuleGroup(this, 'RuleGroup', {
      name: props?.name ?? 'SecurityBaselineRuleGroup',
      scope: 'CLOUDFRONT',
      capacity: 500,
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'SecurityBaselineRuleGroupMetric',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'UriCountryBased',
          priority: 1,
          action: {
            count: {},
          },
          statement: {
            rateBasedStatement: {
              limit: 200,
              aggregateKeyType: 'IP',
              evaluationWindowSec: 300,
              scopeDownStatement: {
                andStatement: {
                  statements: [
                    {
                      byteMatchStatement: {
                        searchString: '/api/login',
                        fieldToMatch: {
                          uriPath: {},
                        },
                        positionalConstraint: 'EXACTLY',
                        textTransformations: [
                          {
                            priority: 0,
                            type: 'NONE',
                          },
                        ],
                      },
                    },
                    {
                      geoMatchStatement: {
                        countryCodes: ['CN', 'RU'],
                      },
                    },
                  ],
                },
              },
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'uri-country-based',
          },
        },
        {
          name: 'LoginRateLimitRule',
          priority: 0, // Ensure priorities do not overlap with existing rules
          action: {
            block: {},
          },
          statement: {
            rateBasedStatement: {
              limit: 300,
              aggregateKeyType: 'IP',
              evaluationWindowSec: 300,
              scopeDownStatement: {
                byteMatchStatement: {
                  searchString: '/api/login',
                  fieldToMatch: {
                    uriPath: {},
                  },
                  textTransformations: [
                    {
                      priority: 0,
                      type: 'NONE',
                    },
                  ],
                  positionalConstraint: 'STARTS_WITH',
                },
              },
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'login-rate-limit-rule',
          },
        },
      ],
    });

    this.webAcl = new CfnWebACL(this, 'WebAcl', {
      name: 'SecurityBaselineWebACL',
      defaultAction: {allow: {}},
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'globalWebAclMetric',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'AWS-AWSManagedRulesCommonRuleSet',
          priority: 0,
          overrideAction: props?.mode === 'active' ? {none: {}} : {count: {}},
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesCommonRuleSet',
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesCommonRuleSetMetric',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'SecurityBaselineRuleGroup',
          priority: 1,
          overrideAction: props?.mode === 'active' ? {none: {}} : {count: {}},
          statement: {
            ruleGroupReferenceStatement: {
              arn: this.ruleGroup.attrArn,
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'SecurityBaselineRuleGroupMetric',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'AWS-AWSManagedRulesKnownBadInputsRuleSet',
          priority: 2,
          overrideAction: {none: {}},
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesKnownBadInputsRuleSet',
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesKnownBadInputsRuleSetMetric',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'AWS-AWSManagedRulesAnonymousIpList',
          priority: 3,
          overrideAction: props?.mode === 'active' ? {none: {}} : {count: {}},
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesAnonymousIpList',
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesAnonymousIpListMetric',
            sampledRequestsEnabled: true,
          },
        },
        {
          name: 'AWS-AWSManagedRulesAmazonIpReputationList',
          priority: 4,
          overrideAction: props?.mode === 'active' ? {none: {}} : {count: {}},
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesAmazonIpReputationList',
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesAmazonIpReputationListMetric',
            sampledRequestsEnabled: true,
          },
        },
      ],
    });

    const wafLogGroup = new LogGroup(this, 'WafLogGroup', {
      logGroupName: `aws-waf-logs-global-waf-acl-logs-${this.node.addr}`,
      retention: props?.logRetention ?? RetentionDays.ONE_YEAR,
    });

    new CfnLoggingConfiguration(this, 'LoggingConfig', {
      resourceArn: this.webAcl.attrArn,
      logDestinationConfigs: [wafLogGroup.logGroupArn],
    });
  }
}
