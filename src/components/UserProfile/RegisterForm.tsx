import { createRef, Fragment, useContext, useEffect, useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

import useAxios from '../../hooks/use-axios';
import { register } from '../../lib/api';

import { RegisterInput, User } from '../../interfaces/user.interface';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import ReCaptchaBadge from '../UI/ReCaptchaBadge/ReCaptchaBadge';

import classes from './UserProfile.module.css';

import AuthContext from '../../context/auth-context';

export interface RegisterFormProps {
  onSwitchAuthModeHandler: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchAuthModeHandler,
}) => {
  const authCtx = useContext(AuthContext);
  // const reCaptchaKey = authCtx.reCaptchaKey;

  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [statusMessageType, setStatusMessageType] = useState<string>('success');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const { sendRequest, status, data, error } = useAxios<RegisterInput, User>(
    register
  );

  const emailInputRef = createRef<HTMLInputElement>();
  const usernameInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();
  // const reCaptchaRegRef = createRef<ReCAPTCHA>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let enteredEmail, enteredUsername, enteredPassword;

    if (emailInputRef.current != null)
      enteredEmail = emailInputRef.current?.value;

    if (usernameInputRef.current != null)
      enteredUsername = usernameInputRef.current?.value;

    if (passwordInputRef.current != null)
      enteredPassword = passwordInputRef.current?.value;

    // const reCaptchaRegToken = await reCaptchaRegRef.current?.executeAsync();
    // reCaptchaRegRef.current?.reset();

    if (enteredEmail && enteredUsername && enteredPassword) {
      setIsLoading(true);

      sendRequest({
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        // token: reCaptchaRegToken,
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
        setStatusMessage(
          'Registration successful! You may now login to your newly created account'
        );
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
                <Button
                  title="Login to Existing Account"
                  type="button"
                  displaystyle="button_outline"
                  onClick={onSwitchAuthModeHandler}
                >
                  Login with existing account
                </Button>
              </Fragment>
            )}
            {isLoading && <p className="gen-message">Creating new user...</p>}
          </div>
        </form>
      )}
      {/* <ReCaptchaBadge align="center" /> */}
      {/* <ReCAPTCHA
        sitekey={reCaptchaKey}
        size="invisible"
        ref={reCaptchaRegRef}
      /> */}
    </section>
  );
};

export default RegisterForm;
