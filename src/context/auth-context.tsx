import React, { useState, useCallback } from 'react';
import { retrieveStoredToken } from '../utils/auth-util';

import { User } from '../interfaces/user.interface';

interface AuthContextAttributes {
  isLoggedIn: boolean;
  token?: string | null;
  userData?: User | null;
  login: (t: string, u: User, e: number) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextAttributes>({
  isLoggedIn: false,
  token: undefined,
  userData: undefined,
  login: (token: string, userData: User, expirationTime: number) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const tokenData = retrieveStoredToken();
  const [token, setToken] = useState<string | null>(tokenData.token);
  const [userData, setUserData] = useState<User | null>(tokenData.userData);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
  }, []);

  const loginHandler = (
    token: string,
    userData: User,
    expirationTime: number
  ) => {
    setToken(token);
    setUserData(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('expirationTime', expirationTime.toString());
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userData: userData,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
