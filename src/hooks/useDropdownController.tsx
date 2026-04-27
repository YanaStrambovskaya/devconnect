import { useEffect, useRef, useState } from "react";

export default function useDropdownController() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  useEffect(() => {
    function handleOnCloseDropdown(e: MouseEvent) {
      // console.log(parentRef.current);
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        close();
      }
    }

    document.addEventListener("click", handleOnCloseDropdown);

    return () => {
      document.removeEventListener("click", handleOnCloseDropdown);
    };
  }, [rootRef]);
  return {
    rootRef,
    isOpen,
    open,
    close,
    setIsOpen,
  };
}
