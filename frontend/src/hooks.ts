import { useEffect, useState } from 'react';
import { fetchProducts, fetchUser } from './actions';
import { ProductType, UserType } from './types';

export const useFetchUser = (
  dep: any[],
): {
  error: string | undefined;
  user: UserType | undefined;
  refetch: () => void;
} => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchUser((res) => {
      if (res.error) {
        setError(res.error);
        setUser(undefined);
        return;
      }
      setUser(res.user);
    });
  }, dep);

  return {
    error,
    user,
    refetch: () => {
      fetchUser((res) => {
        if (res.error) {
          setError(res.error);
          setUser(undefined);
          return;
        }
        setUser(res.user);
      });
    },
  };
};

export const useFecthProducts = (
  dep: any[],
): {
  error: string | undefined;
  products: ProductType[] | undefined;
  refetch: () => void;
} => {
  const [products, setProducts] = useState<ProductType[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchProducts((res) => {
      if (res.error) {
        setError(res.error);
        setProducts(undefined);
        return;
      }
      setProducts(res.products);
    });
  }, dep);

  return {
    error,
    products,
    refetch: () => {
      fetchProducts((res) => {
        if (res.error) {
          setError(res.error);
          setProducts(undefined);
          return;
        }
        setProducts(res.products);
      });
    },
  };
};
