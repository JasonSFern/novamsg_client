import axios from 'axios';
import {
  RegisterInput,
  LoginInput,
  PasswordChangeInput,
  User,
  UserSession,
} from '../interfaces/user.interface';
import {
  Post,
  PostLike,
  PostLikesInput,
  PostPaginated,
  PostPaginateInput,
} from '../interfaces/post.interface';
import {
  ContentInput,
  ContentOutput,
  DeleteContentOutput,
} from '../interfaces/content.interface';
import { Comment, CommentInput } from '../interfaces/comment.interface';

const DOMAIN = process.env.REACT_APP_DOMAIN;

// Register a new user
export const register = async (payload: RegisterInput): Promise<User> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/user/register`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Login user with username and password
export const login = async (payload: LoginInput): Promise<UserSession> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/user/login`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Change the users current password
export const changeUserPass = async (
  payload: PasswordChangeInput
): Promise<User> => {
  const response = await axios({
    method: 'PUT',
    url: `${DOMAIN}/user/${payload.id}`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Get all posts with pagination
export const getAllPosts = async (
  payload: PostPaginateInput
): Promise<PostPaginated> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/post/all-posts`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Get posts with pagination for a specific user
export const getUserPosts = async (
  payload: PostPaginateInput
): Promise<PostPaginated> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/post/user-posts`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Get a single post by id
export const getSinglePost = async (postId: string): Promise<Post> => {
  const response = await axios({
    method: 'GET',
    url: `${DOMAIN}/post/${postId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// delete a post
export const deletePost = async (
  postId: number
): Promise<DeleteContentOutput> => {
  const response = await axios({
    method: 'DELETE',
    url: `${DOMAIN}/post/${postId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Toggle likeing a post
export const togglePostLike = async (
  payload: PostLikesInput
): Promise<PostLike[]> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/post/toggle-like`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Edit a post or comment
export const editContent = async (
  params: ContentInput
): Promise<ContentOutput> => {
  const payload = params.payload;
  const response = await axios({
    method: 'PUT',
    url: `${DOMAIN}/${params.type}/${params.id}`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Create a new post or comment
export const createContent = async (
  params: ContentInput
): Promise<ContentOutput> => {
  const payload = params.payload;
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/${params.type}/`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Verify the user session token is still valid for portected routes
export const userAuthenticated = async (
  token: string = ''
): Promise<UserSession> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/user/verify-token`,
    headers: {
      'Content-Type': 'application/json',
      'x-jwt-token': token,
    },
  });
  console.log(response);

  return await response.data;
};

// Get comments for a post
export const getPostComments = async (postId: string): Promise<Comment> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/comment/post-comments`,
    data: { post_id: postId },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Get a single comment by id
export const getSingleComment = async (commentId: string): Promise<Comment> => {
  const response = await axios({
    method: 'GET',
    url: `${DOMAIN}/comment/${commentId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// Create a new comment under a post
export const addComment = async (payload: CommentInput): Promise<Comment> => {
  const response = await axios({
    method: 'POST',
    url: `${DOMAIN}/comment/`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};

// delete a comment
export const deleteComment = async (
  commentId: number
): Promise<DeleteContentOutput> => {
  const response = await axios({
    method: 'DELETE',
    url: `${DOMAIN}/comment/${commentId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);

  return await response.data;
};
