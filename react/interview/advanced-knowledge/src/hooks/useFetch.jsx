import { useCallback, useEffect, useState } from 'react';

export const useFetch = url => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setIsLoading(true);
    setOptions(options);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setResponse(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [isLoading, url, options]);

  return [{ response, error, isLoading }, doFetch];
};
