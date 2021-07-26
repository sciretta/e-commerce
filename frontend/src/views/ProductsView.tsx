import ProductCard from '../components/ProductCard';
import { useFecthProducts } from '../hooks';
import { ProductType } from '../types';

export default function ProductsView({
  addProduct,
}: {
  addProduct: (newProduct: ProductType) => void;
}) {
  const { error, products } = useFecthProducts([]);

  console.log('product view', { error });
  return (
    <div
      style={{ minHeight: '80vh' }}
      className={`flex m-20 flex-wrap justify-center`}>
      {products?.map((p) => (
        <ProductCard key={p.name} {...p} addProduct={addProduct} />
      ))}
    </div>
  );
}
