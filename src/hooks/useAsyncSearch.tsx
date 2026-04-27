import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export default function useAsyncSearch<T>({
  query,
  minChars = 2,
  search,
}: {
  query: string;
  minChars?: number;
  search: (term: string) => Promise<T[]>;
}) {
  const debounceTerm = useDebounce(query);
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const term = debounceTerm.trim();
    if (term.length < minChars) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    async function run() {
      try {
        setIsLoading(true);
        const nextItems = await search(term);
        setItems(nextItems);
      } catch (err) {
        console.log(err);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }
    run();
  }, [debounceTerm, minChars, search]);

  function clearItems() {
    setItems([]);
  }

  return {
    items,
    isLoading,
    clearItems,
  };
}
