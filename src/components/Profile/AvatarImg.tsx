import { getLetters } from "../../utils/getLetters";
import { ImageWithFallback } from "../ui/ImageWithFallback";

type Props = {
  url?: string | null;
  alt: string;
};

export function AvatarImg({ url, alt }: Props) {
  return (
    <ImageWithFallback
      url={url}
      alt={alt}
      className="rounded-full w-[150px] aspect-square object-cover"
      fallback={
        <div className="rounded-full text-5xl w-[150px] h-[150px] bg-taupe-200 flex items-center justify-center">
          {getLetters(alt)}
        </div>
      }
    />
  );
}
