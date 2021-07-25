import Head from 'next/head';
import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../consts';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [direction, setDirection] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmitForm: MouseEventHandler<HTMLButtonElement> =
    async (): Promise<void> => {
      if (!firstName || !lastName || !direction || !password || !email) {
        setError('Fill all fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Password and confirm password doesnt match');
        return;
      }

      fetch(`${API_URL}/user/signin`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          direction,
        }),
      })
        .then((res) => res.json())
        .then(
          (res: {
            userCreated?: { email: string; id: string };
            error?: string;
          }) => {
            if (res.error) {
              setError(res.error);
              return;
            }
            redirectLogin();
          },
        );
    };

  const redirectLogin = (): void => {
    router.push('/login');
  };

  return (
    <>
      <div className="h-screen flex bg-gray-bg1">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
            Sign in 🗝️
          </h1>
          {error ? <div className={`bg-red-400 rounded`}>{error}</div> : null}

          <div>
            <label htmlFor="password">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="password">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Last Name"
            />
          </div>
          <div>
            <label htmlFor="password">Direction</label>
            <input
              onChange={(e) => setDirection(e.target.value)}
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              placeholder="Direction"
            />
          </div>
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
              onClick={redirectLogin}
              className={`bg-green py-2 px-4 text-sm text-blue-600 rounded  border-green focus:outline-none focus:border-green-dark`}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
