import { User } from '../interfaces/user.interface';

interface StoredToken {
  token: string | null;
  userData: User | null;
}

export const retrieveStoredToken = (): StoredToken => {
  let storedToken: string | null = null,
    storedUserData: string | null = null,
    parsedUserData: User | null = null;

  if (localStorage.getItem('token')) {
    storedToken = localStorage.getItem('token');
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
  };
};
