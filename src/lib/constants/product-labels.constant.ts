/**
 * Generates product labels with their display variant and condition logic.
 *
 * Labels:
 * - New: created within last 10 days
 * - Out of stock: quantity ≤ 0
 * - Hot: sold > 10
 *
 * @param {(key: string) => string} t - Translation function for label names.
 * @returns {{name: string, variant: string, condition: (p: ProductType) => boolean}[]}
 *          List of label configs to apply based on product data.
 */
export function getProductLabels(t: (_key: string) => string) {
  return [
    {
      name: t('new-product-label'),
      variant: 'secondary',
      condition: (product: ProductType) => {
        const createdAt = new Date(product.createdAt);
        const now = new Date();

        const diffInDays =
          (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

        return diffInDays <= 10;
      },
    },
    {
      name: t('out-of-stock--product-label'),
      variant: 'maroon',
      condition: (product: ProductType) => product.quantity <= 0,
    },
    {
      name: t('hot-product-label'),
      variant: 'subtle',
      condition: (product: ProductType) => product.sold > 10,
    },
  ];
}
