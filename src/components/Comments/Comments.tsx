import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAxios from '../../hooks/use-axios';
import { getPostComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import FormMini from '../Form/FormMini';
import Button from '../UI/Button/Button';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  let { postId } = params;
  if (!postId) {
    postId = '0';
  }

  const {
    sendRequest,
    status,
    data: loadedComments,
  } = useAxios<string, any>(getPostComments);
  // TODO: Fix interfaces bullshit

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

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = (
      <CommentsList refresh={addedCommentHandler} comments={loadedComments} />
    );
  }

  if (
    status === 'completed' &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p>No comments added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h1>User Comments</h1>
      {comments}
      {!isAddingComment && (
        <div className={classes.actions}>
          <Button
            title="Add Comment"
            displaystyle="button_std"
            onClick={startAddCommentHandler}
          >
            Add a Comment
          </Button>
        </div>
      )}
      {isAddingComment && (
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
