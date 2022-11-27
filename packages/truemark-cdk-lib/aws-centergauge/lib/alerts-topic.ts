import {Construct} from "constructs";
import {CfnSubscription, Topic} from "aws-cdk-lib/aws-sns";
import {Alias, IKey} from "aws-cdk-lib/aws-kms";
import {StandardQueue} from "../../aws-sqs";
import {AnyPrincipal, Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {CDK_NPMJS_URL, CDK_VENDOR} from "../../helpers";
import {StandardTags} from "../../aws-cdk";

/**
 * Properties for AlertsTopic
 */
export interface AlertsTopicProps {

  /**
   * Overrides default topic display name.
   *
   * @default "CenterGaugeAlerts"
   */
  readonly displayName?: string;

  /**
   * Overrides the use of the default aws/sns KMS key for encryption
   *
   * @default uses AWS managed SNS KMS key
   */
  readonly masterKey?: IKey;

  /**
   * Overrides the default alerts URL.
   *
   * @default https://alerts.centergauge.com/
   */
  readonly url?: string;

  /**
   * Setting this to true will suppress the creation of default tags on resources
   * created by this construct. Default is false.
   *
   * @default - false
   */
  readonly suppressTagging?: boolean;
}

/**
 * Sets up an SNS Topic that will send notifications to CenterGauge.
 */
export class AlertsTopic extends Construct {

  constructor(scope: Construct, id: string, props: AlertsTopicProps) {
    super(scope, id);

    const masterKey = props.masterKey ?? Alias.fromAliasName(this, "AwsSnsKey", "aws/sns");

    const dlq = new StandardQueue(this, "Dlq", {
      maxReceiveCount: -1,
      criticalAlarmOptions: {
        maxSize: 1
      }
    });

    const topic = new Topic(this, "Default", {
      displayName: props.displayName ?? "CenterGaugeAlerts",
      fifo: false,
      masterKey
    });

    dlq.addToResourcePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      sid: "First",
      principals: [new AnyPrincipal()],
      actions: ["sqs:SendMessage"],
      conditions: {
        "ArnEquals": {
          "aws:SourceArn": topic.topicArn
        }
      }
    }));

    new CfnSubscription(this, "Subscription", {
      topicArn: topic.topicArn,
      protocol: "https",
      endpoint: props.url ?? "https://alerts.centergauge.com/",
      rawMessageDelivery: false,
      deliveryPolicy: {
        "healthyRetryPolicy": {
          "numRetries": 10,
          "numNoDelayRetries": 0,
          "minDelayTarget": 30,
          "maxDelayTarget": 120,
          "numMinDelayRetries": 3,
          "numMaxDelayRetries": 0,
          "backoffFunction": "linear"
        }
      },
      redrivePolicy: JSON.stringify({
        "deadLetterTargetArn": dlq.queueArn
      })
    });

    new StandardTags(this, {
      suppress: props?.suppressTagging
    }).addAutomationComponentTags({
      url: CDK_NPMJS_URL,
      vendor: CDK_VENDOR
    });
  }
}
