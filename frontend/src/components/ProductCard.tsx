import { deleteProduct } from '../actions';
import { ProductType } from '../types';

export default function ProductCard({
  id,
  image,
  name,
  price,
  stock,
  managementMode,
  refetch,
}: ProductType & { managementMode?: boolean; refetch?: () => void }) {
  const handleDeleteProduct = (): void => {
    if (!refetch) return;
    deleteProduct((res) => {
      refetch();
    }, id);
  };
  return (
    <div
      style={{ height: 630 }}
      className="m-10  w-80 max-w-sm p-5 pt-2 rounded-md border-2 border-blue-100  hover:bg-blue-100 transition ease-out duration-300">
      {managementMode ? (
        <div className="flex justify-end mb-3">
          <button
            onClick={handleDeleteProduct}
            className="bg-red-700 p-0  text-sm hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
            ×
          </button>
        </div>
      ) : null}
      <div className={`flex justify-center`}>
        <img
          style={{ maxHeight: 350 }}
          className={`rounded`}
          src={image}
          alt={name}
        />
      </div>
      <div className="px-7 mt-20">
        <h1 className="text-3xl flex justify-between font-bold group-hover:text-purple-300 transition ease-out duration-300">
          <span>{name}</span>
          <span>{price}$</span>
        </h1>
        <h2 className="text-2xl mt-4 font-bold">Stock:{stock}</h2>
      </div>
    </div>
  );
}
