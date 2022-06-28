import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '../../interfaces/comment.interface';

import useAxios from '../../hooks/use-axios';
import { getPostComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import FormMini from '../Form/FormMini';
import Button from '../UI/Button/Button';

import AuthContext from '../../context/auth-context';

const Comments = () => {
  const authCtx = useContext(AuthContext);

  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const params = useParams();

  let { postId } = params;
  if (!postId) {
    postId = '0';
  }

  const {
    sendRequest,
    status,
    data: loadedComments,
  } = useAxios<string, Comment[]>(getPostComments);

  useEffect(() => {
    if (postId) sendRequest(postId);
  }, [postId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const cancelAddCommentHandler = () => {
    setIsAddingComment(false);
  };

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    if (postId) sendRequest(postId);
  }, [sendRequest, postId]);

  let comments;

  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className={classes.comments}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {status === 'completed' &&
        (!loadedComments || loadedComments.length === 0) && (
          <p className="centered gen-message">No comments added yet!</p>
        )}
      {status === 'completed' &&
        loadedComments &&
        loadedComments.length > 0 && (
          <CommentsList
            refresh={addedCommentHandler}
            comments={loadedComments}
          />
        )}
      {authCtx.isLoggedIn && !isAddingComment && (
        <div className={classes.actions}>
          <Button
            title="Add Comment"
            displaystyle="button_std"
            onClick={startAddCommentHandler}
          >
            Add Comment
          </Button>
        </div>
      )}
      {authCtx.isLoggedIn && isAddingComment && (
        <FormMini
          postId={postId}
          onAddedComment={addedCommentHandler}
          onCancelAddComment={cancelAddCommentHandler}
        />
      )}
    </section>
  );
};

export default Comments;
