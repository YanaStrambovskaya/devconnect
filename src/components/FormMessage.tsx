import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  children: ReactNode;
  className?: string;
  variant?: VariantProps<typeof inputStyles>["variant"];
};

const inputStyles = cva("", {
  variants: {
    variant: {
      error: ["text-red-700"],
      success: ["text-green-600"],
      default: ["text-gray-500"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export function FormMessage({ className, children, variant }: Props) {
  return (
    <p className={twMerge(inputStyles({ variant }), className)}>{children}</p>
  );
}
