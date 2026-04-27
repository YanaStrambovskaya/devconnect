import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function ProfileCardReadRow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={twMerge("text-sm flex gap-2", className)}>{children}</div>
  );
}
