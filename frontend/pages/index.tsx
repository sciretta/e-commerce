import { useState } from 'react';
import { useFetchUser } from '../src/hooks';

export default function Index() {
  const [view, setView] = useState<string>();
  const { error, user } = useFetchUser([]);
  console.log({ error, user });
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-900 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              e-commerce test
            </div>
          </div>
          <div
            className={'lg:flex flex-grow items-center flex'}
            id="example-navbar-danger">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <button
                  onClick={() => setView('USER')}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">USER</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setView('PRODUCTS')}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">PRODUCTS</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setView('MANAGMENT')}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <span className="ml-2">MANAGE PRODUCTS</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {view}
    </>
  );
}
