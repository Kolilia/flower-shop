import { useEffect, useState } from "react";
import { is } from "./../helpers/is";

export const useDebounce = (value, ms) => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (is(String, value)) {
        setDebouncedValue(value);
      }
    }, ms);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [ms, value]);

  return debouncedValue;
};
