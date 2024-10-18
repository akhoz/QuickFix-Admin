import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../api/axiosInstance';

interface UseAxiosConfig extends AxiosRequestConfig {
  auto?: boolean;
}

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (overrideConfig?: AxiosRequestConfig) => Promise<T>;
}


const useAxios = <T = unknown>(
  config: UseAxiosConfig,
  dependencies: any[] = []
): UseAxiosReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(config.auto ? true : false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (overrideConfig: AxiosRequestConfig = {}): Promise<T> => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await axiosInstance({
          ...config,
          ...overrideConfig,
        });
        setData(response.data);
        setError(null);
        return response.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else {
          setError(new Error('An unexpected error occurred'));
        }
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  useEffect(() => {
    if (config.auto) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, execute };
};

export default useAxios;
