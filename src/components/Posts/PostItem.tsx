import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { DeletePostOutput } from '../../interfaces/post.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import CommentIcon from '../UI/Icon/CommentIcon';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './PostItem.module.css';

import AuthContext from '../../context/auth-context';

import useAxios from '../../hooks/use-axios';
import { deletePost } from '../../lib/api';

interface PostItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  comments: number;
  likes: number;
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
  const { sendRequest: sendRequestPostDelete, data: deleteData } = useAxios<
    number,
    DeletePostOutput
  >(deletePost);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

  if (deleteData?.success && refreshlist) {
    refreshlist();
  }

  const viewPostHandler = () => {
    navigate(`/posts/${id}`, { replace: true });
  };

  const deletePostHandler = () => {
    if (userID) {
      sendRequestPostDelete(id);
    }
  };

  const editPostHandler = () => {
    navigate(`/edit-post/${id}`, { replace: true });
  };

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
                  title="Edit"
                  onClick={editPostHandler}
                  displaystyle="button_icon"
                >
                  <span className={classes.icon}>
                    <EditIcon />
                  </span>
                </Button>
                <Button
                  title="Delete"
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
            <Button title="Like Post" displaystyle="button_icon">
              <span className={classes.icon}>
                <LikeIcon /> ({likes})
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
