import { ProductSkelton } from '@/components/skeleton';

export default function BestSellingSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProductSkelton key={index} />
      ))}
    </>
  );
}
