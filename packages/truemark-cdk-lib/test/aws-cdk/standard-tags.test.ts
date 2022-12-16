import {TestHelper} from "../test-helper";
import {StandardTags} from "../../aws-cdk";

test("Test StandardTags", () => {
  const stack = TestHelper.stack();
  const standardTags = new StandardTags(stack);
});
