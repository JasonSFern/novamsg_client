import { Fragment, createRef, useState, useContext } from 'react';

import Card from '../UI/Card/Card';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import classes from './Form.module.css';

import AuthContext from '../../context/auth-context';
import Button from '../UI/Button/Button';
import { ContentType } from '../../interfaces/content.interface';

interface PostFormProps {
  isLoading: boolean;
  type: ContentType;
  edit?: {
    id: number;
    content: string;
  };
  onEdit?: (
    i: number,
    t: string,
    o: { user_id: number; content: string }
  ) => void;
  onAdd?: (t: ContentType, o: { user_id: number; content: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({
  isLoading,
  type,
  edit,
  onEdit,
  onAdd,
}) => {
  const authCtx = useContext(AuthContext);

  const defaultValue = edit && edit.content ? edit.content : '';
  const contentInputRef = createRef<HTMLTextAreaElement>();

  const [isEntering, setIsEntering] = useState<boolean>(false);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hello');

    const enteredContent = contentInputRef.current?.value;
    const user_id = authCtx.userData?.id;

    if (enteredContent && user_id) {
      if (edit && onEdit) {
        onEdit(edit.id, type, {
          user_id: user_id,
          content: enteredContent,
        });
      } else if (onAdd) {
        onAdd(type, {
          user_id: user_id,
          content: enteredContent,
        });
      }
    }
  }

  const finishingEnteringHandler = () => {
    setIsEntering(false);
    console.log(isEntering);
  };

  const formFocusHandler = () => {
    setIsEntering(true);
    console.log(isEntering);
  };

  return (
    <Fragment>
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
            ></textarea>
          </div>
          <div className={classes.actions}>
            <Button
              title={'Submit'}
              type="submit"
              displaystyle="button_std"
              onClick={finishingEnteringHandler}
            >
              Post
            </Button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default PostForm;