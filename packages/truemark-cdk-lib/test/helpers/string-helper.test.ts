import {StringHelper} from "../../helpers/lib/string-helper";

test("Test StringHelper#isCamelCase", () => {
  expect(StringHelper.isCamelCase(undefined)).toBe(false);
  expect(StringHelper.isCamelCase(null)).toBe(false);
  expect(StringHelper.isCamelCase("testThis")).toBe(true);
  expect(StringHelper.isCamelCase("testThis01")).toBe(true);
  expect(StringHelper.isCamelCase("TestThis")).toBe(false);
  expect(StringHelper.isCamelCase("test-this")).toBe(false);
});

test("Test StringHelper#isPascalCase", () => {
  expect(StringHelper.isPascalCase(undefined)).toBe(false);
  expect(StringHelper.isPascalCase(null)).toBe(false);
  expect(StringHelper.isPascalCase("TestThis")).toBe(true);
  expect(StringHelper.isPascalCase("TestThis01")).toBe(true);
  expect(StringHelper.isPascalCase("testThis")).toBe(false);
  expect(StringHelper.isPascalCase("Test-This")).toBe(false);
});

test("Test StringHelper.toSnakeCase", () => {
  expect(StringHelper.toSnakeCase("ThisIsATest")).toBe("this_is_a_test");
  expect(StringHelper.toSnakeCase("This_Is_A_Test")).toBe("this_is_a_test");
  expect(StringHelper.toSnakeCase("This-Is-A-Test")).toBe("this_is_a_test");
  expect(StringHelper.toSnakeCase("This Is A Test")).toBe("this_is_a_test");
});

test("Test StringHelper.toKebabCase", () => {
  expect(StringHelper.toKebabCase("ThisIsATest")).toBe("this-is-a-test");
  expect(StringHelper.toKebabCase("This_Is_A_Test")).toBe("this-is-a-test");
  expect(StringHelper.toKebabCase("This-Is-A-Test")).toBe("this-is-a-test");
  expect(StringHelper.toKebabCase("This Is A Test")).toBe("this-is-a-test");
});

test("Test StringHelper.toCamelCase", () => {
  expect(StringHelper.toCamelCase("this-is-a-test")).toBe("thisIsATest");
  expect(StringHelper.toCamelCase("this_is_a_Test")).toBe("thisIsATest");
  expect(StringHelper.toCamelCase("ThisIsATest")).toBe("thisIsATest");
  expect(StringHelper.toCamelCase("This Is A Test")).toBe("thisIsATest");
});

test("Test StringHelper.toPascalCase", () => {
  expect(StringHelper.toPascalCase("this_is_a_test")).toBe("ThisIsATest");
  expect(StringHelper.toPascalCase("this_is_a_Test")).toBe("ThisIsATest");
  expect(StringHelper.toPascalCase("ThisIsATest")).toBe("ThisIsATest");
  expect(StringHelper.toPascalCase("this is a test")).toBe("ThisIsATest");
  expect(StringHelper.toPascalCase("dev")).toBe("Dev");
});
