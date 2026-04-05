export function getLetters(string: string, number: number = 2): string {
  if (!string) return "";
  return string.slice(0, number).toUpperCase();
}
