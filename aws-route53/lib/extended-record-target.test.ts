import {ExtendedRecordTarget, LatencyARecord, WeightedARecord} from '../index';
import {
  AliasRecordTargetConfig,
  ARecord,
  CfnRecordSet,
  CnameRecord,
  HostedZone,
  IAliasRecordTarget,
  IHostedZone,
  IRecordSet,
} from 'aws-cdk-lib/aws-route53';
import {HelperTest} from '../../helper.test';

class TestAliasRecordTarget implements IAliasRecordTarget {
  bind(record: IRecordSet, zone?: IHostedZone): AliasRecordTargetConfig {
    let dnsName: string | undefined;

    // Field domainName is not yet resolved and is dependent on the deployment context thus the need to ignore it as it generates values like ${Token[TOKEN.16]}.
    if (
      record.domainName === undefined ||
      record.domainName.includes('Token')
    ) {
      dnsName = 'example';
    } else {
      dnsName = record.domainName;
    }
    return {
      hostedZoneId: zone!.hostedZoneId,
      dnsName: dnsName,
    };
  }
}

test('Test fromAlias', () => {
  const stack = HelperTest.stack();

  const zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
    hostedZoneId: 'Z000000000000000O0000',
    zoneName: 'example.com',
  });

  const recordSet: IRecordSet = new CnameRecord(stack, 'CnameRecord', {
    zone: zone,
    recordName: 'www',
    domainName: 'example.com',
  });
  const recordTarget: IAliasRecordTarget = new TestAliasRecordTarget();
  recordTarget.bind(recordSet, zone);

  const target = ExtendedRecordTarget.fromAlias(recordTarget, true);

  const weightedRecord = new WeightedARecord(stack, 'Weighted', {
    target,
    zone,
    weight: 1,
  });
  let rs = weightedRecord.node.defaultChild as CfnRecordSet;
  expect(rs.aliasTarget).toEqual({
    hostedZoneId: 'Z000000000000000O0000',
    dnsName: 'example',
    evaluateTargetHealth: true,
  });

  const latencyRecord = new LatencyARecord(stack, 'Latency', {
    target,
    zone,
  });
  rs = latencyRecord.node.defaultChild as CfnRecordSet;
  expect(rs.aliasTarget).toEqual({
    hostedZoneId: 'Z000000000000000O0000',
    dnsName: 'example',
    evaluateTargetHealth: true,
  });

  const simpleRecord = new ARecord(stack, 'Simple', {
    target,
    zone,
  });
  rs = simpleRecord.node.defaultChild as CfnRecordSet;
  expect(rs.aliasTarget).toEqual({
    hostedZoneId: 'Z000000000000000O0000',
    dnsName: 'example',
    evaluateTargetHealth: true,
  });
});
