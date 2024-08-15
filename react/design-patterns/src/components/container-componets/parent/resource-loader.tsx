import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { type User } from '../child/user-info';
import { type Book } from '../child/book-info';

export type ComponentProps = {
  user: User | Book | null;
};

type ResourceLoaderProps = {
  resourceUrl: string;
  resourceName: 'user' | 'book';
  children: React.ReactElement<ComponentProps>;
};

export default function ResourceLoader(props: ResourceLoaderProps) {
  const { resourceName, resourceUrl, children } = props;

  const [resource, setResource] = useState<User | Book | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get('http://localhost:9090' + resourceUrl);
        setResource(response.data);
      } catch (error) {
        throw new Error(error as string);
      }
    })();
  }, [resourceUrl]);

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement<ComponentProps>(child, { [resourceName]: resource });
        }

        return child;
      })}
    </>
  );
}
