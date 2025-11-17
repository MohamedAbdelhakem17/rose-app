import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import React from 'react';

export default function ContinueShopping() {
  return (
    //Continue Shopping button
    <section>
      <Button
        variant='ghost'
        className='w-[213px] h-10 bg-maroon-600 text-white font-semibold text-sm flex items-center
      gap-2.5 hover:bg-maroon-700 p-2.5'
      >
        <MoveLeft size={20} />
        Continue Shopping
      </Button>
    </section>
  );
}
