import { User } from '../interfaces/user.interface';

interface StoredToken {
  token: string | null;
  userData: User | null;
  duration: number | undefined;
}

export const calculateRemainingTime = (expirationTime: number = 0): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const retrieveStoredToken = (): StoredToken => {
  let storedToken: string | null = null,
    storedUserData: string | null = null,
    parsedUserData: User | null = null,
    storedDuration: string | null = null,
    parsedDuration: number | undefined = undefined;

  if (localStorage.getItem('token')) {
    storedToken = localStorage.getItem('token');
  }
  if (localStorage.getItem('duration')) {
    storedDuration = localStorage.getItem('duration');
    if (storedDuration) {
      parsedDuration = parseInt(storedDuration);
    }
  }
  if (localStorage.getItem('userData')) {
    storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      parsedUserData = JSON.parse(storedUserData);
    }
  }

  return {
    token: storedToken,
    userData: parsedUserData,
    duration: parsedDuration,
  };
};
