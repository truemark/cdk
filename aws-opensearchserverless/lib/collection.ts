import {Construct} from 'constructs';
import {ExtendedConstruct} from '../../aws-cdk';

export interface CollectionProps {
  readonly name: string;
}

export class Collection extends ExtendedConstruct {
  constructor(scope: Construct, id: string, props: CollectionProps) {
    super(scope, id);
    console.log(props);
  }
}
