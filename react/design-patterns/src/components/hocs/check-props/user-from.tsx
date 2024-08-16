import includeUpdatable from './include-updatable';
import includeUpdatableResource from './include-updatable-resource';

import { type User } from './user-info';

import { type ComponentProps } from './include-updatable';

export const UserInfoForm = includeUpdatable((props: ComponentProps) => {
  const { user, onChangeUser, onPostUser, onResetUser } = props;

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeUser({ name: e.target.value });
  }

  return user ? (
    <form onSubmit={onPostUser}>
      <div>
        <label>Name:</label>
        <input type="text" value={user.name} onChange={changeHandler} />
      </div>

      <button type="button" onClick={onResetUser}>
        Reset
      </button>
      <button>Submit</button>
    </form>
  ) : (
    <h3>Loading...</h3>
  );
}, 3);

export const ResourceForm = includeUpdatableResource<User, { name: string }>(
  props => {
    const { resource, onChange, onPost, onReset } = props;

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
      onChange({ name: e.target.value });
    }

    return resource ? (
      <form onSubmit={onPost}>
        <div>
          <label>Name:</label>
          <input type="text" value={resource.name} onChange={changeHandler} />
        </div>

        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button>Submit</button>
      </form>
    ) : (
      <h3>Loading...</h3>
    );
  },
  'users/1',
  'user'
);
