import { useState, useEffect, Children, isValidElement, cloneElement } from 'react';
import axios from 'axios';

export const ResourceLoader = ({ resourceUrl, resouceName, children }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

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
