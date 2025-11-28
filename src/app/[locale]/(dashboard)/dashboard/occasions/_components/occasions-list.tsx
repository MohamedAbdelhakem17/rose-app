import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { Pen } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import DeleteOccasions from './delete-occasions';

export default async function OccasionsList({
  occasion,
}: {
  occasion: OccasionsType;
}) {
  // Translation
  const t = await getTranslations();
  return (
    <>
      <TableRow>
        {/* Occasion Name */}
        <TableCell className='whitespace-nowrap'>{occasion.name}</TableCell>

        {/* Occasions product count */}
        <TableCell className='w-full whitespace-nowrap '>
          {occasion.productsCount}
        </TableCell>

        {/* Actions */}
        <TableCell className='w-max whitespace-nowrap text-center flex items-center gap-x-5'>
          {/* Edit action */}
          <Button
            type='button'
            variant='info-outline'
            size='sm'
            className=' bg-blue-50 hover:bg-blue-100  border-blue-200'
          >
            <Link
              className='flex items-center gap-2  text-blue-700 '
              href={`occasions/${occasion._id}?name=update occasion: ${occasion.name}`}
            >
              <Pen className='h-4 w-4' />
              {t('edit')}
            </Link>
          </Button>

          {/* Delete action */}
          <DeleteOccasions occasionId={occasion._id} />
        </TableCell>
      </TableRow>
    </>
  );
}
