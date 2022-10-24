import { AUTH_CREATE_USER_ENDPOINT } from '../config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';
import { setCookie } from 'src/components/cookies';

const SignUpPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [onSubmit, setLoader] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  return (
    <div className="SignUpBackground">
      {onSubmit && (
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}

      <div
        className={
          onSubmit === null
            ? 'SignUp'
            : onSubmit
            ? 'SignUp-hidden'
            : 'SignUp--no-anim'
        }
      >
        <p
          className={
            onSubmit === false ? 'SignUpTitle--no-anim' : 'SignUpTitle'
          }
        >
          Sign Up
        </p>
        <form
          className="SignUpForm"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoader(true);

            const endpoint = `${AUTH_CREATE_USER_ENDPOINT}?${new URLSearchParams(
              {
                username,
                password,
              },
            )}
            `;

            const authPayload = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const authResult = await authPayload.json();

            if (authResult?.token) {
              setCookie('user', JSON.stringify(authResult), 7);
              navigate('/');
              return;
            }

            console.log('res', authResult);

            if (authResult?.Error) {
              setError(authResult.Error);
            }

            setLoader(false);
          }}
        >
          <div
            className={
              onSubmit === false
                ? 'SignUpUsernameInputWrap--no-anim'
                : 'SignUpUsernameInputWrap'
            }
          >
            <p className="InputText">Username</p>
            <input
              className="Input"
              type="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div
            className={
              onSubmit === false
                ? 'SignUpPasswordInputWrap--no-anim'
                : 'SignUpPasswordInputWrap'
            }
          >
            <p className="InputText">Password</p>
            <input
              className="Input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className={
              onSubmit === false
                ? 'SignUpSubmitButton--no-anim'
                : 'SignUpSubmitButton'
            }
          >
            Submit
          </button>

          {error && <p className="SignUpError">{error}</p>}

          <button
            className={
              onSubmit === false
                ? 'LogInRedirectButton--no-anim'
                : 'LogInRedirectButton'
            }
            type="button"
            onClick={() => navigate('/log-in')}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
