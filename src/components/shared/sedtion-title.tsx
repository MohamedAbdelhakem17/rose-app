export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className='relative'>
      <h2 className='text-3xl md:text-4xl text-maroon-700 relative  font-semibold font-poppins before:absolute before:content-["_"] before:w-40 before:rounded-full before:h-4 before:bg-soft-pink-100 before:bottom-0  before:-z-10 w-fit'>
        {title}
      </h2>
      <span className='absolute left-0  bottom-0 -z-10 w-20 rounded-full h-1 bg-soft-pink-600'></span>
    </div>
  );
}
