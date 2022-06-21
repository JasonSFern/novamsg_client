import axios from 'axios';
import {
  RegisterInput,
  LoginInput,
  PasswordChangeInput,
  User,
  UserSession,
} from '../interfaces/user.interface';
import { PostPaginated, PostPaginateInput } from '../interfaces/post.interface';

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
