const formator = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});
export function formateDate(date: any) {
  const createdAt =
    typeof date.toDate === "function" ? date.toDate() : new Date(date);

  return formator.format(createdAt);
}
