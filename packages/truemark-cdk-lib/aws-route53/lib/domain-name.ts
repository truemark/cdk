import {HostedZone, IHostedZone} from "aws-cdk-lib/aws-route53";
import {Construct} from "constructs";

/**
 * Utility class for holding domain name information.
 */
export class DomainName {

  readonly prefix: string;
  readonly zone: string | IHostedZone;
  readonly privateZone: boolean;
  readonly vpcId?: string;

  constructor(prefix: string, zone: string | IHostedZone, privateZone?: boolean, vpcId?: string) {
    this.prefix = prefix;
    this.zone = zone;
    this.privateZone = privateZone ?? false;
    this.vpcId = vpcId;
  }

  toString() {
    return (this.prefix == "" ? "" : this.prefix + ".") + this.zone;
  }

  toIdentifier() {
    return this.toString().replace(".", "-");
  }

  getHostedZone(scope: Construct, id?: string) : IHostedZone {
    if (typeof this.zone === "string") {
      return HostedZone.fromLookup(scope, id ?? this.toIdentifier(), {
        domainName: this.zone,
        privateZone: this.privateZone,
        vpcId: this.vpcId
      });
    } else {
      return this.zone;
    }
  }

  static toStrings(domainNames: DomainName[]) : string[] {
    return domainNames.map(d => d.toString());
  }

  static toZoneMap(scope: Construct, domainNames: DomainName[]) : { [domainName: string]: IHostedZone }  {
    const map: {[key: string]: IHostedZone} = {}
    domainNames.forEach(d => {
      map[d.toString()] = d.getHostedZone(scope)
    })
    return map;
  }

}
