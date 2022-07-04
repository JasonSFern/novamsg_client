import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../interfaces/post.interface';

import PostItem from '../components/Posts/PostItem';
import Comments from '../components/Comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';

import useAxios from '../hooks/use-axios';
import { getSinglePost } from '../lib/api';

const ViewPost = () => {
  const params = useParams();
  const { postId } = params;

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useAxios<string, Post>(getSinglePost, true);

  useEffect(() => {
    if (postId) sendRequest(postId);
  }, [sendRequest, postId]);

  return (
    <Fragment>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="centered gen-message">{error}</p>}
      {!loadedPost?.content && (
        <p>Post does not exists. This may be because it has been deleted</p>
      )}
      {loadedPost && (
        <PostItem
          id={loadedPost.id}
          author={loadedPost?.author}
          timestamp={loadedPost?.updatedAt}
          edited={loadedPost.createdAt !== loadedPost.updatedAt}
          content={loadedPost?.content}
          comments={loadedPost?.comments}
          show_comment_btn={true}
        />
      )}
      <Comments />
    </Fragment>
  );
};

export default ViewPost;
