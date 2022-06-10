import { Fragment } from 'react';

import classes from './Modal.module.css';

interface ModelProps {
  onClose: () => void;
}

const Modal: React.FC<ModelProps> = ({ onClose, children }) => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={onClose} />
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
