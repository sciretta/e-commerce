import CreateProductCard from '../components/CreateProductCard';
import ProductCard from '../components/ProductCard';
import { useFecthProducts } from '../hooks';

export default function ManagementView() {
  const { error, products, refetch } = useFecthProducts([]);
  console.log({ error, products });
  return (
    <div
      style={{ minHeight: '80vh' }}
      className={`flex m-20 flex-wrap justify-center`}>
      <CreateProductCard refetch={refetch} />
      {products?.map((p) => (
        <ProductCard key={p.name} {...p} />
      ))}
    </div>
  );
}
