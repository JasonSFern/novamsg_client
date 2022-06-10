import classes from './MainNavigation.module.css';

const MainHeader: React.FC<React.ReactNode> = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <button>All Posts</button>
            </li>
            <li>
              <button>User Posts</button>
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
              <button>My Account</button>
            </li>
            <li>
              <button>New Post</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
