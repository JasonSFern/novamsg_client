import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import classes from './PostItem.module.css';

import AuthContext from '../../context/auth-context';

interface PostItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  comments: number;
  likes: number;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  content,
  author,
  timestamp,
  comments,
  likes,
}) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

  const viewPostHandler = () => {
    navigate(`/posts/${id}`, { replace: true });
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
              // <Fragment>
              <Button
                title="Edit"
                onClick={editPostHandler}
                displaystyle="button_icon"
              >
                <span className={classes.icon}>Edit</span>
              </Button>
            )}
            <Button
              title="View Post"
              displaystyle="button_icon"
              onClick={viewPostHandler}
            >
              Comment
            </Button>
            <span className={classes.icon}>({comments})</span>
            <span className={classes.icon}>({likes})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
