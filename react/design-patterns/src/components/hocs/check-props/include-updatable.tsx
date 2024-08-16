import { useState, useEffect } from 'react';
import axios from 'axios';
import { type User } from './user-info';

import { END_POINT } from '../../../constants';

type ReturnProps = {};

export type ComponentProps = {
  user: User;
  onChangeUser: (updates: { name: string }) => void;
  onPostUser: (e: React.FormEvent) => Promise<void>;
  onResetUser: () => void;
};

type Component<T> = (props: T) => React.ReactElement<T>;

export default function includeUpdatable(Component: Component<ComponentProps>, userId: number) {
  return (props: ReturnProps): React.ReactElement<ComponentProps> => {
    const [initialUser, setInitialUser] = useState<User>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
      (async function () {
        const response = await axios.get(END_POINT + 'users/' + userId);

        setInitialUser(response.data);
        setUser(response.data);
      })();
    }, []);

    function changeUserHandler(updates: { name: string }) {
      setUser(prevUser => (prevUser ? { ...prevUser, ...updates } : undefined));
    }

    async function postUserHandler(e: React.FormEvent) {
      e.preventDefault();

      const response = await axios.post(END_POINT + 'users/' + userId, { user });
      setInitialUser(response.data);
      setUser(response.data);
    }

    function resetUserHandler() {
      setUser(initialUser);
    }

    if (!user) {
      return <h3>User is undefined</h3>;
    }

    const tossProps = {
      ...props,
      user: user,
      onChangeUser: changeUserHandler,
      onPostUser: postUserHandler,
      onResetUser: resetUserHandler,
    };

    return <Component {...tossProps} />;
  };
}
