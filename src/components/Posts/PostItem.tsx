import { Fragment, useContext, useEffect } from 'react';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';

import classes from './PostItem.module.css';

interface PostItemProps {
  content: string;
  author: User;
  timestamp: Date;
}
const PostItem: React.FC<PostItemProps> = ({ content, author, timestamp }) => {
  return (
    <Card>
      <div className={classes.post}>
        <div className={classes.content}>
          <h2>{content}</h2>
        </div>
        <div className={classes.footer}>
          <p>
            @{author.username} : {timestamp};
          </p>
          <div className={classes.actions}></div>
        </div>
      </div>
    </Card>
  );
};

export default PostItem;
