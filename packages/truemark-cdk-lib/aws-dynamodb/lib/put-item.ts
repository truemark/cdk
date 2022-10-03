import {AwsCustomResource, AwsSdkCall} from "aws-cdk-lib/custom-resources";
import {Construct} from "constructs";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";
import {Duration, Stack} from "aws-cdk-lib";

export interface PutItemProps {
  readonly tableName: string;
  readonly timeout?: Duration;
  readonly item: any;
  readonly physicalResourceId?: string;
}

export class PutItem extends Construct {

  readonly resource: AwsCustomResource;

  constructor(scope: Construct, id: string, props: PutItemProps) {
    super(scope, id);

    const stack = Stack.of(this);

    const call: AwsSdkCall = {
      service: "DynamoDB",
      action: "putItem",
      parameters: {
        TableName: props.tableName,
        Item: props.item
      },
      physicalResourceId: { id: props.physicalResourceId ?? Date.now().toString() }
    }

    this.resource = new AwsCustomResource(this, "Default", {
      onCreate: call,
      policy: {
        statements: [new PolicyStatement({
          resources: [`arn:aws:dynamodb:${stack.region}:${stack.account}:table/${props.tableName}`],
          actions: ["dynamodb:PutItem"],
          effect: Effect.ALLOW
        })]
      },
      timeout: props.timeout ?? Duration.minutes(1)
    });
  }
}
