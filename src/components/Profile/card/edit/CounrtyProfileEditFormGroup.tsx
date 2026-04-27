import FormGroup from "../../../ui/FormGroup";
import { Label } from "../../../ui/Label";
import { Input } from "../../../ui/Input";
import { CountriesDropdown } from "../../CountriesDropdown";
import type { Country } from "../../../../types/types";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
type Props = {
  countryData: Country | null;
  updateState: (data: Country | null) => void;
};
export function CounrtyProfileEditFormGroup({
  countryData,
  updateState,
}: Props) {
  const countryRef = useRef<HTMLInputElement | null>(null);

  const [counties, setCounties] = useState<Country[]>([]);
  const [isCountiesDropdownOpen, setIsCountiesDropdownOpen] = useState(false);
  const [searchCountryTerm, setSearchCountryTerm] = useState<string>("");
  const searchCountryValue = searchCountryTerm || countryData?.name || "";
  const debouncedCountrySearch = useDebounce(searchCountryTerm);

  type RestCountryItem = {
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
    name: {
      common: string;
      official: string;
      nativeName?: Record<
        string,
        {
          official: string;
          common: string;
        }
      >;
    };
  };
  function onSelectedCounry(country: Country) {
    if (country) {
      updateState(country);
      setSearchCountryTerm("");
      setCounties([]);
      setIsCountiesDropdownOpen(false);
    }
  }
  function onCountrySearch(e: React.ChangeEvent<HTMLInputElement>) {
    updateState(null);
    setSearchCountryTerm(e.target.value);
  }

  function handleOnFocus() {
    if (counties.length) {
      setIsCountiesDropdownOpen(true);
    }
  }

  useEffect(() => {
    if (debouncedCountrySearch.length > 1) {
      fetch(
        `https://restcountries.com/v3.1/name/${debouncedCountrySearch}?fields=name,flags`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          const countiesFormatedData: Country[] = [];
          data.forEach((item: RestCountryItem) => {
            countiesFormatedData.push({
              name: item.name.official,
              flags: item.flags.svg,
              alt: item.flags.alt,
            });
          });
          setCounties(countiesFormatedData);
          setIsCountiesDropdownOpen(true);
        })
        .catch(() => setCounties([]));
    }
  }, [debouncedCountrySearch]);
  return (
    <FormGroup>
      <Label htmlFor="country">Location</Label>
      <div className="relative">
        {countryData && (
          <img
            className="absolute top-1/2 -translate-y-1/2 left-[10px] h-[12px] aspect-video object-cover"
            src={countryData.flags}
            alt={countryData.alt}
          />
        )}
        <div ref={countryRef}>
          <Input
            type="search"
            id="country"
            className={countryData ? "pl-[40px] pr-2" : ""}
            value={searchCountryValue}
            placeholder="Start type to search country"
            onChange={onCountrySearch}
            onFocus={handleOnFocus}
          />
          {isCountiesDropdownOpen && counties && (
            <CountriesDropdown
              parentRef={countryRef}
              onClose={() => setIsCountiesDropdownOpen(false)}
              items={counties}
              onSelectedCounry={onSelectedCounry}
            />
          )}
        </div>
      </div>
    </FormGroup>
  );
}
