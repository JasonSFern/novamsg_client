import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';
import { Comment } from '../../interfaces/comment.interface';

interface CommentsListProps {
  comments: Comment[];
  refresh: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, refresh }) => {
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          author={comment.comment_author}
          timestamp={comment.updatedAt}
          edited={comment.createdAt !== comment.updatedAt}
          content={comment.content}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
