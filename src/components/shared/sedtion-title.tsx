export default function SectionTitle({ title }: { title: string }) {
  return (
    <main className='relative'>
      <h2
        className='relative text-h-3 md:text-4xl text-maroon-700 font-semibold font-poppins 
  before:absolute before:content-[""] before:w-[75%] before:h-5 before:rounded-full 
  before:bg-soft-pink-100 before:bottom-0 before:left-0 before:-z-10 
  after:absolute after:content-[""] after:w-[30%] after:h-[3px] after:bg-soft-pink-600
  after:bottom-0 after:left-0 after:rounded-full w-fit'
      >
        {title}
      </h2>
    </main>
  );
}
