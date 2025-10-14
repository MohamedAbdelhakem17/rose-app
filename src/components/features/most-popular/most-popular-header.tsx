import getProductsMostPopular from '@/lib/apis/products-most-popular';
import Link from 'next/link';

// import Link from 'next/link';

export default async function MostPopularHeader() {
  const occasionsLabals = await getProductsMostPopular();

  // const handleFilter = async (_id: string) => {
  //   console.log(_id);
  //   const res = await fetch(`/api/occasions/${_id}`);
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <div className='flex flex-row justify-between items-'>
      <div className='relative basis-1/2'>
        <div className='w-[154px] h-[17px] absolute top-6  bg-soft-pink-100 z-0 rounded-r-[20px]'></div>
        <h1 className=' absolute font-primary font-bold text-4xl leading-[100%] tracking-[0%] text-maroon-700 z-50'>
          Most Popular
        </h1>
        <div className='w-[60px] h-[2px] bg-soft-pink-600 absolute top-[39px]'></div>
      </div>
      <div className='basis-1/2'>
        <ul className='flex flex-row justify-around items-center'>
          {occasionsLabals?.occasions?.map(occ => (
            <li
              key={occ._id}
              className='w-[89px] h-4 font-primary font-medium align-baseline leading-[100%] tracking-normal text-zinc-700'
            >
              <Link href={'/'}>{occ.name}</Link>
              {/* wedding */}
            </li>
          ))}

          {/* <li className='w-[89px] h-4 font-primary font-medium align-baseline leading-[100%] tracking-normal text-zinc-700'>
            Anniversary
          </li>
          <li className='w-[89px] h-4 font-primary font-medium align-baseline leading-[100%] tracking-normal text-zinc-700'>
            Birthday
          </li>
          <li className='w-[89px] h-4 font-primary font-medium align-baseline leading-[100%] tracking-normal text-zinc-700'>
            Engagement
          </li> */}
        </ul>
      </div>
    </div>
  );
}
