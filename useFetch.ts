import { useEffect, useState } from 'react';

export const useFetch = <T>({
  url,
  options,
  enabledCache = false,
}: {
  url: string;
  enabledCache: boolean;
  options?: RequestInit | undefined;
}): {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
} => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) {
      return;
    }
    const fetchData = async (): Promise<void> => {
      const cachedData = sessionStorage.getItem(url);
      setIsLoading(true);
      if (cachedData && enabledCache) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        try {
          const res = await fetch(url, options);
          if (!res.ok) {
            throw res;
          }
          const response = await res.json();
          if (!cancelRequest) {
            setData(response);
            sessionStorage.setItem(url, JSON.stringify(response));
            setIsLoading(false);
          }
        } catch (error) {
          if (!cancelRequest) {
            setError(error);
          }
        }
      }
    };
    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [url]);
  return { data, error, isLoading };
};
