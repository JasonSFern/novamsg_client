import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  title: string;
  displaystyle: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  toggled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  displaystyle,
  type,
  disabled,
  toggled,
  children,
  onClick,
}) => {
  return (
    <div
      className={`${classes.button} ${classes[displaystyle]} ${
        toggled ? classes.button_toggled : ''
      }`}
    >
      <button
        title={title}
        type={type || 'button'}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <label className={classes.label}>{title}</label>
    </div>
  );
};

export default Button;
