export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSession {
  auth: boolean;
  status: number;
  message: string;
  session: {
    token: string;
    expires: number;
    issued: number;
    user_data: User;
  };
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}
