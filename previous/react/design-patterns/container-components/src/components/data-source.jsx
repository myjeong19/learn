import { useState, useEffect, Children, isValidElement, cloneElement } from 'react';

export const DataSource = ({ getData = () => {}, resouceName, children }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return (
    <>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { [resouceName]: resource });
        }

        return child;
      })}
    </>
  );
};
