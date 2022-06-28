import { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Post } from '../interfaces/post.interface';
import {
  ContentOutput,
  ContentInput,
  ContentPayload,
  ContentType,
} from '../interfaces/content.interface';

import Form from '../components/Form/Form';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';

import useAxios from '../hooks/use-axios';
import { getSinglePost, editContent } from '../lib/api';

const EditPost = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { postId } = params;

  const {
    sendRequest: sendRequestG,
    status: statusG,
    data: loadedPostG,
    error: errorG,
  } = useAxios<string, Post>(getSinglePost, true);

  const {
    sendRequest: sendRequestE,
    status: statusE,
    data: loadedPostE,
    error: errorE,
  } = useAxios<ContentInput, ContentOutput>(editContent);

  useEffect(() => {
    if (postId) sendRequestG(postId);
  }, [sendRequestG, postId]);

  useEffect(() => {
    if (statusE == 'completed') {
      navigate('/posts');
    }
  }, [statusE, navigate]);

  const editPostHandler = (
    id: number,
    type: ContentType,
    postData: ContentPayload
  ) => {
    sendRequestE({
      id: id,
      type: type,
      payload: postData,
    });
  };

  return (
    <Fragment>
      {errorG && <p className="centered focused gen-message">{errorG}</p>}
      {!loadedPostG?.content && (
        <p className="centered gen-message">No post found</p>
      )}
      {statusG === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {loadedPostG?.content && (
        <Form
          isLoading={statusG === 'pending'}
          onEdit={editPostHandler}
          edit={loadedPostG}
          type="post"
        />
      )}
    </Fragment>
  );
};

export default EditPost;
