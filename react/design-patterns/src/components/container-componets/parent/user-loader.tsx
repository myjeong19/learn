import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { type User } from '../child/user-info';

type UserComponentProps = {
  user: User | null;
};

type UserLoaderProps = {
  children: React.ReactElement<UserComponentProps>;
  userId: string;
};
export default function UserLoader(props: UserLoaderProps) {
  const { children, userId } = props;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`http://localhost:9090/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        throw new Error(error as string);
      }
    })();
  }, [userId]);

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement<UserComponentProps>(child, { user });
        }

        return child;
      })}
    </>
  );
}
