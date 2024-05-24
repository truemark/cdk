import {Construct} from 'constructs/lib/construct';
import {aws_wafv2 as wafv2} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Stack, StackProps} from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface CloudFrontSecurityBaselineCountWebaclProps extends StackProps {
  readonly countryCodes: string[];
  readonly searchString: string;
  readonly limit: number;
}

export class CloudFrontSecurityBaselineCountWebacl extends Construct {
  constructor(scope: Construct, id: string, props: CloudFrontSecurityBaselineCountWebaclProps) {
    super(scope, id, props);

    const ruleGroup = new wafv2.CfnRuleGroup(this, 'MyRuleGroup', {
      name: 'SecurityBaselineCountRuleGroup',
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
                        countryCodes: props.countryCodes,
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
              limit: props.limit,
              aggregateKeyType: 'IP',
              evaluationWindowSec: 300,
              scopeDownStatement: {
                byteMatchStatement: {
                  searchString: props.searchString,
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

    const myGlobalWebACL = new wafv2.CfnWebACL(this, 'MyGlobalWebACL', {
      name: 'SecurityBaselineCountWebACL',
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
          overrideAction: {count: {}},
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
          overrideAction: {count: {}},
          statement: {
            ruleGroupReferenceStatement: {
              arn: ruleGroup.attrArn,
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
          overrideAction: {count: {}},
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
          overrideAction: {count: {}},
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
          overrideAction: {count: {}},
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
  }
}
