import { Fragment } from 'react';

import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import classes from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  showDialog: boolean;
  cancelCallback: any;
  confirmCallback: any;
  message: string;
}

const DialogBox: React.FC<ConfirmDialogProps> = ({
  showDialog,
  cancelCallback,
  confirmCallback,
  message,
}) => {
  const onClose = () => {};

  return (
    <Fragment>
      {showDialog && (
        <Modal>
          <section className={classes.dialog}>
            <h1>Warning</h1>
            <div className={classes.control}>
              <label>{message}</label>
            </div>
            <div className={classes.actions}>
              <Fragment>
                <Button
                  title="No"
                  type="button"
                  displaystyle="button_outline"
                  onClick={cancelCallback}
                >
                  NO
                </Button>
                <Button
                  title="Yes"
                  type="button"
                  displaystyle="button_outline"
                  onClick={confirmCallback}
                >
                  YES
                </Button>
              </Fragment>
            </div>
          </section>
        </Modal>
      )}
    </Fragment>
  );
};
export default DialogBox;
