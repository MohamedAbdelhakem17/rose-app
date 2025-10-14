import { Button } from '@/components/shared';
import { ArrowRight } from 'lucide-react';

export default function BestSellingText() {
  return (
    <div className='max-w-[291px] h-[359px]'>
      <h1 className=' font-primary font-bold text-soft-pink-500 uppercase tracking-[0.25em] h-[30.6px] leading-[100%] align-middle'>
        Best Selling
      </h1>
      <div className='h-[272.4px] my-2.5'>
        <h1 className=' font-primary font-bold text-3xl align-middle leading-[100%] h-[90px]'>
          <span className='text-soft-pink-500'>Check Out </span>
          <span className='text-maroon-700'>What Everyone’s </span>
          <span className='text-soft-pink-500'>Buying </span>
          <span className='text-maroon-700'>Right Now </span>
        </h1>

        <p className=' font-primary font-normal text-base text-zinc-500  align-middle leading-[100%] h-[96px] tracking-[0]  mt-2'>
          Not sure what to choose?
          <br />
          Start with our best sellers, these are the
          <br />
          gifts our customers keep coming back for.
          <br /> Whether you're celebrating a birthday,
          <br />
          anniversary or wedding, our top picks are
          <br /> guaranteed to leave a lasting impression.
        </p>
      </div>
      <div className='h-4'>
        <Button className='flex flex-row items-center justify-center gap-2.5 w-[155px] h-[36px] bg-maroon-600 px-4 py-2.5 border rounded-[10px] border-maroon-600 text-white '>
          <span className='font-primary'>Explore gifts</span>
          <ArrowRight className='size-4' />
        </Button>
      </div>
    </div>
  );
}
