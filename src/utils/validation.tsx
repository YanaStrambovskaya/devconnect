export function validateImage(
  file: File,
  allowedFormat: string[],
  maxSizeMB: number
): string | null {
  if (!allowedFormat || !maxSizeMB) {
    return "Validation config is missing";
  }
  if (!allowedFormat.includes(file.type)) {
    return `Only ${allowedFormat} formate(s) is(are) allowed`;
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    console.log(`Max file size is ${maxSizeMB} MB`);
    return `Max file size is ${maxSizeMB} MB`;
  }
  return null;
}
