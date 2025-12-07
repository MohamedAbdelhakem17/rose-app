'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash, Trash2 } from 'lucide-react';
import { useRemoveProductItem } from '../_hooks/use-remove-product-item';

export function DeleteProduct({ productId }: { productId: string }) {
  console.log('DeleteProduct rendered with productId:', productId);
  const { mutate, isPending } = useRemoveProductItem(productId);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className='text-red-600 w-20 h-7 bg-[#FF00001A] font-medium flex items-center justify-center gap-1 rounded-md hover:bg-red-700 hover:text-white transition-colors duration-200'>
            <Trash2 size={14} />
            Delete
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-lg mx-6'>
          <DialogHeader className='mb-6'></DialogHeader>
          <div className='mx-auto w-[105px] h-[105px]  flex items-center justify-center rounded-full bg-[#2E2E300D] p-[18px]'>
            <div className='w-[70px] h-[70px] bg-[#2E2E3026] rounded-full flex items-center justify-center '>
              <Trash size={29} className='stroke-slate-950' />
            </div>
          </div>
          <p className='text-center font-semibold text-lg text-zinc-800 mt-6 mb-10'>
            Are you sure you want to delete this product?
          </p>
          <DialogFooter className='mt-10 mx-auto  gap-2.5 '>
            <DialogClose asChild>
              <Button
                variant={'primary-outline'}
                className='w-52 h-11 py-3 px-4 rounded-xl font-medium border-zinc-400 text-zinc-800 hover:bg-zinc-100'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => mutate()}
              className='w-52 h-11 py-3 px-4 rounded-xl bg-red-600 font-medium'
            >
              {isPending ? 'Removing...' : <>Confirm</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
