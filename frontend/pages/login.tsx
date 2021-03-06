import Head from 'next/head';
import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../consts';
import { FetchType } from '../src/types';

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmitForm: MouseEventHandler<HTMLButtonElement> =
    async (): Promise<void> => {
      fetch(`${API_URL}/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((res: FetchType) => {
          if (res.error) {
            setError(res.error);
          }
          if (res.token) {
            localStorage.setItem('x-auth-token', res.token);
            localStorage.setItem('user-email', res?.user?.email as string);
            localStorage.setItem('user-id', res?.user?.id as string);
            localStorage.setItem(
              'user-firstname',
              res?.user?.firstName as string,
            );
            localStorage.setItem(
              'user-lastname',
              res?.user?.lastName as string,
            );
            localStorage.setItem(
              'user-direction',
              res?.user?.direction as string,
            );
            router.push('/');
          }
        });
    };

  const redirectSingin = (): void => {
    router.push('/signin');
  };

  return (
    <>
      <div className="h-screen flex bg-gray-bg1">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
            Log in 🔐
          </h1>
          {error ? <div className={`bg-red-400 rounded`}>{error}</div> : null}
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={onSubmitForm}
              className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}>
              Login
            </button>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={redirectSingin}
              className={`bg-green py-2 px-4 text-sm text-blue-600 rounded  border-green focus:outline-none focus:border-green-dark`}>
              Signin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
