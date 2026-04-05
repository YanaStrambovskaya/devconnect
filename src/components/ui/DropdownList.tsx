import type { ReactNode } from "react";

type DropdownListProps<T> = {
  items: Iterable<T>;
  getKey: (item: T, index: number) => React.Key;
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void | Promise<void>;
  renderItem: (item: T, index: number) => ReactNode;
};
export function DropdownList<T>({
  items,
  getKey,
  onScroll,
  renderItem,
}: DropdownListProps<T>) {
  return (
    <ul
      onScroll={onScroll}
      className="absolute bg-white rounded-md shadow border border-gray-200 w-full z-40 max-h-[200px] overflow-y-auto"
    >
      {Array.from(items).map((item, i) => {
        return <li key={getKey(item, i)}>{renderItem(item, i)}</li>;
      })}
    </ul>
  );
}
