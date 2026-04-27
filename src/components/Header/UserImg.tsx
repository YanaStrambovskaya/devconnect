import { ImageWithFallback } from "../ui/ImageWithFallback";

type Props = {
  url?: string | null;
  alt: string;
};

export function UserImg({ url, alt }: Props) {
  return (
    <ImageWithFallback
      url={url}
      alt={alt}
      className="rounded-full w-[30px] h-[30px] aspect-square object-cover"
      fallback={
        <div className="w-[30px] h-[30px] bg-gray-200 border border-gray-300 rounded-full"></div>
      }
    />
  );
}
