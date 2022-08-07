import {TestHelper} from "../test-helper";
import {DomainName} from "../../aws-route53";

test("Test propsMatch", () => {
  const domainName = new DomainName({
    prefix: "test1",
    zone: "example.com"
  });
  let match = domainName.propsMatch({
    prefix: "test1",
    zone: "example.com"
  });
  expect(match).toBe(true);
  match = domainName.propsMatch({
    prefix: "test1",
    zone: "example.com",
    privateZone: false
  });
  expect(match).toBe(true);
  match = domainName.propsMatch({
    prefix: "test1",
    zone: "example.com",
    privateZone: true
  });
  expect(match).toBe(false);
  match = domainName.propsMatch({
    prefix: "test2",
    zone: "example.com"
  });
  expect(match).toBe(false);
});

test("Test findDomainName", () => {
  const stack = TestHelper.stack();
  const domainName1 = new DomainName({
    prefix: "test1",
    zone: "example.com"
  });
  const domainName2 = new DomainName({
    prefix: "test2",
    zone: "example.com"
  });
  const domainName3 = new DomainName({
    prefix: "test3",
    zone: "example.com",
    privateZone: true
  });
  const foundDomainName = DomainName.findDomainName(
    {prefix: "test2", zone: "example.com"},
    [domainName1, domainName2, domainName3]);
  expect(foundDomainName).toBeDefined();
  expect(foundDomainName?.getPrefix()).toEqual("test2");
  expect(foundDomainName?.getZone()).toEqual("example.com");
});
