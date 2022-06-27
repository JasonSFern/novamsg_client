import { User } from './user.interface';

export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comment_author: User;
  comment_likes: CommentLike[];
}

export interface CommentLike {
  comment_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentInput {
  user_id: number;
  post_id: number | string;
  content: string;
}

export interface CommentLikesInput {
  user_id?: number;
  comment_id: number;
}
