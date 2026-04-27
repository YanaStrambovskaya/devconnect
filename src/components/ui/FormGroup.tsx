import type { ComponentProps, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
} & ComponentProps<"div">;
export default function FormGroup({ children, className = "" }: Props) {
  return <div className={`mb-[20px] ${className}`}>{children}</div>;
}
