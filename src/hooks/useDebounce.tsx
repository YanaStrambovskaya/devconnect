import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// export function debounce<T extends (...args: never[]) => void>(
//   fn: T,
//   delay: number = 300
// ): (...args: Parameters<T>) => void {
//   let timer: ReturnType<typeof setTimeout> | null = null;
//   return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// }
