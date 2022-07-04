import { Fragment, createRef, useEffect, useContext, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useAxios from '../../hooks/use-axios';
import { addComment } from '../../lib/api';

import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import ReCaptchaBadge from '../UI/ReCaptchaBadge/ReCaptchaBadge';

import classes from './FormMini.module.css';

import AuthContext from '../../context/auth-context';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useCallbackPrompt } from '../../hooks/use-callback-prompt';

interface FormMiniProps {
  postId: string;
  onCancelAddComment: () => void;
  onAddedComment: () => void;
}

const FormMini: React.FC<FormMiniProps> = ({
  postId,
  onCancelAddComment,
  onAddedComment,
}) => {
  const authCtx = useContext(AuthContext);
  const reCaptchaKey = authCtx.reCaptchaKey;
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

  const commentTextRef = createRef<HTMLTextAreaElement>();
  const reCaptchaRef = createRef<ReCAPTCHA>();

  const { sendRequest, status, error } = useAxios(addComment);

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const finishingEnteringHandler = () => {
    setShowDialog(false);
  };

  const formFocusHandler = () => {
    setShowDialog(true);
  };

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredText = commentTextRef.current?.value;
    const reCaptchaToken = await reCaptchaRef.current?.executeAsync();
    reCaptchaRef.current?.reset();

    if (enteredText && postId && userID)
      sendRequest({
        post_id: postId,
        user_id: userID,
        content: enteredText,
        token: reCaptchaToken,
      });
  };

  return (
    <Fragment>
      <ReCAPTCHA sitekey={reCaptchaKey} size="invisible" ref={reCaptchaRef} />
      <ConfirmDialog
        // @ts-ignore
        showDialog={showPrompt}
        confirmCallback={confirmNavigation}
        cancelCallback={cancelNavigation}
        message="All current form data will be lost. Are you sure you wish to leave?"
      />
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
        onFocus={formFocusHandler}
      >
        {status === 'pending' && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
        <div className={classes.control}>
          <textarea
            id="comment"
            rows={5}
            ref={commentTextRef}
            onChange={formFocusHandler}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <ReCaptchaBadge align="left" />
          <div>
            <Button
              title="Cancel"
              onClick={onCancelAddComment}
              displaystyle="button_std"
            >
              Cancel
            </Button>
            <Button
              title="Submit"
              type="submit"
              displaystyle="button_std"
              onClick={finishingEnteringHandler}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FormMini;
