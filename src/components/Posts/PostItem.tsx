import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import classes from './PostItem.module.css';

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

  const viewPostHandler = () => {
    navigate(`/posts/${id}`, { replace: true });
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
