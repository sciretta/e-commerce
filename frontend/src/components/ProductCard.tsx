import { ProductType } from '../types';

export default function ProductCard({
  image,
  name,
  price,
  stock,
}: ProductType) {
  return (
    <div
      style={{ height: 600 }}
      className="m-10 w-80 max-w-sm p-5 rounded-md border-2 border-blue-100  hover:bg-blue-200 cursor-pointer transition ease-out duration-300">
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
