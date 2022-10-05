import {WeightedARecord, WeightedARecordProps} from "./weighted-a-record";
import {Construct} from "constructs";
import {LatencyARecord, LatencyARecordProps} from "./latency-a-record";
import {RecordTarget} from "aws-cdk-lib/aws-route53";
import {Route53RecordTarget} from "aws-cdk-lib/aws-route53-targets";
import {IRecordSet} from "aws-cdk-lib/aws-route53/lib/record-set";
import {RemovalPolicy, ResourceEnvironment, Stack} from "aws-cdk-lib";

export interface WeightedLatencyARecordOptions {
  /**
   * Value to use as a prefix on the subordinate route53 record.
   *
   * @default sub
   */
  readonly recordPrefix?: string;
}

/**
 * Properties for WeightedLatencyARecord.
 */
export interface WeightedLatencyARecordProps extends WeightedARecordProps, LatencyARecordProps, WeightedLatencyARecordOptions {}

/**
 * An WeightedARecord that uses as LatencyARecord internally to do both weight and latency based routing.
 */
export class WeightedLatencyARecord extends Construct implements IRecordSet {

  readonly weightedRecord: WeightedARecord;
  readonly latencyRecord: LatencyARecord;

  // From IRecordSet
  readonly domainName: string;
  readonly env: ResourceEnvironment;
  readonly stack: Stack;

  constructor(scope: Construct, id: string, props: WeightedLatencyARecordProps) {
    super(scope, id);

    this.weightedRecord = new WeightedARecord(this, "Weighted", {
      ...props,
      recordName: props.recordPrefix ?? `wbr${props.recordName}`
    });

    this.latencyRecord = new LatencyARecord(this, 'Latency', {
      ...props,
      target: RecordTarget.fromAlias(new Route53RecordTarget(this.weightedRecord))
    });

    this.domainName = this.weightedRecord.domainName;
    this.env = this.weightedRecord.env;
    this.stack = this.weightedRecord.stack;
  }

  applyRemovalPolicy(policy: RemovalPolicy): void {
    this.latencyRecord.applyRemovalPolicy(policy);
    this.weightedRecord.applyRemovalPolicy(policy);
  }
}
