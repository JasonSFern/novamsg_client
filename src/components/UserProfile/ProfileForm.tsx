import { Fragment, createRef, useContext, useState, useEffect } from 'react';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/use-axios';
import { changeUserPass } from '../../lib/api';

import AuthContext from '../../context/auth-context';

import classes from './UserProfile.module.css';
import { PasswordChangeInput, User } from '../../interfaces/user.interface';

const ProfileForm: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [statusMessageType, setStatusMessageType] = useState<string>('success');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sendRequest, status, data, error } = useAxios<
    PasswordChangeInput,
    User
  >(changeUserPass);

  const currentPasswordInputRef = createRef<HTMLInputElement>();
  const newPasswordInputRef = createRef<HTMLInputElement>();
  const newPasswordInputConfRef = createRef<HTMLInputElement>();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let enteredCurrentPassword,
      enteredNewPassword,
      enteredNewPasswordConf,
      user_id;

    enteredCurrentPassword = currentPasswordInputRef.current?.value;
    enteredNewPassword = newPasswordInputRef.current?.value;
    enteredNewPasswordConf = newPasswordInputConfRef.current?.value;
    user_id = authCtx.userData?.id;

    if (
      user_id &&
      enteredCurrentPassword &&
      enteredNewPassword &&
      enteredNewPassword === enteredNewPasswordConf
    ) {
      setIsLoading(true);

      sendRequest({
        id: user_id,
        current_password: enteredCurrentPassword,
        new_password: enteredNewPassword,
      });
    } else {
      setShowStatusMessage(true);
      setStatusMessage('New passwords must match');
      setStatusMessageType('error');
    }
  };

  useEffect(() => {
    if (status === 'completed') {
      setIsLoading(false);

      if (error) {
        setStatusMessage(error);
        setStatusMessageType('error');
      } else {
        setStatusMessage('Your password has been updated');
        setStatusMessageType('success');

        if (currentPasswordInputRef.current != null)
          currentPasswordInputRef.current.value = '';
        if (newPasswordInputRef.current != null)
          newPasswordInputRef.current.value = '';
        if (newPasswordInputConfRef.current != null)
          newPasswordInputConfRef.current.value = '';
      }
      setShowStatusMessage(true);
    }
  }, [status]);

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
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status !== 'pending' && (
        <form onSubmit={submitHandler}>
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
            <input
              ref={newPasswordInputRef}
              type="password"
              id="new-password"
            />
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
      )}
    </section>
  );
};

export default ProfileForm;
