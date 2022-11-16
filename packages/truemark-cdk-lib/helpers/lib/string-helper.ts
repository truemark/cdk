export class StringHelper {

  static isPascalCase(str?: string | null) {
    if (str) {
      return /^[A-Z][a-z]+(?:[A-Z][a-z0-9]+)*$/.test(str);
    }
    return false;
  }

  static isCamelCase(str?: string | null) {
    if (str) {
      return /^[a-z]+(?:[A-Z][a-z0-9]+)*$/.test(str);
    }
    return false;
  }

}
