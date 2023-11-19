import {HelperTest} from "../../helper.test";
import {BatchWriteItem} from "./batch-write-item";
import {marshall} from "@aws-sdk/util-dynamodb";
import {Template} from "aws-cdk-lib/assertions";

test("BatchWriteItem Test", () => {
  const stack = HelperTest.stack();
  new BatchWriteItem(stack, "ExampleBatchWriteItem", {
    items: {
      RequestItems: {
        "ExampleTable1": [
          {
            PutRequest: {
              Item: marshall({Pk: "Something", Sk: "SomethingElse"})
            }
          },
          {
            DeleteRequest: {
              Key: marshall({Pk: "Moo", Sk: " Oink"})
            }
          }
        ],
        "ExampleTable2": [
          {
            PutRequest: {
              Item: marshall({Pk: "Something", Sk: "SomethingElse"})
            }
          },
          {
            DeleteRequest: {
              Key: marshall({Pk: "Moo", Sk: " Oink"})
            }
          }
        ]
      }
    }
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("Custom::AWS", {});
});
