import {TestHelper} from "../../test-helper";
import {DistributionBuilder} from "./distribution-builder";
import {Bucket} from "aws-cdk-lib/aws-s3";

test("Test DistributionBuilder", () => {
  const stack = TestHelper.stack();
  const bucket = new Bucket(stack, "TestBucket");
  new DistributionBuilder(stack, "TestDistribution")
    .behaviorFromBucket(bucket)
    .toDistribution();
});
