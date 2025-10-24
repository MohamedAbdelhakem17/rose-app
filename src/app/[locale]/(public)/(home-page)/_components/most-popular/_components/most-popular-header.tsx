import SectionTitle from '@/components/shared/sedtion-title';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import { getTranslations } from 'next-intl/server';
import OccasionsList from './occasions-list';

export default async function MostPopularHeader() {
  // Translation
  const t = await getTranslations();

  // Query
  const response: GetOccasionsTypeResponse = await getOccasions();
  const occasions = 'error' in response ? [] : response.occasions;

  return (
    <div className='col-span-4 flex items-center justify-between mb-10'>
      {/* Title */}
      <SectionTitle title={t('most-popular-title')} />

      {/* Occasions Filter */}
      <OccasionsList occasions={occasions} />
    </div>
  );
}
