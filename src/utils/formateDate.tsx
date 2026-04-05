import { FieldValue } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const formator = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});
export function formateDate(date: Timestamp | FieldValue): string | null {
  if (date instanceof Timestamp) {
    const cteatedAt = date.toDate();
    return formator.format(cteatedAt);
  }
  return null;
}
