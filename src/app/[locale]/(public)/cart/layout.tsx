export default function Layout({
  children,
  summary,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <div className='min-w-7xl mx-auto flex gap-10 mt-16 mb-12'>
      <div className='w-[782px]'>{children}</div>
      <div className='w-[458px] min-h-[605px] bg-maroon-300'>{summary}</div>
    </div>
  );
}
