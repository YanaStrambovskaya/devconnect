import { useState } from "react";

type Props = {
  url?: string | null;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
};

export function ImageWithFallback({ url, alt, className, fallback }: Props) {
  const [isError, setIsError] = useState(false);

  if (!url || isError) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`${className} bg-gray-200`}
      onError={() => setIsError(true)}
      onLoad={() => setIsError(false)}
    />
  );
}
