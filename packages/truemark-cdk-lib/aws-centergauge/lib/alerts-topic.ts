import {Construct} from "constructs";
import {Topic} from "aws-cdk-lib/aws-sns";
import {Alias, IKey} from "aws-cdk-lib/aws-kms";
import {UrlSubscription} from "aws-cdk-lib/aws-sns-subscriptions";

/**
 * Properties for AlertsTopic
 */
export interface AlertsTopicProps {
  /**
   * Overrides default topic display name.
   *
   * @default "CentergaugeAlerts"
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
}

/**
 * Sets up an SNS Topic that will send notifications to CenterGauge.
 */
export class AlertsTopic extends Construct {

  readonly key: IKey;
  readonly topic: Topic;
  readonly subscription: UrlSubscription;

  constructor(scope: Construct, id: string, props: AlertsTopicProps) {
    super(scope, id);

    this.key = props.masterKey ?? Alias.fromAliasName(this, "AwsSnsKey", "aws/sns");

    this.topic = new Topic(this, "Default", {
      displayName: props.displayName ?? "CenterGaugeAlerts",
      fifo: false,
      masterKey: this.key
    });
    this.subscription = new UrlSubscription(props.url ?? "https://alerts.centergauge.com/");
    this.topic.addSubscription(this.subscription);
  }
}
