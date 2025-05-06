/**
 * Replaces placeholders in the JSON template with values from `fields`.
 *
 * @param jsonObject - The JSON object with placeholders.
 * @param fields - Key-value pairs to replace placeholders.
 * @returns A new JSON string with placeholders replaced.
 */
export function replaceJsonFields(
  jsonObject: unknown,
  fields: {[key: string]: string},
): string {
  let jsonString = JSON.stringify(jsonObject);

  for (const key in fields) {
    const placeholder = `{{${key}}}`; // e.g., {{title}}
    jsonString = jsonString.replace(new RegExp(placeholder, 'g'), fields[key]);
  }

  return JSON.parse(jsonString);
}
