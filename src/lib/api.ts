import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RegisterInput, User } from '../interfaces/user.interface';

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
