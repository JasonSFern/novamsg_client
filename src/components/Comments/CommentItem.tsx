import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { DeleteContentOutput } from '../../interfaces/content.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './CommentItem.module.css';

import AuthContext from '../../context/auth-context';

import useAxios from '../../hooks/use-axios';
import { toggleCommentLike, deleteComment } from '../../lib/api';

import {
  formattedDate,
  userLiked,
  itemCount,
  itemEdited,
} from '../../lib/content';
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
  edited,
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

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;
  const disable_btn = userID ? false : true;

  const editCommentHandler = () => {
    navigate(`/edit-comment/${id}`, { replace: true });
  };

  const deleteCommentHandler = () => {
    if (userID) {
      sendRequestCommentDelete(id).then(refreshlist);
    }
  };

  const confirmDeleteHandler = () => {
    setShowDialog(false);
    deleteCommentHandler();
  };

  const cancelDeleteHandler = () => {
    setShowDialog(false);
  };

  const openDeleteConfirmHandler = () => {
    setShowDialog(true);
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
    <Fragment>
      <ConfirmDialog
        // @ts-ignore
        showDialog={showDialog}
        confirmCallback={confirmDeleteHandler}
        cancelCallback={cancelDeleteHandler}
        message="Deleting this cannot be undone. Do you wish to continue?"
      />
      <li className={classes.item}>
        <Card>
          <div className={classes.post}>
            <div className={classes.content}>
              <h2>{content}</h2>
            </div>
            <div className={classes.footer}>
              <p>
                @{author.username} : {formattedDate(timestamp)}&nbsp;
                {itemEdited(edited)}
              </p>
              <div className={classes.actions}>
                {userID && userID === author.id && (
                  <Fragment>
                    <Button
                      title="Edit"
                      onClick={editCommentHandler}
                      displaystyle="button_icon"
                    >
                      <span className={classes.icon}>
                        <EditIcon />
                      </span>
                    </Button>
                    <Button
                      title="Delete"
                      onClick={openDeleteConfirmHandler}
                      displaystyle="button_icon"
                    >
                      <span className={classes.icon}>
                        <DeleteIcon />
                      </span>
                    </Button>
                  </Fragment>
                )}
                <Button
                  title="Like"
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
    </Fragment>
  );
};

export default CommentItem;
