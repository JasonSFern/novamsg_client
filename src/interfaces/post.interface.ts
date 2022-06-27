import { User } from './user.interface';

export interface PostLike {
  post_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostLikes extends User {
  post_users: PostLike;
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
  post_likes: PostLike[];
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

export interface PostLikesInput {
  user_id?: number;
  post_id: number;
}
