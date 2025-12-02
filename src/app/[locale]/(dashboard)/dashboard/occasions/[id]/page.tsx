import { getOccasion } from '@/lib/apis/occasions/occasions.api';
import { getTranslations } from 'next-intl/server';
import OccasionEditForm from './_components/occasion-edit-form';

type Props = {
  params: { id: string };
};

export default async function OccasionEditPage({ params }: Props) {
  // Translation
  const t = await getTranslations();

  //  Navigation
  const { id } = params;

  // Query
  const payload: GetOccasionTypeResponse = await getOccasion(id);

  // Error case if error in get data
  if ('error' in payload) {
    return (
      <main className='bg-zinc-50 p-5 min-h-screen'>
        <h1 className='font-semibold text-2xl font-inter mb-6'>
          {t('failed-occasion-fetch')}
        </h1>
      </main>
    );
  }

  return (
    <main className='bg-zinc-50 p-5 min-h-screen'>
      {/* Title */}
      <h1 className='font-semibold text-2xl font-inter mb-6'>
        {t('update-occasion-form-label', {
          occasion: payload.occasion.name,
        })}
      </h1>

      {/* Form */}
      <OccasionEditForm
        id={payload.occasion._id}
        name={payload.occasion.name}
        image={payload.occasion.image}
      />
    </main>
  );
}
