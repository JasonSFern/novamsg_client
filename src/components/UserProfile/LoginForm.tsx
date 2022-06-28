import { useState, useContext, useEffect, Fragment, createRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useAxios from '../../hooks/use-axios';
import { login } from '../../lib/api';

import { LoginInput, UserSession } from '../../interfaces/user.interface';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import classes from './UserProfile.module.css';

import AuthContext from '../../context/auth-context';

export interface LoginFormProps {
  onSwitchAuthModeHandler: () => void;
  expiredSession?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchAuthModeHandler,
  expiredSession,
}) => {
  const navigate = useNavigate();

  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [statusMessageType, setStatusMessageType] = useState<string>('success');
  const [statusMessage, setStatusMessage] = useState<string>('');

  if (expiredSession) {
    setShowStatusMessage(true);
    setStatusMessageType('error');
    setStatusMessage(
      'You have been logged out due to inactivity. Please login to access this page'
    );
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sendRequest, status, data, error } = useAxios<
    LoginInput,
    UserSession
  >(login);

  const usernameInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let enteredUsername, enteredPassword;

    if (usernameInputRef.current != null)
      enteredUsername = usernameInputRef.current?.value;

    if (passwordInputRef.current != null)
      enteredPassword = passwordInputRef.current?.value;

    if (enteredUsername && enteredPassword) {
      setIsLoading(true);

      sendRequest({
        username: enteredUsername,
        password: enteredPassword,
      });
    }
  };

  useEffect(() => {
    if (status === 'completed') {
      setIsLoading(false);

      if (error) {
        setStatusMessage(error);
        setStatusMessageType('error');
      } else {
        console.log('success_msg: ', data);
        setStatusMessage('Login successful!');
        setStatusMessageType('success');

        if (data) {
          authCtx.login(
            data.session.token,
            data.session.user_data,
            data.session.expires
          );

          navigate(`/posts/`, { replace: true });
        }
      }
      setShowStatusMessage(true);
    }
  }, [status]);

  return (
    <section className={classes.auth}>
      {showStatusMessage && (
        <div
          className={
            statusMessageType === 'error' ? classes.error : classes.success
          }
        >
          {statusMessage}
        </div>
      )}
      <h1>Login</h1>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status !== 'pending' && (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Your Username</label>
            <input
              type="username"
              id="username"
              required
              ref={usernameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <Fragment>
                <Button
                  title="Login"
                  type="submit"
                  displaystyle="button_outline"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  title="Create Account"
                  displaystyle="button_outline"
                  onClick={onSwitchAuthModeHandler}
                >
                  Create new account
                </Button>
              </Fragment>
            )}
            {isLoading && <p>Sending request...</p>}
          </div>
        </form>
      )}
    </section>
  );
};

export default LoginForm;
