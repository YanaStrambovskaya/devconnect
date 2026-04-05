import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const dividerStyles = cva("h-[1px] w-full my-4", {
  variants: {
    variant: {
      light: ["bg-gray-100"],
      medium: ["bg-gray-200"],
      dark: ["bg-gray-300"],
    },
  },
  defaultVariants: {
    variant: "medium",
  },
});
type DividerProps = VariantProps<typeof dividerStyles> & ComponentProps<"div">;
export function Divider({ className = "", variant, ...props }: DividerProps) {
  return (
    <div
      {...props}
      className={twMerge(dividerStyles({ variant }), className)}
    ></div>
  );
}
