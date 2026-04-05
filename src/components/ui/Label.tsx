import type { ComponentProps, ReactNode } from "react";
// import "./label.scss";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelStyles = cva("text-md", {
  variants: {
    variant: {
      srOnly: [
        "absolute",
        "h-[1px] w-[1px] -m-[1px p-0 overflow-hidden border-0]",
      ],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LabelProps = VariantProps<typeof labelStyles> &
  ComponentProps<"label"> & {
    className?: string;
    children: ReactNode;
  };
export function Label({ className, variant, children, ...props }: LabelProps) {
  return (
    <label className={twMerge(labelStyles({ variant }), className)} {...props}>
      {children}
    </label>
  );
}
