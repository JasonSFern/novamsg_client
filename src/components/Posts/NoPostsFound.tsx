import classes from './NoPostsFound.module.css';

const NoPostsFound = () => {
  return (
    <div className={classes.noposts}>
      <p>No posts found!</p>
    </div>
  );
};

export default NoPostsFound;
