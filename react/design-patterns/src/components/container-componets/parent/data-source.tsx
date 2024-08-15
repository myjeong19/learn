import React, { useState, useEffect } from 'react';
import { type User } from '../child/user-info';
import { type Book } from '../child/book-info';

export type ComponentProps = User | Book | null;

type ResourceLoaderProps = {
  resourceName: 'user' | 'book';
  getData: () => Promise<User | Book>;
  children: React.ReactElement<ComponentProps>;
};

export default function DataSource(props: ResourceLoaderProps) {
  const { resourceName, children, getData } = props;

  const [resource, setResource] = useState<ComponentProps>(null);

  useEffect(() => {
    (async function () {
      try {
        const data = await getData();
        setResource(data);
      } catch (error) {
        throw new Error(error as string);
      }
    })();
  }, []);

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
