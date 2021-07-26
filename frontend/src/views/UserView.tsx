import { useState } from 'react';
import { updateUser } from '../actions';
import { useGetPurchases } from '../hooks';

export default function UserView() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>();
  const [firstName, setFirstName] = useState<string>(
    localStorage.getItem('user-firstname') || '',
  );
  const [lastName, setLastName] = useState<string>(
    localStorage.getItem('user-lastname') || '',
  );
  const [direction, setDirection] = useState<string>(
    localStorage.getItem('user-direction') || '',
  );
  const { purchases } = useGetPurchases();

  const onSaveChanges = (): void => {
    updateUser(
      (res) => {
        if (res.error) {
          setError(res.error);
          return;
        }
        setSuccess(true);
        setError('');
        setTimeout(() => setSuccess(false), 3000);
        localStorage.setItem('user-firstname', res?.user?.firstName as string);
        localStorage.setItem('user-lastname', res?.user?.lastName as string);
        localStorage.setItem('user-direction', res?.user?.direction as string);
      },
      { direction, firstName, lastName },
    );
  };

  console.log({ purchases });

  return (
    <div style={{ minHeight: '80vh' }} className=" p-40 pt-10">
      <div className=" w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Change your info ⚙️
        </h1>
        {error ? <div className={`bg-red-400 rounded`}>{error}</div> : null}
        {success ? (
          <div className={`bg-green-400 rounded mt-3`}>
            User updated successfully!
          </div>
        ) : null}
        <div>
          <label htmlFor="password">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="password">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            placeholder="Last Name"
          />
        </div>
        <div>
          <label htmlFor="password">Direction</label>
          <input
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            type="text"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            placeholder="Direction"
          />
        </div>
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={onSaveChanges}
            className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}>
            Save changes
          </button>
        </div>
      </div>
      <div
        className={`bg-blue-500 h-20 mt-10 text-2xl flex items-center justify-center font-semibold flex border-2 border-black`}>
        Purchases
      </div>
      {purchases.map((p, index) => (
        <div
          key={p._id}
          className={`${
            index % 2 !== 0 ? 'bg-blue-500' : 'bg-blue-200'
          }  text-2xl mt-1 flex justify-between font-semibold flex p-3`}>
          <div>
            Spent:{'   '}
            {p.products.reduce(
              (acc, cur) => acc + cur.unitPrice * cur.count,
              0,
            )}
            $
          </div>
          <div>
            {p.products
              .map((product) => `${product.count} ${product.name}`)
              .join(',')}
          </div>
        </div>
      ))}
    </div>
  );
}
