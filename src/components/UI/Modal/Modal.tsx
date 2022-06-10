import { Fragment } from 'react';

import classes from './Modal.module.css';

const Modal: React.FC = ({ children }) => {
  return (
    <Fragment>
      <div className={classes.backdrop} />
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
