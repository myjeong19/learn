import { useState, useEffect } from 'react';
import axios from 'axios';

import { END_POINT } from '../../../constants';

type ReturnProps = {};

export type ComponentProps<T, U> = {
  resource: T;
  onChange: (updates: U) => void;
  onPost: (e: React.FormEvent) => Promise<void>;
  onReset: () => void;
};

type Component<T> = (props: T) => React.ReactElement<T>;

export default function includeUpdatableResource<T, U>(
  Component: Component<ComponentProps<T, U>>,
  resourceURL: string,
  resourceName: string
) {
  return (props: ReturnProps): React.ReactElement<ComponentProps<T, U>> => {
    const [initial, setInitial] = useState<T>();
    const [resource, setResource] = useState<T>();

    useEffect(() => {
      (async function () {
        const response = await axios.get(END_POINT + resourceURL);

        setInitial(response.data);
        setResource(response.data);
      })();
    }, []);

    function changeResourceHandler(updates: U) {
      setResource(prevUser => (prevUser ? { ...prevUser, ...updates } : undefined));
    }

    async function postResourceHandler(e: React.FormEvent) {
      e.preventDefault();

      const response = await axios.post(END_POINT + resourceURL, { [resourceName]: resource });
      setInitial(response.data);
      setResource(response.data);
    }

    function resetResourceHandler() {
      setResource(initial);
    }

    if (!resource) {
      return <h3>User is undefined</h3>;
    }

    const tossProps = {
      ...props,
      resource,
      onChange: changeResourceHandler,
      onPost: postResourceHandler,
      onReset: resetResourceHandler,
    };

    return <Component {...tossProps} />;
  };
}
