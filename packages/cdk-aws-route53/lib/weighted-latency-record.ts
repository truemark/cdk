import {Construct} from "constructs";
import {ARecord, CfnRecordSet, IAliasRecordTarget, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {Route53RecordTarget} from 'aws-cdk-lib/aws-route53-targets';
import {Stack} from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";

export interface WeightedLatencyRecordProps {

  /**
   * Route53 zone to host the created records.
   */
  zone: IHostedZone;

  /**
   * Name of the record.
   */
  recordName: string

  /**
   * Value to use as a prefix on the latency route53 record.
   *
   * @default lbr
   */
  latencyRecordPrefix?: string;

  /**
   * The target of the record
   */
  recordTarget: IAliasRecordTarget;

  /**
   * Initial weight of the record.
   *
   * @default 0
   */
  initialWeight?: number
}

export class WeightedLatencyRecord extends Construct {

  readonly latencyRecord: ARecord
  readonly weightedRecord: ARecord

  constructor(scope: Construct, id: string, props: WeightedLatencyRecordProps) {
    super(scope, id);

    // Create latency based route53 record
    this.latencyRecord = new ARecord(this, 'LatencyRecord', {
      recordName: props.latencyRecordPrefix??'lbr' + props.recordName,
      zone: props.zone,
      target: RecordTarget.fromAlias(props.recordTarget)
    });

    // See https://github.com/aws/aws-cdk/issues/4391
    const latencyRecordSet = this.latencyRecord.node.defaultChild as CfnRecordSet
    latencyRecordSet.region = Stack.of(this).region
    latencyRecordSet.setIdentifier = Stack.of(this).region

    // Created weighted route53 record
    this.weightedRecord = new ARecord(this, 'WeightedRecord', {
      recordName: props.recordName,
      zone: props.zone,
      target: RecordTarget.fromAlias(new Route53RecordTarget(this.latencyRecord))
    });

    const weightedLatencyRecordSet = this.weightedRecord.node.defaultChild as route53.CfnRecordSet
    weightedLatencyRecordSet.weight = props.initialWeight??0
    weightedLatencyRecordSet.setIdentifier = props.latencyRecordPrefix + Stack.of(this).region
  }
}
