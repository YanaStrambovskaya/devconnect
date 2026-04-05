import type { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="p-5 shadow-md shadow-gray-950/10 rounded-lg border border-gray-100">
      {children}
    </div>
  );
}
