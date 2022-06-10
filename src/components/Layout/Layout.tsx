import { Fragment, useState } from 'react';
import MainNavigation from './MainNavigation';

import classes from './Layout.module.css';
import UserProfile from '../UserProfile/UserProfile';

const Layout: React.FC<React.ReactNode> = (props) => {
  const [userProfileIsShown, setUserProfileIsShown] = useState(false);

  const showUserProfileHandler = () => {
    setUserProfileIsShown(true);
  };

  const hideUserProfileHandler = () => {
    setUserProfileIsShown(false);
  };

  return (
    <Fragment>
      {userProfileIsShown && <UserProfile onClose={hideUserProfileHandler} />}
      <MainNavigation onShowUserProfile={showUserProfileHandler} />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
