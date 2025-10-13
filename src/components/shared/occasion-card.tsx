import Image from 'next/image';

type OccasionCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function OccasionCard({
  title,
  description,
  image,
}: OccasionCardProps) {
  return (
    <div className=' w-full h-[271px] rounded-2xl relative '>
      <Image alt='' src={image} fill className='rounded-2xl' />
      <div className='textContainer absolute m-6 bottom-0 flex flex-col gap-2.5'>
        <span className='py-0.5 px-2.5 bg-maroon-50 text-maroon-600 w-20 font-medium text-xs flex justify-center items-center rounded-lg'>
          {description}
        </span>
        <h3 className='font-semibold text-2xl text-white '>{title}</h3>
      </div>
    </div>
  );
}
