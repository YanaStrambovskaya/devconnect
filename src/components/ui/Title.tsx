// import { cva, type VariantProps } from "class-variance-authority";
import type { JSX, ReactNode } from "react";
// import { twMerge } from "tailwind-merge";

// const titleStyles = cva("", {
//   variants: {
//     variant: {
//       h1: [""],
//       h2: [""],
//       h3: [""],
//       h4: [""],
//       h5: [""],
//       h6: [""],
//     },
//   },
// });
const styles = {
  1: "text-[60px] text-blue-900",
  2: "text-[40px]",
  3: "text-[30px]",
  4: "text-[20px]",
  5: "text-[20px]",
  6: "text-[20px]",
};
type Props = {
  className?: string;
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};
export function Title({ children, level, className }: Props) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`${styles[level]} ${className} leading-none`}>
      {children}
    </Tag>
  );
}
