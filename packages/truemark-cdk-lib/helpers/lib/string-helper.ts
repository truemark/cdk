/**
 * Helper methods for use on Strings.
 */
export class StringHelper {

  /**
   * Tests if a string is lower case alphanumeric
   *
   * @param str the string to check
   */
  static isLowerAlphanumeric(str?: string | null): boolean {
    if (str) {
      return /^[a-z0-9]+$/.test(str);
    }
    return false;
  }

  /**
   * Tests if a string is upper case alphanumeric.
   *
   * @param str the string to check
   */
  static isUpperAlphanumeric(str?: string | null): boolean {
    if (str) {
      return /^[A-Z0-9]+$/.test(str);
    }
    return false;
  }

  /**
   * Tests if a string is PascalCase.
   *
   * @param str the string to test
   */
  static isPascalCase(str?: string | null) {
    if (str) {
      return /^[A-Z](([a-z0-9]+[A-Z]?)*)$/.test(str);
    }
    return false;
  }

  /**
   * Tests if a string is camelCase.
   *
   * @param str the string to test
   */
  static isCamelCase(str?: string | null) {
    if (str) {
      return /^[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$/.test(str);
    }
    return false;
  }

  /**
   * Converts a string to snake_case
   *
   * @param str the string to convert
   */
  static toSnakeCase(str: string): string {
    return (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
      .map(x => x.toLowerCase()).join("_");
  }

  /**
   * Converts a string to kebab-case
   *
   * @param str the string to convert
   */
  static toKebabCase(str: string): string {
    return (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
      .map(x => x.toLowerCase()).join("-");
  }

  /**
   * Converts a string to camelCase.
   *
   * @param str the string to convert
   */
  static toCamelCase(str: string): string {
    str = this.toPascalCase(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * Converts a string to PascalCase.
   *
   * @param str the string to convert
   */
  static toPascalCase(str: string): string {
    return (str.match(/[a-zA-Z0-9]+/g) || []).map(x => `${x.charAt(0).toUpperCase()}${x.slice(1)}`).join("");
  }
}
