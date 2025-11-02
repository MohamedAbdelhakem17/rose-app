import { fetchProductById } from '@/lib/apis/products';
import ProductFeatures from './_components/product-features';
import ProductImages from './_components/product-gallery';

// --- Props ---
interface ProductDetailsProps {
  productId: string;
}

export default async function ProductDetails({
  productId,
}: ProductDetailsProps) {
  //--- Fetch product data ---
  const productData = await fetchProductById(productId);

  return (
    //--- Product Details Main ---
    <main className='h-[523px] w-[1280px] flex gap-16 mx-auto mt-10'>
      {/* product gallery */}
      <div className='product-gallery  h-full w-full me-1 '>
        <ProductImages
          images={productData?.product?.images ?? []}
          imgCover={productData?.product?.imgCover ?? ''}
        />
      </div>
      {/* product features */}
      <div className='product-details h-full w-full ms-0.5'>
        {productData?.product && (
          <ProductFeatures product={productData.product} />
        )}
      </div>
    </main>
  );
}
