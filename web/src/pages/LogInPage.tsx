import { AUTH_BASIC_ENDPOINT } from '../config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogInPage.css';
import { setCookie } from 'src/components/cookies';

const LogInPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [onSubmit, setLoader] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  return (
    <div className="LogInBackground">
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
            ? 'LogIn'
            : onSubmit
            ? 'LogIn-hidden'
            : 'LogIn--no-anim'
        }
      >
        <p
          className={onSubmit === false ? 'LogInTitle--no-anim' : 'LogInTitle'}
        >
          Log In
        </p>
        <form
          className="LogInForm"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoader(true);

            const endpoint = `${AUTH_BASIC_ENDPOINT}?${new URLSearchParams({
              username,
              password,
            })}
            `;

            const authPayload = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const authResult = await authPayload.json();

            if (authResult?.token) {
              setCookie(
                'user',
                JSON.stringify({
                  username: authResult.username,
                  token: authResult.token,
                }),
                7,
              );
              navigate('/');
              return;
            }

            console.log(authResult);
            if (authResult?.Error) {
              setError(authResult.Error);
            }

            setLoader(false);
          }}
        >
          <div
            className={
              onSubmit === false
                ? 'UsernameInputWrap--no-anim'
                : 'UsernameInputWrap'
            }
          >
            <p className="InputText">Username</p>
            <input
              className="Input"
              type="username"
              name="UserName"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div
            className={
              onSubmit === false
                ? 'PasswordInputWrap--no-anim'
                : 'PasswordInputWrap'
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
              onSubmit === false ? 'SubmitButton--no-anim' : 'SubmitButton'
            }
          >
            Submit
          </button>

          {error && <p className="LogInError">{error}</p>}

          <button
            className={
              onSubmit === false
                ? 'SignUpRedirectButton--no-anim'
                : 'SignUpRedirectButton'
            }
            type="button"
            onClick={() => navigate('/sign-up')}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
