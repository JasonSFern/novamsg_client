import React from 'react';

import classes from './Backdrop.module.css';

const Stars: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <div className={classes.bg}></div>
      <div className={classes['star-field']}>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
      </div>
      {children}
    </React.Fragment>
  );
};

export default Stars;
