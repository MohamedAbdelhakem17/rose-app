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
    <Table className='table-fixed w-full '>
      {/* Table header */}
      <TableHeader>
        <TableRow>
          {/* occasion name  */}
          <TableHead className='w-[15%] whitespace-nowrap'>
            {t('occasions-table-header-name')}
          </TableHead>

          {/* Product count */}
          <TableHead className='whitespace-nowrap w-[75%]'>
            {t('occasions-table-header-products')}
          </TableHead>

          {/* Actions */}
          <TableHead className='w-[10%] whitespace-nowrap text-right' />
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
