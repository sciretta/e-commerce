import { useEffect, useState } from 'react';
import { API_URL } from '../consts';
import { FetchType, UserType } from './types';

export const useFetchUser = (
  dep: any[],
): { error: string | undefined; user: UserType | undefined } => {
  const [user, setUser] = useState<UserType>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch(`${API_URL}/user`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('x-auth-token') || '',
      },
    })
      .then((res) => res.json())
      .then((res: FetchType) => {
        if (res.error) {
          setError(res.error);
          return;
        }
        setUser(res.user);
      });
  }, dep);

  return { error, user };
};
