type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeatureCard({ title, description, icon: Icon }: Props) {
  return (
    <div className=' flex items-center gap-4 px-4 '>
      <div className='bg-maroon-600 text-white w-16 h-16 rounded-full flex justify-center items-center'>
        {Icon}
      </div>
      <div className=''>
        <h3 className='text-xl font-semibold text-maroon-600 mb-1'>{title}</h3>
        <p className='text-sm text-zinc-500 mt-px'>{description}</p>
      </div>
    </div>
  );
}
