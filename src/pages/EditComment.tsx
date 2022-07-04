import { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Comment } from '../interfaces/comment.interface';
import {
  ContentOutput,
  ContentInput,
  ContentPayload,
  ContentType,
} from '../interfaces/content.interface';

import Form from '../components/Form/Form';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';

import useAxios from '../hooks/use-axios';
import { getSingleComment, editContent } from '../lib/api';

const EditComment = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { commentId } = params;

  const {
    sendRequest: sendRequestG,
    status: statusG,
    data: loadedCommentG,
    error: errorG,
  } = useAxios<string, Comment>(getSingleComment, true);

  const {
    sendRequest: sendRequestE,
    status: statusE,
    data: loadedPostE,
    error: errorE,
  } = useAxios<ContentInput, ContentOutput>(editContent);

  useEffect(() => {
    if (commentId) sendRequestG(commentId);
  }, [sendRequestG, commentId]);

  useEffect(() => {
    if (statusE == 'completed') {
      if (!errorE)
        navigate(`/posts/${loadedCommentG?.post_id}`, { replace: true });
    }
  }, [statusE, navigate]);

  const editCommentHandler = (
    id: number,
    type: ContentType,
    commentData: ContentPayload
  ) => {
    sendRequestE({
      id: id,
      type: type,
      payload: commentData,
    });
  };

  return (
    <Fragment>
      {errorG && <p className="centered gen-message">{errorG}</p>}
      {errorE && <p className="centered gen-message">{errorE}</p>}
      {!loadedCommentG?.content && (
        <p className="centered gen-message">No post found</p>
      )}
      {statusG === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {loadedCommentG?.content && (
        <Form
          isLoading={statusG === 'pending'}
          onEdit={editCommentHandler}
          edit={loadedCommentG}
          type="comment"
        />
      )}
    </Fragment>
  );
};

export default EditComment;
