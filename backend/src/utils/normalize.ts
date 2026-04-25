/**
 * Normalizes a string by converting to lowercase, removing special characters,
 * and collapsing multiple spaces.
 */
export function normalizeName(name: string = ""): string {
  return name
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
