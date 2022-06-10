import { createRef, Fragment } from 'react';

import Button from '../UI/Button/Button';

import classes from './RegisterForm.module.css';

const RegisterForm: React.FC = (props) => {
  const emailInputRef = createRef<HTMLInputElement>();
  const usernameInputRef = createRef<HTMLInputElement>();
  const passwordInputRef = createRef<HTMLInputElement>();

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form>
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
          <Fragment>
            <Button
              title="Create Account"
              type="submit"
              displaystyle="button_outline"
            >
              Create Account
            </Button>
          </Fragment>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
