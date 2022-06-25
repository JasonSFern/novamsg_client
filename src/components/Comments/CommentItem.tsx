import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import EditIcon from '../UI/Icon/EditIcon';
import DeleteIcon from '../UI/Icon/DeleteIcon';
import LikeIcon from '../UI/Icon/LikeIcon';

import classes from './CommentItem.module.css';

import AuthContext from '../../context/auth-context';

interface CommentItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  edited: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  author,
  timestamp,
}) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

  const editCommentHandler = () => {
    navigate(`/edit-comment/${id}`, { replace: true });
  };

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
                  <Button title="Delete Comment" displaystyle="button_icon">
                    <span className={classes.icon}>
                      <DeleteIcon />
                    </span>
                  </Button>
                </Fragment>
              )}
              <Button title="Like Comment" displaystyle="button_icon">
                <span className={classes.icon}>
                  <LikeIcon /> ({1})
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
