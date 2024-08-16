// IoC

import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserInfoProps, type User } from './user-info';

import { END_POINT } from '../../../constants';

type IncludeUserReturnProps = {};

export function includeUser(
  Component: (props: UserInfoProps) => React.ReactElement,
  userId: number
) {
  return (props: IncludeUserReturnProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      (async function () {
        const response = await axios.get(END_POINT + 'users/' + userId);
        setUser(response.data);
      })();
    }, []);

    if (!user) {
      return <h3>user is null</h3>;
    }

    return <Component {...props} user={user} />;
  };
}
