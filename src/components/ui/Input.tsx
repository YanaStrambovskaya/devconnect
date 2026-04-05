import type { ComponentProps, ReactNode } from "react";
// import "./input.scss";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyles = cva("h-[44px] border border-gray-200 rounded-md w-full", {
  variants: {
    variant: {
      withIcon: ["pl-[38px]"],
      noIcon: ["px-3"],
    },
  },
  defaultVariants: {
    variant: "noIcon",
  },
});

type InputProps = VariantProps<typeof inputStyles> &
  ComponentProps<"input"> & {
    icon?: ReactNode;
  };
export function Input({ icon, className, variant, ...props }: InputProps) {
  if (icon) {
    variant = "withIcon";
  }
  return (
    <div className="input-wrapper relative">
      {icon && (
        <span className="absolute top-1/2 left-[10px] -translate-y-1/2">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={twMerge(inputStyles({ variant }), className)}
      />
    </div>
  );
}
