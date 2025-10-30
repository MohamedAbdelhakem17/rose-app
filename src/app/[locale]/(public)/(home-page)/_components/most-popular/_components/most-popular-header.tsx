import SectionTitle from '@/components/shared/sedtion-title';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import { XCircleIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import OccasionsList from './occasions-list';

export default async function MostPopularHeader() {
  // Translation
  const t = await getTranslations();

  // Query
  const response: GetOccasionsTypeResponse = await getOccasions();

  if ('error' in response) {
    return (
      // alert error
      <Alert variant='destructive'>
        {/* Icon */}
        <XCircleIcon className='h-4 w-4' />

        {/* Title */}
        <AlertTitle>Error!</AlertTitle>

        {/* Message error */}
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='col-span-4 flex items-center justify-between mb-10'>
      {/* Title */}
      <SectionTitle title={t('most-popular-title')} />

      {/* Occasions Filter */}
      <OccasionsList occasions={response.occasions} />
    </div>
  );
}
