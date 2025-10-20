import { getProductLabels } from '@/lib/constants/product-labels.constant';

/**
 * Maps raw product data into a simplified structure with localized labels.
 *
 * Each product is enriched with:
 * - Basic info (id, title, slug, image, price, etc.)
 * - Label list (e.g., "New", "Hot", "Out of Stock") based on defined rules.
 *
 * @param {ProductType[]} products - Array of raw product objects from the API.
 * @param {(key: string) => string} t - Translation function for label names.
 * @returns {MappingProductType[]} List of mapped products ready for UI display.
 */

export function mappingProducts(
  products: ProductType[],
  t: (key: string) => string
): MappingProductType[] {
  const LABEL_RULES = getProductLabels(t);

  return products.map(product => {
    const labels = LABEL_RULES.filter(rule => rule.condition(product)).map(
      ({ name, variant }: { name: string; variant: string }) => ({
        name,
        variant,
      })
    );

    return {
      _id: product._id,
      title: product.title,
      slug: product.slug,
      imgCover: product.imgCover,
      isInWishlist: product.isInWishlist,
      rateAvg: product.rateAvg,
      priceAfterDiscount: product.priceAfterDiscount,
      price: product.price,
      labels,
    };
  });
}
