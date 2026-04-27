import { twMerge } from "tailwind-merge";
import { ImageWithFallback } from "../../ui/ImageWithFallback";

type Props = {
  url?: string | null;
  alt: string;
  className?: string;
};

export function ProjectImg({ url, alt, className }: Props) {
  return (
    <ImageWithFallback
      url={url}
      alt={alt}
      className={twMerge(
        "w-full h-[200px] object-cover rounded-md aspect-video",
        className
      )}
      fallback={
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-md">
          No Image
        </div>
      }
    />
  );
}
