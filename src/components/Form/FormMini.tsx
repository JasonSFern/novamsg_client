import { useEffect, useContext, createRef } from 'react';

import useAxios from '../../hooks/use-axios';
import { addComment } from '../../lib/api';
import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import classes from './FormMini.module.css';

import AuthContext from '../../context/auth-context';

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
  const commentTextRef = createRef<HTMLTextAreaElement>();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

  const { sendRequest, status, error } = useAxios(addComment);

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredText = commentTextRef.current?.value;

    if (enteredText && postId && userID)
      sendRequest({
        post_id: postId,
        user_id: userID,
        content: enteredText,
      });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <textarea id="comment" rows={5} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <Button title="Submit" type="submit" displaystyle="button_std">
          Post
        </Button>
        <Button
          title="Cancel"
          onClick={onCancelAddComment}
          displaystyle="button_std"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FormMini;
