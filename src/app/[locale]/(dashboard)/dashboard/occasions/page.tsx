import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import OccasionsContent from './_components/occasions.content';

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  // Translation
  const t = await getTranslations();

  // Variables
  const currentPage = Number(searchParams.page) || 1;
  const search = searchParams.search ?? '';

  return (
    <main className='bg-zinc-50 p-5 min-h-screen'>
      <section className='bg-white rounded-lg p-6 h-full'>
        {/* Page header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='font-semibold text-2xl'>
            {t('all-occasions-page-title')}
          </h1>

          <Button>
            <Link
              href='occasions/add-occasion'
              className='flex items-center gap-2'
            >
              <Plus />
              {t('add-occasion-button-label')}
            </Link>
          </Button>
        </div>

        {/* Content */}
        <Suspense fallback={'Loading ..'}>
          <OccasionsContent page={currentPage} search={search} />
        </Suspense>
      </section>
    </main>
  );
}
