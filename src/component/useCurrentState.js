import { useLayoutEffect, useRef, useState } from 'react';

export function useCurrentState(...params) {
  const [value, setValue] = useState(...params);
  let currentSetVal = useRef();
  currentSetVal.current = setValue;

  useLayoutEffect(() => {
    return () => (currentSetVal.current = null);
  }, []);

  return [
    value,
    function (...params) {
      currentSetVal.current && currentSetVal.current(...params);
    },
  ];
}
