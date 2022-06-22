import { Post } from './post.interface';

export type ContentType = 'post' | 'comment';

export interface ContentInput {
  type: ContentType;
  payload: {
    user_id: number;
    content: string;
  };
}

export type ContentOutput = Post | Comment;
