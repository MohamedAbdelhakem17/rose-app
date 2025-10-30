import ProductDetails from '@/app/[locale]/(home-page)/products/[id]/_components/product-details';
import ProductReview from './_components/product-review/product-review';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <ProductDetails productId={id} />
      <ProductReview />
    </div>
  );
}
