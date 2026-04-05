import type { Country } from "../../types/types";
import { DropdownList } from "../ui/DropdownList";

type PropsType = {
  items: Set<Country>;
  handleSelectedCounry: (country: Country) => void;
};
export function CountriesDropdown({ items, handleSelectedCounry }: PropsType) {
  return (
    <DropdownList
      items={items}
      getKey={(c) => c.name}
      renderItem={(c) => (
        <div
          onClick={() => handleSelectedCounry(c)}
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
