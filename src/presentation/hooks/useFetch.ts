import { useEffect, useState } from "react";
import { apiClient } from "../config/clientApi";
import type { CustomResponse } from "../interfaces/response/CustomResponse";

const useFetch = <T>(URL: string, reload?: boolean) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<CustomResponse<T>>(URL);
      setResult(data.body);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!URL) return;
    fetchData();
  }, [reload]);

  return { isLoading, result, error };
};

export { useFetch };
