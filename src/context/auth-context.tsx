import React, { useState, useEffect, useCallback } from 'react';
import {
  calculateRemainingTime,
  retrieveStoredToken,
} from '../utils/auth-util';

import { User } from '../interfaces/user.interface';

interface AuthContextAttributes {
  isLoggedIn: boolean;
  token?: string | null;
  userData?: User | null;
  login: (t: string, u: User, e: number) => void;
  logout: () => void;
}

let logoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => {});

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
  const [duration, setDuration] = useState<number | undefined>(
    tokenData.duration
  );

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserData(null);
    setDuration(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('duration');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (
    token: string,
    userData: User,
    expirationTime: number
  ) => {
    setToken(token);
    setUserData(userData);
    setDuration(expirationTime);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('duration', expirationTime.toString());

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData && tokenData.duration !== 0) {
      const remainingTime = calculateRemainingTime(tokenData.duration);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
  }, [tokenData, logoutHandler]);

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
