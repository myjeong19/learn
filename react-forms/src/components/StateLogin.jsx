import { useState } from 'react';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { Input } from './Input';

const initialEnteredValues = {
  email: '',
  password: '',
};

const initialDidEdit = {
  email: false,
  password: false,
};

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState(initialEnteredValues);
  const [didEdit, setDidEdit] = useState(initialDidEdit);

  const emailIsInvalid =
    didEdit.email &&
    isEmail(enteredValues.email) &&
    isNotEmpty(enteredValues.email);

  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 10);

  const handleSubmit = event => {
    event.preventDefault();

    console.log(enteredValues);
  };

  const handleValueChange = event => {
    setEnteredValues({
      ...enteredValues,
      [event.target.name]: event.target.value,
    });
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [event.target.name]: false,
    }));
  };

  const handleInputBlur = event =>
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [event.target.name]: true,
    }));

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onBlur={handleInputBlur}
          onChange={handleValueChange}
          error={emailIsInvalid && 'Please enter a valid email address.'}
          value={enteredValues.email}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onBlur={handleInputBlur}
          onChange={handleValueChange}
          error={passwordIsInvalid && 'Please enter a valid password.'}
          value={enteredValues.password}
        />
      </div>
      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
       
    </form>
  );
}
