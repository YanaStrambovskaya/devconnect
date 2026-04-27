import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
};
export function LineSeparator({ children, className }: Props) {
  return (
    <div className={twMerge("relative h-[1px] bg-gray-300 w-full", className)}>
      {children && (
        <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-2 py-1">
          {children}
        </span>
      )}
    </div>
  );
}
