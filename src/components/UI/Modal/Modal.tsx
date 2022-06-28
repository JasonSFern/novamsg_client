import { Fragment } from 'react';

import classes from './Modal.module.css';

interface ModalProps {
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Fragment>
      {onClose && <div className={classes.backdrop} onClick={onClose} />}
      {!onClose && <div className={classes.backdrop} />}
      <div className={classes.backdrop} onClick={onClose} />
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
