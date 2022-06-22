import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button/Button';

import AddIcon from '../UI/Icon/AddIcon';
import AccountIcon from '../UI/Icon/AccountIcon';
import FeedIcon from '../UI/Icon/FeedIcon';
import MyPostsIcon from '../UI/Icon/MyPostsIcon';

import AuthContext from '../../context/auth-context';

import classes from './MainNavigation.module.css';

interface MainNavigationProps {
  onShowUserProfile: () => void;
}

const MainHeader: React.FC<MainNavigationProps> = ({ onShowUserProfile }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const newPostHandler = () => {
    navigate('/new-post', { replace: true });
  };

  const allPostsHandler = () => {
    navigate('/posts', { replace: true });
  };

  return (
    <header className={classes.header}>
      <div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Button
                displaystyle="button_icon"
                title="All Posts"
                onClick={allPostsHandler}
              >
                <span className={classes.icon}>
                  <FeedIcon />
                </span>
              </Button>
            </li>
            <li>
              <Button displaystyle="button_icon" title="My Posts">
                <div className={classes.icon}>
                  <MyPostsIcon />
                </div>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.title}>
        <div className={classes.centered}>
          <p>NOVA.MSG</p>
        </div>
      </div>
      <div>
        <nav className={classes.nav}>
          <ul className={classes.reverse}>
            <li>
              <Button
                displaystyle="button_icon"
                title="User Settings"
                onClick={onShowUserProfile}
              >
                <span className={classes.icon}>
                  <AccountIcon />
                </span>
              </Button>
            </li>
            <li>
              <Button
                displaystyle="button_icon"
                title="New Post"
                onClick={newPostHandler}
              >
                <span className={classes.icon}>
                  <AddIcon />
                </span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
