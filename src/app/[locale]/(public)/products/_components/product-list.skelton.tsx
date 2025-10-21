import ProductSkelton from '@/components/features/products/product.skelton';

export default function ProductListSkelton() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductSkelton key={index} />
      ))}
    </div>
  );
}
