import {
  ARecord,
  ARecordProps,
  CfnRecordSet,
  RecordTarget,
} from 'aws-cdk-lib/aws-route53';
import {Construct} from 'constructs';
import {Stack} from 'aws-cdk-lib';
import {Route53RecordTarget} from 'aws-cdk-lib/aws-route53-targets';

/**
 * Options for LatencyARecord.
 */
export interface LatencyARecordOptions {
  /**
   * The region to use for the record.
   *
   * @default Stack.of(this).region
   */
  readonly region?: string;

  /**
   * The identifier to use for the record.
   *
   * @default Stack.of(this).region
   */
  readonly setIdentifier?: string;

  /**
   * ID of the health check to apply to this record.
   */
  readonly healthCheckId?: string;
}

/**
 * Properties for LatencyARecord.
 */
export interface LatencyARecordProps
  extends ARecordProps,
    LatencyARecordOptions {}

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
    rs.region = props.region ?? Stack.of(this).region;
    rs.setIdentifier = props.setIdentifier ?? Stack.of(this).region;
    rs.healthCheckId = props.healthCheckId;
  }
}
