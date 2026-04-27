import type { ComponentProps, ReactNode } from "react";
// import "./input.scss";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyles = cva("border border-gray-200 rounded-md w-full px-3", {
  variants: {
    variant: {
      withIcon: [],
    },
  },
  // defaultVariants,
});

type TextareaProps = VariantProps<typeof inputStyles> &
  ComponentProps<"textarea"> & {
    icon?: ReactNode;
  };
export function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={twMerge(inputStyles({ variant }), className)}
    />
  );
}
