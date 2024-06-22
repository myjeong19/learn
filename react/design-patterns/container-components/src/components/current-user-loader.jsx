import { useState, useEffect, Children, isValidElement, cloneElement } from 'react';
import axios from 'axios';

export const CurrentUserLoader = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/current-user');
      setUser(response.data);
    })();
  }, []);

  return (
    <>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { user });
        }

        return child;
      })}
    </>
  );
};
