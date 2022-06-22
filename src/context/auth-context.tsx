import React, { useState, useCallback } from 'react';
import { retrieveStoredToken } from '../utils/auth-util';

import { Session, User } from '../interfaces/user.interface';

interface AuthContextAttributes {
  isLoggedIn: boolean;
  token?: string | null;
  userData?: User | null;
  login: (t: string, u: User, e: number) => void;
  logout: () => void;
  renewSession: (s: Session) => void;
}

const AuthContext = React.createContext<AuthContextAttributes>({
  isLoggedIn: false,
  token: undefined,
  userData: undefined,
  login: (t: string, u: User, e: number) => {},
  logout: () => {},
  renewSession: (s: Session) => {},
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
  };

  const renewSessionHandler = (session: Session) => {
    setDuration(session.expires);
    localStorage.setItem('duration', session.expires.toString());
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userData: userData,
    login: loginHandler,
    logout: logoutHandler,
    renewSession: renewSessionHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
