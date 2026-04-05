import type { ReactNode } from "react";
type Container = {
  children: ReactNode;
  className?: string;
};
export function Container({ children, className = "" }: Container) {
  return <div className={`container ${className}`}>{children}</div>;
}
