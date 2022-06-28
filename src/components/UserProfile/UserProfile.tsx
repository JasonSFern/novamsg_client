import React, { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfileForm from './ProfileForm';

import AuthContext from '../../context/auth-context';

interface UserProfileProps {
  onClose?: () => void;
  expiredSession?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  onClose,
  expiredSession,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const didSubmitModalContent = (
    <React.Fragment>
      {!isLoggedIn && isLogin && (
        <LoginForm
          expiredSession={expiredSession}
          onSwitchAuthModeHandler={switchAuthModeHandler}
        />
      )}
      {!isLoggedIn && !isLogin && (
        <RegisterForm onSwitchAuthModeHandler={switchAuthModeHandler} />
      )}
      {isLoggedIn && <ProfileForm />}
    </React.Fragment>
  );

  return (
    <Fragment>
      {onClose && <Modal onClose={onClose}>{didSubmitModalContent}</Modal>}
      {!onClose && <Modal>{didSubmitModalContent}</Modal>}
    </Fragment>
  );
};

export default UserProfile;
