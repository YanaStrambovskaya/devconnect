import { useEffect, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DropdownListProps<T> = {
  items: Array<T>;
  getKey: (item: T, index: number) => React.Key;
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void | Promise<void>;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement | null>;
};
export function DropdownList<T>({
  items,
  getKey,
  onScroll,
  renderItem,
  className,
  onClose,
  parentRef,
}: DropdownListProps<T>) {
  // const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    function handleOnCloseDropdown(e: MouseEvent) {
      // console.log(parentRef.current);
      if (!parentRef.current) return;
      if (!parentRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("click", handleOnCloseDropdown);

    return () => {
      document.removeEventListener("click", handleOnCloseDropdown);
    };
  }, [onClose, parentRef]);

  return (
    <ul
      onScroll={onScroll}
      className={twMerge(
        "absolute bg-white shadow rounded-md border border-gray-200 w-full z-40 max-h-[200px] overflow-y-auto",
        className
      )}
    >
      {items.map((item, i) => {
        return <li key={getKey(item, i)}>{renderItem(item, i)}</li>;
      })}
    </ul>
  );
}
