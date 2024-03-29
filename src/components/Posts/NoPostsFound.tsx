import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

const NoPostsFound = () => {
  const navigate = useNavigate();
  const newPostHandler = () => {
    navigate(`/new-post`, { replace: true });
  };

  return (
    <div className="centered error-msg">
      <p>No posts found!</p>
      <Button
        displaystyle="button_std"
        onClick={newPostHandler}
        title={'Add Post'}
      >
        Add a Post
      </Button>
    </div>
  );
};

export default NoPostsFound;
