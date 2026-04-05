import type { CurrentUserView } from "../../types/types";
import { getLetters } from "../../utils/getLetters";
type props = Pick<CurrentUserView, "photoURL" | "displayName"> & {
  preview?: string | null;
};
export default function Avatar({ photoURL, displayName, preview }: props) {
  const url = preview ?? photoURL;
  return (
    <>
      {url ? (
        <img
          className="rounded-full w-[150px] aspect-square"
          src={url}
          alt={displayName}
        />
      ) : (
        <div className="rounded-full text-5xl w-[150px] h-[150px] bg-taupe-200 flex items-center justify-center">
          {getLetters(displayName)}
        </div>
      )}
    </>
  );
}
