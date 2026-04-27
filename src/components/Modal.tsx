import type { ModalConfigType } from "../types/types";
import { Button } from "./ui/Button";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { LineSeparator } from "./ui/LineSeparator";

export default function Modal({
  size,
  title,
  onClose,
  content,
  footer,
}: ModalConfigType & { onClose: () => void }) {
  const modalSize: Record<ModalConfigType["size"], string> = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
    xl: "w-xl",
    "2xl": "w-2xl",
    "3xl": "w-3xl",
  };
  console.log("modalSize: ", modalSize);
  console.log("size: ", size);
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal content */}
      <div
        className={`relative bg-white p-6 rounded shadow-lg z-10 flex flex-col gap-3 ${modalSize[size]}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl">{title}</h2>
          <Button
            variant="icon"
            size="xs"
            className="rounded-full aspect-square"
            onClick={onClose}
          >
            <X size={18}></X>
          </Button>
        </div>
        <LineSeparator></LineSeparator>
        <div>{content}</div>
        <LineSeparator></LineSeparator>
        <div className="flex gap-2 justify-end">{footer}</div>
      </div>
    </div>,
    document.body
  );
}
