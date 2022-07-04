import { Fragment, useState, useContext, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  ContentPayload,
  ContentType,
} from '../../interfaces/content.interface';

import Card from '../UI/Card/Card';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import Button from '../UI/Button/Button';
import ReCaptchaBadge from '../UI/ReCaptchaBadge/ReCaptchaBadge';

import classes from './Form.module.css';

import AuthContext from '../../context/auth-context';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useCallbackPrompt } from '../../hooks/use-callback-prompt';

interface PostFormProps {
  isLoading: boolean;
  type: ContentType;
  edit?: {
    id: number;
    content: string;
  };
  onEdit?: (i: number, t: ContentType, o: ContentPayload) => void;
  onAdd?: (t: ContentType, o: ContentPayload) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  isLoading,
  type,
  edit,
  onEdit,
  onAdd,
}) => {
  const authCtx = useContext(AuthContext);
  const reCaptchaKey = authCtx.reCaptchaKey;

  const defaultValue = edit && edit.content ? edit.content : '';
  const buttonLabel = onEdit ? 'Update' : 'Post';

  const contentInputRef = createRef<HTMLTextAreaElement>();
  const reCaptchaRef = createRef<ReCAPTCHA>();

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

    const enteredContent = contentInputRef.current?.value;
    const reCaptchaToken = await reCaptchaRef.current?.executeAsync();
    reCaptchaRef.current?.reset();

    const user_id = authCtx.userData?.id;

    if (enteredContent && user_id) {
      if (edit && onEdit) {
        onEdit(edit.id, type, {
          user_id: user_id,
          content: enteredContent,
          token: reCaptchaToken,
        });
      } else if (onAdd) {
        onAdd(type, {
          user_id: user_id,
          content: enteredContent,
          token: reCaptchaToken,
        });
      }
      event.stopPropagation();
    }
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
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <textarea
              id="content"
              rows={5}
              defaultValue={defaultValue}
              ref={contentInputRef}
              onChange={formFocusHandler}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <Button
              title={'Submit'}
              type="submit"
              displaystyle="button_std"
              onClick={finishingEnteringHandler}
            >
              {buttonLabel}
            </Button>
            <ReCaptchaBadge align="left" />
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default PostForm;
