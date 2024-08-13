// Write a custom hook useFetch witch works like this

/**
 * const [{response, error, isLoading}, doFetch] = useFetch('https://localhost:5173/articles')
 */

import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

export const WriteReactCustomHookUseFetch = () => {
  const [{ response, error, isLoading }, doFetch] = useFetch('http://localhost:5317/articles');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ul>{response && response.map(article => <li key={article.id}>{article.title}</li>)}</ul>;
};
