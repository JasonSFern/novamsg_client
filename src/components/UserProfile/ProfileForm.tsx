import { Fragment, createRef, useContext, useState } from 'react';

import Button from '../UI/Button/Button';

import AuthContext from '../../context/auth-context';

import classes from './UserProfile.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const [showStatusMessage, setShowStatusMessage] = useState(false);
  const [statusMessageType, setStatusMessageType] = useState('success');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentPasswordInputRef = createRef<HTMLInputElement>();
  const newPasswordInputRef = createRef<HTMLInputElement>();
  const newPasswordInputConfRef = createRef<HTMLInputElement>();

  const logoutHandler = () => {
    authCtx.logout();
  };

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
      <h1>User Profile</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="current-password">Current Password</label>
          <input
            ref={currentPasswordInputRef}
            type="password"
            id="current-password"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input ref={newPasswordInputRef} type="password" id="new-password" />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirm-new-password">Confirm New Password</label>
          <input
            ref={newPasswordInputConfRef}
            type="password"
            id="confirm-new-password"
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <Fragment>
              <Button
                title="Change Password"
                type="submit"
                displaystyle="button_outline"
              >
                Change Password
              </Button>
              <Button
                title="Logout"
                displaystyle="button_outline"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </Fragment>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
