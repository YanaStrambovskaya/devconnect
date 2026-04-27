import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
  className?: string;
};
export default function Card({ children, className }: Props) {
  return (
    <div
      className={`p-5 shadow-md shadow-gray-950/10 rounded-lg border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}
