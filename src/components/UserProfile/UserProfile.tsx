import React from 'react';

import Modal from '../UI/Modal/Modal';

import RegisterForm from './RegisterForm';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const didSubmitModalContent = (
    <React.Fragment>
      <RegisterForm />
    </React.Fragment>
  );

  return <Modal onClose={onClose}>{didSubmitModalContent}</Modal>;
};

export default UserProfile;
