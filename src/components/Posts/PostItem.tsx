import { useContext } from 'react';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';

import classes from './PostItem.module.css';

import AuthContext from '../../context/auth-context';

interface PostItemProps {
  content: string;
  author: User;
  timestamp: Date;
  comments: number;
  likes: number;
}
const PostItem: React.FC<PostItemProps> = ({
  content,
  author,
  timestamp,
  comments,
  likes,
}) => {
  const authCtx = useContext(AuthContext);
  const userID =
    authCtx.userData && authCtx.userData.id ? authCtx.userData.id : null;

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
            <span className={classes.icon}>({comments})</span>
            <span className={classes.icon}>({likes})</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
