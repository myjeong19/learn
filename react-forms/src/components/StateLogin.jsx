import { useState } from 'react';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { Input } from './Input';
import { useInput } from './hooks/useInput';

export default function StateLogin() {
  // 262-3. 커스텀 훅 useInuput 사용
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', value => isEmail(value) && isNotEmpty(value));
  // 262-6.validationFn으로 넘겨줄 함수 정의
  //   enteredValue를 value 값으로 넘겨받고, isEmail과 isNotEmpty 함수의 인자로 넘겨줌.

  // 262-4. isEmail, isNotEmpty, hasMinLength 커스텀 훅에 의탁.

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', value => hasMinLength(value, 10));

  const handleSubmit = event => {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          value={emailValue}
          error={emailHasError && 'Please enter a valid email address.'}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password.'}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
        />
      </div>
      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
       
    </form>
  );
}
