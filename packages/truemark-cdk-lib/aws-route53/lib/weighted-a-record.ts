import {ARecord, ARecordProps, CfnRecordSet} from "aws-cdk-lib/aws-route53";
import {Construct} from "constructs";
import {Stack} from "aws-cdk-lib";

/**
 * Properties for WeightedARecord.
 */
export interface WeightedARecordProps extends ARecordProps {

  /**
   * Weight for the record
   *
   * @default 0
   */
  readonly weight?: number

  /**
   * The identifier to use for the record.
   *
   * @default Stack.of(this).region
   */
  readonly setIdentifier?: string
}

/**
 * An extended ARecord that performs weight based routing.
 */
export class WeightedARecord extends ARecord {

  /**
   * Creates a new WeightedARecord.
   */
  constructor(scope: Construct, id: string, props: WeightedARecordProps) {
    super(scope, id, props);
    const rs = this.node.defaultChild as CfnRecordSet;
    rs.weight = props.weight??0;
    rs.setIdentifier = props.setIdentifier??Stack.of(this).region;
  }
}
