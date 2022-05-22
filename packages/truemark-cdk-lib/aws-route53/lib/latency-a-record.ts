import {ARecord, ARecordProps, CfnRecordSet} from "aws-cdk-lib/aws-route53";
import {Construct} from "constructs";
import {Stack} from "aws-cdk-lib";

/**
 * Properties for LatencyARecord.
 */
export interface LatencyARecordProps extends ARecordProps {

  /**
   * The region to use for the record.
   *
   * @default Stack.of(this).region
   */
  readonly region?: string

  /**
   * The identifier to use for the record.
   *
   * @default Stack.of(this).region
   */
  readonly setIdentifier?: string

}

/**
 * An extended ARecord that performs latency based routing.
 */
export class LatencyARecord extends ARecord {

  /**
   * Creates a new LatencyARecord.
   */
  constructor(scope: Construct, id: string, props: LatencyARecordProps) {
    super(scope, id, props);
    const rs = this.node.defaultChild as CfnRecordSet;
    rs.region = props.region??Stack.of(this).region;
    rs.setIdentifier = props.setIdentifier??Stack.of(this).region;
  }
}
