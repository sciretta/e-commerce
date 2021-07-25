import { ProductCartType } from '../types';

export default function CartModal({
  handleModal,
  products,
}: {
  handleModal: () => void;
  products: ProductCartType[];
}) {
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
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{ height: 210 }}
                  className="border-2 border-blue-100 rounded flex justify-between items-center mb-4 pr-20 pl-10">
                  <div>
                    <img
                      style={{ maxHeight: 200 }}
                      className={`rounded`}
                      src={p.image}
                      alt={p.name}
                    />
                  </div>
                  <div className="flex justify-between items-center flex-col">
                    <h3 className="text-3xl font-semibold">Price:{p.price}$</h3>
                    <h3 className="text-3xl font-semibold">
                      In the cart: {p.count}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
