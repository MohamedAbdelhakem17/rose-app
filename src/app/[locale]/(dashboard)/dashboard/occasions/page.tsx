import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import OccasionsContent from './_components/occasions.content';

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  // Translation
  const t = await getTranslations();

  // Variable
  const currentPage = Number(page) || 1;

  return (
    <main className='bg-zinc-50 p-5 min-h-screen'>
      <section className='bg-white rounded-lg p-6 h-full'>
        {/* Page header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='font-semibold text-2xl'>
            {t('all-occasions-page-title')}
          </h1>

          <Button className='flex items-center gap-2'>
            <Plus />
            {t('add-occasion-button-label')}
          </Button>
        </div>

        {/* Content */}
        <Suspense fallback={'Loading ..'}>
          <OccasionsContent page={currentPage} />
        </Suspense>
      </section>
    </main>
  );
}
