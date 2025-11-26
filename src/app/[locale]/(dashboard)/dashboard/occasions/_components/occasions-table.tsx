import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import OccasionsList from './occasions-list';

export default function OccasionsTable({
  occasions,
}: {
  occasions: OccasionsType[];
}) {
  // Translation
  const t = useTranslations();

  return (
    <Table className='table-auto w-full '>
      {/* Table header */}
      <TableHeader>
        <TableRow>
          {/* Occasion Name */}
          <TableHead className='w-max whitespace-nowrap'>
            {t('occasions-table-header-name')}
          </TableHead>

          {/* occasions products count */}
          <TableHead className='w-full whitespace-nowrap'>
            {t('occasions-table-header-products')}
          </TableHead>

          {/* Actions*/}
          <TableHead className='w-max whitespace-nowrap' />
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* Empty State */}
        {occasions.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className='text-center py-6 text-muted-foreground'
            >
              {t('no-occasions-found-message')}
            </TableCell>
          </TableRow>
        ) : (
          // Display Data
          occasions.map(occasion => (
            <OccasionsList occasion={occasion} key={occasion._id} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
