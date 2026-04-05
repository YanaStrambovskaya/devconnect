import type { ImgHTMLAttributes } from "react";

type ImagePrps = ImgHTMLAttributes<HTMLImageElement>;

export function Image(props: ImagePrps) {
  return <img {...props} />;
}
