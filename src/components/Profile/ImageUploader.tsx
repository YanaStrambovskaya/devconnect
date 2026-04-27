import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/Input";
import { validateImage } from "../../utils/validation";
import { FormMessage } from "../FormMessage";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export function ImageUploader({
  value,
  updateState,
  label,
  alt = "preview",
  className,
  fallback,
}: {
  value: string;
  updateState: (file: File) => void;
  label?: string;
  alt?: string;
  className: string;
  fallback: React.ReactNode;
}) {
  const [preview, setPreview] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const avatarInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChangeAvatarClick() {
    avatarInput.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return null;
    const errorText = validateImage(file, ["image/png", "image/jpeg"], 2);
    if (errorText) {
      setError(errorText);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    updateState(file);
  }
  return (
    <div className="flex flex-col items-center gap-2">
      {label && <p className="text-sm">{label}</p>}
      <div
        className="cursor-pointer w-full flex justify-center"
        onClick={handleChangeAvatarClick}
      >
        <ImageWithFallback
          url={preview}
          alt={alt}
          className={className}
          fallback={fallback}
        />
      </div>
      {error && <FormMessage variant="error">{error}</FormMessage>}
      <Input
        ref={avatarInput}
        onChange={handleAvatarChange}
        type="file"
        accept="image/png, image/jpeg"
        hidden
      />
    </div>
  );
}
