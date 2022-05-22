import {WeightedARecord, WeightedARecordProps} from "./weighted-a-record";
import {Construct} from "constructs";
import {LatencyARecord, LatencyARecordProps} from "./latency-a-record";
import {RecordTarget} from "aws-cdk-lib/aws-route53";
import {Route53RecordTarget} from "aws-cdk-lib/aws-route53-targets";

/**
 * Properties for WeightedLatencyRecord.
 */
export interface WeightedLatencyRecordProps extends WeightedARecordProps, LatencyARecordProps {

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
export class WeightedLatencyARecord extends WeightedARecord {

  /**
   * The latency record underneath this weighted record.
   */
  readonly latencyRecord: LatencyARecord

  /**
   * Creates a new WeightedLatencyARecord.
   */
  constructor(scope: Construct, id: string, props: WeightedLatencyRecordProps) {
    const latencyRecord = new LatencyARecord(scope, id + 'Latency', {
      ...props,
      recordName: props.latencyRecordPrefix??'lbr' + props.recordName,
    });

    super(scope, id, {
      ...props,
      target: RecordTarget.fromAlias(new Route53RecordTarget(latencyRecord))
    });

    this.latencyRecord = latencyRecord;
  }
}
