import {TestHelper} from "../../test-helper";
import {
  DataClassification,
  DataSensitivity,
  ExtendedApp,
  ExtendedConstruct,
  ExtendedStack,
  ExtendedStage,
} from "../index";
import {Construct} from "constructs";
import {Template} from "aws-cdk-lib/assertions";
import {Bucket} from "aws-cdk-lib/aws-s3";

class TestSubConstruct extends ExtendedConstruct {

  constructor(scope: Construct, id: string) {
    super(scope, id, {
      standardTags: {
        automationComponentTags: {
          id: "TestSubConstruct",
          url: "https://testsubconstruct.com"
        }
      }
    });
    new Bucket(this, "TestSubBucket");
  }
}

class TestConstruct extends ExtendedConstruct {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      standardTags: {
        automationComponentTags: {
          id: "TestConstruct",
          url: "https://testconstruct.com"
        }
      }
    });
    new Bucket(this, "TestBucket");
    new TestSubConstruct(this, "TestSubConstruct");
    // Tags.of(this).add("bark", "meow");
  }
}

class TestStack extends ExtendedStack {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      standardTags: {
        automationComponentTags: {
          id: "TestStack",
          url: "https://teststack.com"
        }
      }
    });
    new TestConstruct(this, "TestConstruct");
  }
}

interface TestStageProps {
  readonly environment: string;
}

class TestStage extends ExtendedStage {
  readonly stack: TestStack;
  constructor(scope: Construct, id: string, props: TestStageProps) {
    super(scope, id, {
      standardTags: {
        costCenterTags: {
          environment: props.environment
        }
      }
    });
    this.stack = new TestStack(this, "TestStack");
  }
}

class TestApp extends ExtendedApp {
  constructor() {
    super({
      account: TestHelper.DEFAULT_ACCOUNT,
      region: TestHelper.DEFAULT_REGION,
      standardTags: {
        automationTags: {
          id: "TestApp",
          url: "https://testapp.com"
        },
        costCenterTags: {
          projectName: "TestApp",
          projectId: "test-app",
          environment: "test",
          contactName: "John Doe",
          contactEmail: "jdoe@example.com",
          contactPhone: "+1 555-555-5555",
          businessUnitName: "Test Unit",
          businessUnitId: "test-unit",
          divisionName: "Test Division",
          divisionId: "test-division",
          departmentName: "Test Department",
          departmentId: "test-department"
        },
        securityTags: {
          dataClassification: DataClassification.Restricted,
          dataSensitivity: DataSensitivity.PII
        },
        teamTags: {
          name: "Test Team",
          id: "test-team",
          contactName: "John Doe",
          contactEmail: "jdoe@example.com",
          contactPhone: "+1 555-555-5555",
          businessUnitName: "Test Unit",
          businessUnitId: "test-unit",
          divisionName: "Test Division",
          divisionId: "test-division",
          departmentName: "Test Department",
          departmentId: "test-department"
        }
      }
    });
  }
}

test("Test StandardTags", () => {
  const app = new TestApp();
  const testStage = new TestStage(app, "TestStage", {
    environment: "test"
  });
  const prodStage = new TestStage(app, "ProdStage", {
    environment: "prod"
  })
  const testTemplate = Template.fromStack(testStage.stack);
  const prodTemplate = Template.fromStack(prodStage.stack);
  // TestHelper.logTemplate(testTemplate);
  // TestHelper.logTemplate(prodTemplate);
  // const stack = TestHelper.stack();
  // const testConstruct = new TestConstruct(stack, "TestConstruct");
  // const template = Template.fromStack(stack);
  // TestHelper.logTemplate(template);
  // const standardTags = new StandardTags(stack);
});
