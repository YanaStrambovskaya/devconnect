import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
// const space = ["rounded-md", "px-4", "py-3"];
export const buttonStyles = cva("cursor-pointer shrink-0", {
  variants: {
    variant: {
      primary: [
        "bg-[var(--primary-color)]",
        "text-white",
        "border",
        "border-[var(--primary-color)]",
        "hover:bg-[var(--primary-color-hover)]",
        "hover:border-[var(--primary-color-hover)]",
      ],
      primaryDisabled: [
        "bg-[var(--primary-color)]",
        "opacity-50",
        "cursor-not-allowed",
        "text-white",
        "border",
        "pointer-events-none",
        "border-[var(--primary-color)]",
      ],
      defaultDisabled: [
        "bg-[var(--default-color)]",
        "opacity-50",
        "text-black",
        "border",
        "pointer-events-none",
        "cursor-not-allowed",
        "border-[var(--default-color)]",
      ],
      default: [
        "bg-[var(--default-color)]",
        "text-[var(--dark-grey)]",
        "border",
        "border-[var(--default-border)]",
        "hover:bg-[var(--default-color-hover)]",
        "hover:border-[var(--default-border)]",
      ],
      danger: [
        "bg-[var(--danger-color)]",
        "text-white",
        "border",
        "border-[var(--danger-color)]",
        "hover:bg-[var(--danger-color-hover)]",
        "hover:border-[var(--danger-color-hover)]",
      ],
      icon: ["hover:bg-gray-200"],
      primaryLink: ["text-[var(--primary-color)] px-1 hover:underline"],
      defaultLink: ["text-black px-1 hover:underline"],
    },
    size: {
      xxs: ["rounded-xs", "px-1", "py-1", "text-xs"],
      xs: ["rounded-xs", "px-2", "py-1", "text-xs"],
      sm: ["rounded-sm", "px-3", "py-2", "text-sm"],
      md: ["rounded-md", "px-4", "py-3", "text-md"],
      lg: [],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
type Props<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonStyles>["variant"];
  size?: VariantProps<typeof buttonStyles>["size"];
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = "button">({
  as,
  className = "",
  variant,
  size,
  children,
  ...props
}: Props<T>) {
  const Component = as || "button";
  return (
    <Component
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    >
      {children}
    </Component>
  );
}
