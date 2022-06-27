import { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { DeleteContentOutput } from '../../interfaces/content.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './CommentItem.module.css';

import AuthContext from '../../context/auth-context';

import useAxios from '../../hooks/use-axios';
import { toggleCommentLike, deleteComment } from '../../lib/api';

import { userLiked, itemCount } from '../../lib/content';
import {
  CommentLike,
  CommentLikesInput,
} from '../../interfaces/comment.interface';

interface CommentItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  edited: boolean;
  refreshlist: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  author,
  timestamp,
  refreshlist,
}) => {
  const { sendRequest: sendRequestCommentLike, data: likeCount } = useAxios<
    CommentLikesInput,
    CommentLike[]
  >(toggleCommentLike);
  const { sendRequest: sendRequestCommentDelete, data: deleteData } = useAxios<
    number,
    DeleteContentOutput
  >(deleteComment);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;
  const disable_btn = false;

  const editCommentHandler = () => {
    navigate(`/edit-comment/${id}`, { replace: true });
  };

  const deleteCommentHandler = () => {
    if (userID) {
      sendRequestCommentDelete(id).then(refreshlist);
    }
  };

  const toggleLikeHandler = () => {
    if (userID) {
      sendRequestCommentLike({ user_id: userID, comment_id: id });
    }
  };

  useEffect(() => {
    sendRequestCommentLike({ comment_id: id });
  }, [sendRequestCommentLike]);

  return (
    <li className={classes.item}>
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
                    title="Edit Comment"
                    onClick={editCommentHandler}
                    displaystyle="button_icon"
                  >
                    <span className={classes.icon}>
                      <EditIcon />
                    </span>
                  </Button>
                  <Button
                    title="Delete Comment"
                    onClick={deleteCommentHandler}
                    displaystyle="button_icon"
                  >
                    <span className={classes.icon}>
                      <DeleteIcon />
                    </span>
                  </Button>
                </Fragment>
              )}
              <Button
                title="Like Comment"
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
    </li>
  );
};

export default CommentItem;
