import { useState } from 'react';
import { saveProduct } from '../actions';

export default function CreateProductCard({
  refetch,
}: {
  refetch: () => void;
}) {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [image, setImage] = useState<string>();
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const handleSaveProduct = (): void => {
    if (!name || !price || !stock || !image) {
      setError('All fields are required');
      setSuccess(false);
      return;
    }
    saveProduct(
      (res) => {
        if (res.error) {
          setError(res.error);
          setSuccess(false);
          return;
        }
        setName('');
        setPrice(0);
        setStock(0);
        setImage('');
        setError(undefined);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        refetch();
      },
      {
        image,
        name,
        stock,
        price,
      },
    );
  };

  return (
    <div
      style={{ height: 630 }}
      className="m-10 w-80 h-2/3 max-w-sm p-5 rounded-md bg-blue-100 ">
      {image ? (
        <div className={`flex justify-center`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ maxHeight: 250 }}
            className={`rounded`}
            src={image}
            alt="create image"
          />
        </div>
      ) : null}
      {error ? <div className={`bg-red-400 rounded  mt-3`}>{error}</div> : null}
      {success ? (
        <div className={`bg-green-400 rounded mt-3`}>
          Product saved succesfully
        </div>
      ) : null}
      <div className="px-7 mt-2 flex flex-col justify-center">
        <input
          type="text"
          placeholder="Product image URL"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 mb-5`}
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Product name"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 mb-5`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price $"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 mb-5`}
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
        />

        <input
          type="number"
          placeholder="Initial stock"
          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 mb-5`}
          value={stock}
          onChange={(e) => {
            setStock(Number(e.target.value));
          }}
        />
        <button
          onClick={handleSaveProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
        </button>
      </div>
    </div>
  );
}
