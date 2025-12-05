'use client';

import { useEffect, useState } from 'react';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

//--- Props ---
interface WishlistBtnProps {
  productId: string;
}

export default function WishlistBtn({ productId }: WishlistBtnProps) {
  //--- State ---
  const [isInWishlist, setIsInWishlist] = useState(false);

  // ---Check wishlist on mount---
  useEffect(() => {
    const wishlist = getWishlist();
    setIsInWishlist(wishlist.includes(productId));
  }, [productId]);

  // --- Helper functions ---
  function getWishlist(): string[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  }
  // --- Wishlist handlers ---
  function addToWishlist(id: string) {
    const wishlist = getWishlist();
    if (!wishlist.includes(id)) {
      const updated = [...wishlist, id];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsInWishlist(true);
      toast.success('Added to wishlist');
    }
  }
  //--- Remove from wishlist ---
  function removeFromWishlist(id: string) {
    const wishlist = getWishlist();
    const updated = wishlist.filter(item => item !== id);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsInWishlist(false);
    toast.success('removed from wishlist');
  }

  // --- Handler ---
  function toggleWishlist() {
    if (isInWishlist) removeFromWishlist(productId);
    else addToWishlist(productId);
  }

  return (
    // --- Wishlist Button ---
    <Button
      onClick={toggleWishlist}
      variant='ghost'
      className='bg-zinc-100 px-4 py-2.5 '
    >
      {isInWishlist ? (
        <HeartMinus strokeWidth={2} />
      ) : (
        <HeartPlus strokeWidth={2} />
      )}
    </Button>
  );
}
