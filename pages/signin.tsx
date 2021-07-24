import Head from 'next/head';
import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const onSubmitForm: MouseEventHandler<HTMLButtonElement> = (): void => {
    console.log('submit', { email, password, confirmPassword });
  };
  const redirectSingin = (): void => {
    router.push('/login');
  };
  return (
    <>
      <Head>
        <title>e-commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex bg-gray-bg1">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
            Sign in 🗝️
          </h1>

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
          <div>
            <label htmlFor="password">Confirm password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Confirm your Password"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={onSubmitForm}
              className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}>
              Signin
            </button>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={redirectSingin}
              className={`bg-green py-2 px-4 text-sm text-blue-600 rounded  border-green focus:outline-none focus:border-green-dark`}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}