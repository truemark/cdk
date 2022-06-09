export class DomainName {
  prefix: string
  zone: string

  constructor(prefix: string, zone: string) {
    this.prefix = prefix;
    this.zone = zone;
  }

  toString() {
    return (this.prefix == '' ? '' : this.prefix + '.') + this.zone;
  }

  toIdentifier() {
    return this.toString().replace('.', '-');
  }
}
