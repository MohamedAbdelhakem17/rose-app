type SectionNameProps = {
  title: string;
};
export default function SectionName({ title }: SectionNameProps) {
  return (
    <h1 className='uppercase text-center font-bold text-soft-pink-600 tracking-widest dark:text-maroon-400 '>
      {title}
    </h1>
  );
}
