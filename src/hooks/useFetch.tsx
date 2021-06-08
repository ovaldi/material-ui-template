import { useRef, useState, useCallback, useEffect } from "react";

const useFetch = <T extends any>(
  fn: (...args: any[]) => any,
  initialValue: T
): [(...args: any[]) => Promise<void>, T, boolean, any] => {
  const active = useRef(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<T>(initialValue);
  const request = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      try {
        const resp = await fn(...args);
        if (active.current) {
          setLoading(false);
          setResponse(resp);
        }
      } catch (ex) {
        if (active.current) {
          setLoading(false);
          setError(ex);
        }
      }
    },
    [fn]
  );

  useEffect(() => {
    return () => {
      active.current = false;
    };
  }, []);

  return [request, response, loading, error];
};

export default useFetch;
