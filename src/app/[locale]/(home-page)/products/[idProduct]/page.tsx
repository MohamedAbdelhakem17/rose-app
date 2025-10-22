import ProductDetails from '@/app/[locale]/(home-page)/products/[idProduct]/_components/product-details';
import ProductReview from './_components/product-review/product-review';

export default function Page({ params }: { params: { idProduct: string } }) {
  const { idProduct } = params;
  return (
    <div>
      <ProductDetails productId={idProduct} />
      <ProductReview />
    </div>
  );
}
