import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

export default function TopSellingProducts({
  products,
}: {
  products: TopSellingProduct[];
}) {
  // Translation
  const t = useTranslations();

  // Functions
  const getItemBackground = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-[linear-gradient(90deg,rgba(223,172,22,0.25)_0%,rgba(223,172,22,0.1)_100%)]';
      case 1:
        return 'bg-[linear-gradient(90deg,rgba(117,127,149,0.25)_0%,rgba(117,127,149,0.1)_100%)]';
      case 2:
        return 'bg-[linear-gradient(90deg,rgba(145,68,0,0.25)_0%,rgba(145,68,0,0.1)_100%)]';

      default:
        return 'bg-zinc-100';
    }
  };

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
  });

  return (
    <div className='rounded-md bg-white p-6 space-y-6 max-h-[443px] overflow-y-auto col-span-full md:col-span-1'>
      {/* Label */}
      <h3 className='font-inter font-semibold text-zinc-800 text-2xl'>
        {t('top-selling-products-label')}
      </h3>

      {/* Product List */}
      <ul className='space-y-3'>
        {products?.map((product: TopSellingProduct, index: number) => {
          return (
            <li
              key={product._id}
              className={cn([
                'flex items-center justify-between py-2 px-4 rounded-md text-zinc-800',
                getItemBackground(index),
              ])}
            >
              {/* Price and title */}
              <h4 className='flex items-center gap-1  font-inter'>
                {/* Title */}
                <span className='truncate max-w-[230px] inline-block text-base font-semibold'>
                  {product.title}
                </span>

                {/* Price */}
                <span className='text-xs font-medium'>
                  ({priceFormatter.format(product.price)})
                </span>
              </h4>

              {/* Sales count */}
              <p className='flex items-center gap-1 text-sm'>
                {/* Count */}
                <span className='font-bold'>{product.sold}</span>

                {/* Label */}
                <span className='font-medium'>{t('sales-label-count')}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
