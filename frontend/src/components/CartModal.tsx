import { useEffect, useState } from 'react';
import { createPurchase } from '../actions';
import { ProductCartType, PurchaseType } from '../types';

export default function CartModal({
  handleModal,
  products,
  removeProduct,
}: {
  handleModal: () => void;
  products: ProductCartType[];
  removeProduct: (id: string) => void;
}) {
  const [purchase, setPurchase] = useState<PurchaseType>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setPurchase(undefined);
      return;
    }
    setPurchase({
      userId: localStorage.getItem('user-id') as string,
      products: products.map((p) => ({
        count: p.count,
        name: p.name,
        productId: p.id,
        unitPrice: p.price,
      })),
    });
  }, [products]);

  const handlePurchase = (): void => {
    if (!purchase) return;
    createPurchase((res) => {
      if (res.error) {
        setError(res.error);
        return;
      }
      if (res.successPurchase) {
        setError('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    }, purchase);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          style={{ minWidth: 900 }}
          className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Cart</h3>
            </div>
            {error ? (
              <div className={`bg-red-400 rounded flex justify-center mt-3`}>
                {error}
              </div>
            ) : null}
            {success ? (
              <div className={`bg-green-400 flex justify-center rounded mt-3`}>
                Purchase done successfully
              </div>
            ) : null}
            <div className="relative p-6 flex-auto">
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{ height: 210 }}
                  className="border-2 border-blue-100 rounded flex justify-between items-center mb-4 pr-20 pl-10">
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      style={{ maxHeight: 200 }}
                      className={`rounded`}
                      src={p.image}
                      alt={p.name}
                    />
                  </div>
                  <div className="flex justify-between items-center flex-col">
                    <h3 className="text-3xl font-semibold">{p.name}</h3>
                    <h3 className="text-2xl font-semibold">Price:{p.price}$</h3>
                    <h3 className="text-2xl font-semibold">
                      In the cart: {p.count}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="bg-red-700 p-0  text-sm hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                    ×
                  </button>
                </div>
              ))}
              {!products.length && (
                <h3 className="text-xl flex justify-center font-semibold ">
                  Empty
                </h3>
              )}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {purchase && (
                <button
                  className="bg-green-700 hover:bg-green-500 text-white  background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handlePurchase}>
                  Buy{' '}
                  {products?.reduce(
                    (acc, cur) => acc + cur.price * cur.count,
                    0,
                  )}
                  $ in products
                </button>
              )}
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
