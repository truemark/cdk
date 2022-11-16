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
