import type { Country } from "../../types/types";
import { DropdownList } from "../ui/DropdownList";

type PropsType = {
  items: Country[];
  onSelectedCounry: (country: Country) => void;
  parentRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};
export function CountriesDropdown({
  items,
  onSelectedCounry,
  parentRef,
  onClose,
}: PropsType) {
  function handleOnClick(e: React.MouseEvent<HTMLDivElement>, c: Country) {
    e.preventDefault();
    onSelectedCounry(c);
  }
  return (
    <DropdownList
      parentRef={parentRef}
      onClose={onClose}
      items={items}
      getKey={(c) => c.name}
      className="top-[48px]"
      renderItem={(c) => (
        <div
          onClick={(e) => handleOnClick(e, c)}
          className="flex py-3 px-3 border-b-gray-300 items-center gap-2 cursor-pointer hover:bg-gray-100"
        >
          <img
            className="h-[12px] aspect-video object-cover"
            src={c.flags}
            alt={c.alt}
          />
          <span>{c.name}</span>
        </div>
      )}
    />
  );
}
