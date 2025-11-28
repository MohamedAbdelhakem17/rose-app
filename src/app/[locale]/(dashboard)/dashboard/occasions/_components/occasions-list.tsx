import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { Pen, Trash2 } from 'lucide-react';
// import { getTranslations } from 'next-intl/server';

export default async function OccasionsList({
  occasion,
}: {
  occasion: OccasionsType;
}) {
  // Translation
  // const t = await getTranslations();
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
          <Button
            type='button'
            variant='info-outline'
            size='sm'
            className=' bg-blue-50 hover:bg-blue-100  border-blue-200'
          >
            <Link
              className='flex items-center gap-2  text-blue-700 '
              href={'#'}
            >
              <Pen className='h-4 w-4' />
              Edit
            </Link>
          </Button>
          <Button
            type='button'
            variant='destructive-outline'
            size='sm'
            className='flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
          >
            <Trash2 className='h-4 w-4' />
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
