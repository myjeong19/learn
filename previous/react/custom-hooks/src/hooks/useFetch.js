import { useState, useEffect } from 'react';

export const useFetch = (fetchFunction, initialValue) => {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFunction]);

  return { isFetching, error, setFetchedData, setIsFetching, fetchedData };
};
