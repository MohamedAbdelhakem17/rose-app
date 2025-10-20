import React from 'react';
import CategoriesFilter from './_components/categories-filter';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-96 bg-muted p-4 border-r'>
        <CategoriesFilter />
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 bg-background'>{children}</main>
    </div>
  );
}
