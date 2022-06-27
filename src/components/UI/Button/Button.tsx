import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  title: string;
  displaystyle: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  toggled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  displaystyle,
  type,
  disabled,
  onClick,
  children,
  toggled,
}) => {
  return (
    <button
      className={`${classes.button} ${classes[displaystyle]} ${
        toggled ? classes.button_toggled : ''
      }`}
      title={title}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
