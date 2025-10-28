import { getProducts } from '@/lib/apis/product/product.api';
import ProductSliderList from './product-slider-list';

export default async function ProductSlider() {
  //  get product data
  const { products }: MappedProductResponse = await getProducts({
    sort: '-sold',
    limit: 6,
  });

  return <ProductSliderList products={products} />;
}
