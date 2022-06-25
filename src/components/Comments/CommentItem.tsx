import React from 'react';

import { User } from '../../interfaces/user.interface';

import Card from '../UI/Card/Card';

import classes from './CommentItem.module.css';

interface CommentItemProps {
  id: number;
  content: string;
  author: User;
  timestamp: Date;
  edited: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  author,
  timestamp,
}) => {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.post}>
          <div className={classes.content}>
            <h2>{content}</h2>
          </div>
          <div className={classes.footer}>
            <p>
              {author.username} : {timestamp}
            </p>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default CommentItem;
