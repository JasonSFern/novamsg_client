import { User } from './user.interface';

interface PostLikes extends User {
  post_users: {
    createdAt: Date;
    updatedAt: Date;
    post_id: number;
    user_id: number;
  };
}

interface PostComments {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  post_likes: number;
  comments: number;
}

export interface PostPaginated {
  count: number;
  rows: Post[];
}

export interface PostPaginateInput {
  limit: number;
  offset: number;
  order: string;
  user_id?: number;
}

export interface CreatePostInput {
  user_id: number;
  content: string;
}

export interface DeletePostOutput {
  success: boolean;
}
