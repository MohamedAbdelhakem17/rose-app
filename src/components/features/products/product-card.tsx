'use client';

import RatingIcon from '@/components/shared/rating-icon';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { HeartMinus, HeartPlus, ShoppingCart } from 'lucide-react';
import { useFormatter } from 'next-intl';
import Image, { ImageProps } from 'next/image';
import React from 'react';

type LabelVariant = keyof typeof badgeVariants;
type ProductLabel = { name: string; variant?: LabelVariant };

/**
 * ProductCard Component
 *
 * The main wrapper component that serves as the container for all product-related UI elements.
 * It acts as the parent component for subcomponents like `ProductCard.Cover`, `ProductCard.Header`, etc.
 * Commonly used to display product cards in grids or lists with consistent structure and styling.
 *
 * @example
 * ```tsx
 * <ProductCard>
 *   <ProductCard.Cover src="/img.jpg" alt="Product Image" />
 *   <ProductCard.Content>
 *     <ProductCard.Title>Product Name</ProductCard.Title>
 *     <ProductCard.Price current={250} old={300} />
 *   </ProductCard.Content>
 * </ProductCard>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard HTML div attributes.
 * @returns {JSX.Element} A styled div element serving as the product card container.
 */

const ProductCard = Object.assign(ProductCardBase, {
  Cover,
  Header,
  WishlistButton,
  Labels,
  Content,
  Title,
  Rating,
  Price,
  Footer,
  CartButton,
});

// Product card wrapper component
function ProductCardBase({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props} />
  );
}

// Product image component
function Cover({
  className,
  src,
  alt,
  children,
  ...props
}: ImageProps): JSX.Element {
  return (
    <div className='relative'>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={280}
        loading='lazy'
        quality={80}
        className={cn('aspect-square w-full object-cover', className)}
        {...props}
      />
      {children}
    </div>
  );
}

// Header section component
function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn(
        'absolute top-2.5 start-2.5 end-2.5 flex items-center justify-between',
        className
      )}
      {...props}
    />
  );
}

// Wishlist button component
function WishlistButton({
  active = false,
  className,
  ...props
}: ButtonProps & { active: boolean }): JSX.Element {
  return (
    <Button
      {...props}
      className={cn(
        'group relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out',
        'p-2 overflow-hidden',
        active
          ? 'bg-black text-white hover:bg-gray-800'
          : 'bg-white/80 text-maroon-700 hover:bg-white',
        className
      )}
    >
      <span className='flex items-center justify-center transition-all duration-300'>
        {active ? (
          <HeartMinus className='size-5 text-current' />
        ) : (
          <HeartPlus className='size-5 text-current' />
        )}
      </span>

      <span
        className={cn(
          'absolute left-1/2 group-hover:static group-hover:translate-x-0',
          'ms-0 group-hover:ms-2 whitespace-nowrap text-sm font-medium transition-all duration-300',
          'opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[150px]'
        )}
      >
        {active ? 'Remove from wishlist' : 'Add to wishlist'}
      </span>
    </Button>
  );
}

// Product labels component
function Labels({ labels }: { labels: ProductLabel[] }): JSX.Element | null {
  if (!labels?.length) return null;

  return (
    <ul className='flex gap-x-1'>
      {labels.map((label, i) => (
        <li key={i}>
          <Badge variant={label.variant}>{label.name}</Badge>
        </li>
      ))}
    </ul>
  );
}

// Content wrapper component
function Content({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn('flex flex-col gap-1 p-3', className)} {...props} />
  );
}

// Product title component
function Title({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return (
    <h3
      className={cn(
        'text-maroon-700 text-lg font-semibold line-clamp-2 my-4',
        className
      )}
      {...props}
    />
  );
}

// Product rating component
function Rating({ rate }: { rate: number }): JSX.Element | null {
  if (!rate || rate === 0) return null;
  return <RatingIcon rate={rate} />;
}

// Product price component
function Price({
  current,
  old,
  currency = 'EGP',
  className,
}: {
  current: number;
  old?: number;
  currency?: string;
  className?: string;
}): JSX.Element {
  // Localization
  const format = useFormatter();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className='text-maroon-700 font-medium'>
        {format.number(Number(current.toFixed(2)), {
          style: 'currency',
          currency: currency,
        })}
      </span>

      {old && (
        <span className='text-gray-400 line-through text-sm'>
          {format.number(Number(old.toFixed(2)), {
            style: 'currency',
            currency: currency,
          })}
        </span>
      )}
    </div>
  );
}

// Cart button component
function CartButton({ onClick }: { onClick?: () => void }): JSX.Element {
  return (
    <Button
      size='icon-lg'
      className='rounded-full bg-maroon-600 hover:bg-maroon-700'
      onClick={onClick}
    >
      <ShoppingCart
        strokeWidth={1.25}
        className='h-5 w-5 text-white shadow-md'
      />
    </Button>
  );
}

// Footer section component
function Footer({
  children,
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className='flex items-center justify-between gap-x-2.5'>
      {children}
    </div>
  );
}

export default ProductCard;
