import { API_URL } from '../consts';
import { FetchType, ProductType, PurchaseType, UserType } from './types';

export const fetchProducts = (cb: (res: FetchType) => void): void => {
  fetch(`${API_URL}/products`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const fetchUser = (cb: (res: FetchType) => void): void => {
  fetch(`${API_URL}/user`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
      'user-id': localStorage.getItem('user-id') || '',
    },
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const saveProduct = (
  cb: (res: FetchType) => void,
  data: Omit<ProductType, 'id'>,
) => {
  fetch(`${API_URL}/product/create`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const deleteProduct = (cb: (res: FetchType) => void, id: string) => {
  fetch(`${API_URL}/product/delete`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const updateUser = (
  cb: (res: FetchType) => void,
  data: { direction: string; firstName: string; lastName: string },
) => {
  fetch(`${API_URL}/user/edit`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
      'user-id': localStorage.getItem('user-id') || '',
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const createPurchase = (
  cb: (res: FetchType) => void,
  data: PurchaseType,
) => {
  fetch(`${API_URL}/purchase/new`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};

export const getPurchases = (cb: (res: FetchType) => void) => {
  fetch(`${API_URL}/purchases`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('x-auth-token') || '',
      'user-id': localStorage.getItem('user-id') || '',
    },
  })
    .then((res) => res.json())
    .then((res: FetchType) => cb(res));
};
