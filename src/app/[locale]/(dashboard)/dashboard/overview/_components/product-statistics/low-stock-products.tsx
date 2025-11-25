import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

export default function LowStockProducts({
  products,
}: {
  products: LowStockProduct[];
}) {
  // Translation
  const t = useTranslations();

  return (
    <div className='rounded-md bg-white p-6 space-y-6 col-span-full md:col-span-1'>
      {/* Label */}
      <h3 className='font-inter font-semibold text-zinc-800 text-2xl'>
        {t('low-stock-products-label')}
      </h3>

      {/* Products list */}
      <ul className='divide-y max-h-[443px] overflow-y-auto pr-2'>
        {products?.map((product: LowStockProduct) => {
          const isLow = product.quantity < 5;

          return (
            <li
              key={product._id}
              className='flex items-center justify-between py-0.5 my-2.5 text-zinc-800 font-inter'
            >
              {/* Label */}
              <span className='text-base'>{product.title}</span>

              {/* Count */}
              <span
                className={cn(['text-md font-medium', isLow && 'text-red-600'])}
              >
                {product.quantity} {t('products-count-label')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
