import React from 'react';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1'>Filter</div>

      {/* Product list */}
      <section className='col-span-3'>{children}</section>
    </main>
  );
}
