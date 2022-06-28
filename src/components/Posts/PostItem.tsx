import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';
import { DeleteContentOutput } from '../../interfaces/content.interface';
import { PostLike, PostLikesInput } from '../../interfaces/post.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import CommentIcon from '../UI/Icon/CommentIcon';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './PostItem.module.css';

import AuthContext from '../../context/auth-context';

import useAxios from '../../hooks/use-axios';
import { togglePostLike, deletePost } from '../../lib/api';

import {
  formattedDate,
  userLiked,
  itemCount,
  itemEdited,
} from '../../lib/content';

interface PostItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  edited: boolean;
  comments: number;
  refreshlist?: () => void;
  show_comment_btn: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  content,
  author,
  edited,
  timestamp,
  comments,
  refreshlist,
  show_comment_btn,
}) => {
  const { sendRequest: sendRequestPostLike, data: likeCount } = useAxios<
    PostLikesInput,
    PostLike[]
  >(togglePostLike);
  const { sendRequest: sendRequestPostDelete, data: deleteData } = useAxios<
    number,
    DeleteContentOutput
  >(deletePost);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;
  const disable_btn = userID ? false : true;

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

  const confirmDeleteHandler = () => {
    setShowDialog(false);
    deletePostHandler();
  };

  const cancelDeleteHandler = () => {
    setShowDialog(false);
  };

  const openDeleteConfirmHandler = () => {
    setShowDialog(true);
  };

  const toggleLikeHandler = () => {
    if (userID) {
      sendRequestPostLike({ user_id: userID, post_id: id });
    }
  };

  useEffect(() => {
    sendRequestPostLike({ post_id: id });
  }, [sendRequestPostLike]);

  return (
    <Fragment>
      <ConfirmDialog
        // @ts-ignore
        showDialog={showDialog}
        confirmCallback={confirmDeleteHandler}
        cancelCallback={cancelDeleteHandler}
        message="Deleting cannot be undone. Do you wish to continue?"
      />
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
                    onClick={editPostHandler}
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
              {show_comment_btn && (
                <Button
                  title="Comments"
                  displaystyle="button_icon"
                  onClick={viewPostHandler}
                >
                  <span className={classes.icon}>
                    <CommentIcon /> ({comments})
                  </span>
                </Button>
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
    </Fragment>
  );
};

export default PostItem;
