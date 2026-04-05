export function validateImage(
  file: File,
  allowedFormat: string[],
  maxSizeMB: number
): boolean {
  if (!allowedFormat || !maxSizeMB) return false;
  if (!allowedFormat.includes(file.type)) {
    console.log(`Only ${allowedFormat} formate(s) is(are) allowed`);
    return false;
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    console.log(`Max file size is ${maxSizeMB} MB`);
    return false;
  }
  return true;
}
