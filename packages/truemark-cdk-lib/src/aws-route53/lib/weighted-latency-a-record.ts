import {WeightedARecord, WeightedARecordProps} from "./weighted-a-record";
import {Construct} from "constructs";
import {LatencyARecord, LatencyARecordProps} from "./latency-a-record";
import {RecordTarget} from "aws-cdk-lib/aws-route53";
import {Route53RecordTarget} from "aws-cdk-lib/aws-route53-targets";
import {IRecordSet} from "aws-cdk-lib/aws-route53/lib/record-set";
import {RemovalPolicy, ResourceEnvironment, Stack} from "aws-cdk-lib";

/**
 * Properties for WeightedLatencyARecord.
 */
export interface WeightedLatencyARecordProps extends WeightedARecordProps, LatencyARecordProps {

  /**
   * Value to use as a prefix on the latency route53 record.
   *
   * @default lbr
   */
  readonly latencyRecordPrefix?: string;

}

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

    this.latencyRecord = new LatencyARecord(this, 'Latency', {
      ...props,
      recordName: props.latencyRecordPrefix??'lbr' + props.recordName
    });

    this.weightedRecord = new WeightedARecord(this, 'Weighted', {
      ...props,
      target: RecordTarget.fromAlias(new Route53RecordTarget(this.latencyRecord))
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
