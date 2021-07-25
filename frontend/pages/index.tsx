import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetchUser } from '../src/hooks';
import { MainViews } from '../src/types';
import ManagementView from '../src/views/ManagementView';
import ProductsView from '../src/views/ProductsView';

export default function Index() {
  const router = useRouter();
  const [view, setView] = useState<string>(MainViews.Products);
  const { error, user, refetch } = useFetchUser([]);
  console.log({ error, user });

  const handleLogOut = (): void => {
    localStorage.clear();
    setView(MainViews.Products);
    refetch();
  };

  const redirectLogin = (): void => {
    router.push('/login');
  };
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
              {user ? (
                <>
                  <li className="nav-item">
                    <button
                      onClick={() => setView(MainViews.Products)}
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <span className="ml-2">PRODUCTS</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={() => setView(MainViews.User)}
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <span className="ml-2">USER</span>
                    </button>
                  </li>

                  {user.role === 'ADMIN' ? (
                    <li className="nav-item">
                      <button
                        onClick={() => setView(MainViews.Management)}
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                        <span className="ml-2">MANAGE PRODUCTS</span>
                      </button>
                    </li>
                  ) : null}

                  <li className="nav-item">
                    <button
                      onClick={handleLogOut}
                      className=" bg-red-700 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <span>Log out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={redirectLogin}
                    className=" bg-green-300 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <span>Log in</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <View currentView={view} />
    </>
  );
}

const View: React.FC<{ currentView: string }> = ({ currentView }) => {
  const viewHeader = (
    <h1 className="text-3xl flex justify-center font-bold group-hover:text-purple-300 transition ease-out duration-300">
      {currentView}
    </h1>
  );
  if (MainViews.Management === currentView)
    return (
      <>
        {viewHeader}
        <ManagementView />
      </>
    );
  if (MainViews.Products === currentView)
    return (
      <>
        {viewHeader}
        <ProductsView />
      </>
    );

  return <>no view selected</>;
};
