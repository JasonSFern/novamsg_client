import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal/Modal';
import LoginForm from './LoginForm';

import RegisterForm from './RegisterForm';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const isLoggedIn = false;

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
    </React.Fragment>
  );

  return <Modal onClose={onClose}>{didSubmitModalContent}</Modal>;
};

export default UserProfile;
