import { useEffect, useState } from "react";

type Options<T> = {
  url: string;
  onLoad?: (data: T) => void;
};

export const useQuery = <T>({ url }: Options<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        setData((await response.json()) as T);
      } catch (e) {
        setData(null);
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [url]);

  return { data, error, loading };
};
