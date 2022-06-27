import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { DeleteContentOutput } from '../../interfaces/content.interface';
import { PostLike, PostLikesInput } from '../../interfaces/post.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import CommentIcon from '../UI/Icon/CommentIcon';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './PostItem.module.css';

import AuthContext from '../../context/auth-context';

import useAxios from '../../hooks/use-axios';
import { togglePostLike, deletePost } from '../../lib/api';

import { userLiked, itemCount } from '../../lib/content';

interface PostItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  comments: number;
  likes: PostLike[];
  refreshlist?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  content,
  author,
  timestamp,
  comments,
  likes,
  refreshlist,
}) => {
  const { sendRequest: sendRequestPostLike, data: likeCount } = useAxios<
    PostLikesInput,
    PostLike[]
  >(togglePostLike);
  const { sendRequest: sendRequestPostDelete, data: deleteData } = useAxios<
    number,
    DeleteContentOutput
  >(deletePost);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;
  const disable_btn = false;

  const viewPostHandler = () => {
    navigate(`/posts/${id}`, { replace: true });
  };

  const editPostHandler = () => {
    navigate(`/edit-post/${id}`, { replace: true });
  };

  const deletePostHandler = () => {
    if (userID) {
      sendRequestPostDelete(id).then(refreshlist);
    }
  };

  const toggleLikeHandler = () => {
    if (userID) {
      sendRequestPostLike({ user_id: userID, post_id: id });
    }
  };

  useEffect(() => {
    console.log('ewbgkeht');
    sendRequestPostLike({ post_id: id });
  }, [sendRequestPostLike]);

  return (
    <Card>
      <div className={classes.post}>
        <div className={classes.content}>
          <h2>{content}</h2>
        </div>
        <div className={classes.footer}>
          <p>
            {author.username} : {timestamp}
          </p>
          <div className={classes.actions}>
            {userID && userID === author.id && (
              <Fragment>
                <Button
                  title="Edit Post"
                  onClick={editPostHandler}
                  displaystyle="button_icon"
                >
                  <span className={classes.icon}>
                    <EditIcon />
                  </span>
                </Button>
                <Button
                  title="Delete Post"
                  onClick={deletePostHandler}
                  displaystyle="button_icon"
                >
                  <span className={classes.icon}>
                    <DeleteIcon />
                  </span>
                </Button>
              </Fragment>
            )}
            <Button
              title="View Post"
              displaystyle="button_icon"
              onClick={viewPostHandler}
            >
              <span className={classes.icon}>
                <CommentIcon /> ({comments})
              </span>
            </Button>
            <Button
              title="Like Post"
              disabled={disable_btn}
              displaystyle="button_icon"
              onClick={toggleLikeHandler}
              toggled={userLiked(likeCount, userID)}
            >
              <span className={classes.icon}>
                <LikeIcon /> ({itemCount(likeCount)})
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
