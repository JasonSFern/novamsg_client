import { createRef, Fragment, useEffect, useState } from 'react';
import useAxios from '../../hooks/use-axios';
import { RegisterInput, User } from '../../interfaces/user.interface';
import { register } from '../../lib/api';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import classes from './RegisterForm.module.css';

const RegisterForm: React.FC = () => {
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [statusMessageType, setStatusMessageType] = useState<string>('success');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const { fetchData, status, data, error } = useAxios<RegisterInput, User>(
    register
  );

  const emailInputRef = createRef<HTMLInputElement>();
  const usernameInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let enteredEmail, enteredUsername, enteredPassword;

    if (emailInputRef.current != null)
      enteredEmail = emailInputRef.current?.value;

    if (usernameInputRef.current != null)
      enteredUsername = usernameInputRef.current?.value;

    if (passwordInputRef.current != null)
      enteredPassword = passwordInputRef.current?.value;

    if (enteredEmail && enteredUsername && enteredPassword) {
      setIsLoading(true);

      fetchData({
        username: enteredUsername,
        email: enteredEmail,
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
        setStatusMessage('Registration Successful');
        setStatusMessageType('success');
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
      <h1>Sign Up</h1>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status !== 'pending' && (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
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
                  title="Create Account"
                  type="submit"
                  displaystyle="button_outline"
                >
                  Create Account
                </Button>
              </Fragment>
            )}
            {isLoading && <p>Creating new user...</p>}
          </div>
        </form>
      )}
    </section>
  );
};

export default RegisterForm;