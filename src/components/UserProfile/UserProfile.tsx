import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfileForm from './ProfileForm';

import AuthContext from '../../context/auth-context';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const didSubmitModalContent = (
    <React.Fragment>
      {!isLoggedIn && isLogin && (
        <LoginForm onSwitchAuthModeHandler={switchAuthModeHandler} />
      )}
      {!isLoggedIn && !isLogin && (
        <RegisterForm onSwitchAuthModeHandler={switchAuthModeHandler} />
      )}
      {isLoggedIn && <ProfileForm />}
    </React.Fragment>
  );

  return <Modal onClose={onClose}>{didSubmitModalContent}</Modal>;
};

export default UserProfile;
