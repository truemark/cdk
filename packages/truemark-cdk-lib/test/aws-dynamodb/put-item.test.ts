import {TestHelper} from "../test-helper";

import {marshall} from "@aws-sdk/util-dynamodb";
import {PutItem} from "../../aws-dynamodb/lib/put-item";
import {Template} from "aws-cdk-lib/assertions";

test("Test PutItem", () => {
  const stack = TestHelper.stack();
  const item = marshall({
    Pk: "Org#secure",
    Sk: "OrgDetails",
    EntityType: "Org",
    Details: {
      id: "secure",
      createdDate: Date.now(),
      contact: {
        name: "Erik Jensen",
        email: "ejensen@netradius.com"
      }
    }
  });
  new PutItem(stack, "ExamplePut", {
    tableName: "ExampleTable",
    item
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties("Custom::AWS", {});
});
