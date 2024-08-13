import { useState, useRef } from 'react';

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    const values = {
      email: email.current.value,
      password: password.current.value,
    };

    const emailIsvalid = values.email.includes('@');

    if (!emailIsvalid) {
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
    // event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
          <div className='control-error'>
            {emailIsInvalid && <p>Please entere a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
