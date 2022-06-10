import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  title: string;
  displaystyle: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  displaystyle,
  type,
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${classes.button} ${classes[displaystyle]}`}
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
