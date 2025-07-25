/**
 * useDebounce 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간 (ms)
 * @returns 지연된 값
 */

import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
