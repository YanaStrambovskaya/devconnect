import type { PropsWithChildren } from "react";
// import "./lineSeparator.scss";

// type LineSeparatorProps = {
//   content: string;
// };
export function LineSeparator({ children }: PropsWithChildren) {
  return (
    <div className="relative h-[1px] bg-gray-300">
      {children && (
        <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-2 py-1">
          {children}
        </span>
      )}
    </div>
  );
}
