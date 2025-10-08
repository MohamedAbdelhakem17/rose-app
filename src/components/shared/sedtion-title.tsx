export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className='relative flex justify-center'>
      <h2 className='text-3xl text-center md:text-4xl text-maroon-700 dark:text-soft-pink-200 relative after:absolute after:content-["_"] after:w-36 after:-bottom-0.5 after:h-0.5 after:left-0 after:bg-soft-pink-600  font-semibold font-poppins before:absolute before:content-["_"] before:w-[402px] before:rounded-r-full before:h-4 before:bg-soft-pink-100 before:dark:bg-zinc-700 before:bottom-0  before:-z-10 w-fit'>
        {title}
      </h2>
    </div>
  );
}
