import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Trash2, Pen } from 'lucide-react';
import type { Category } from '@/lib/types/filters';

interface CategoriesTableProps {
  error?: string;
  categories: Category[];
  onEdit: (_category: Category) => void;
  onDelete: (_category: Category) => void;
}

export default function CategoriesTable({
  error,
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const t = useTranslations();

  if (error) {
    return (
      <div className='flex items-center justify-center py-16 text-sm text-red-500'>
        {error}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className='flex items-center justify-center py-16 text-sm text-zinc-500'>
        {t('category-no-found')}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='font-medium'>
            {t('category-table-name')}
          </TableHead>
          <TableHead className='font-medium'>
            {t('category-table-products')}
          </TableHead>
          <TableHead className='text-right font-medium'>
            {t('category-table-actions')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map(category => (
          <TableRow key={category._id} className='hover:bg-soft-pink-50'>
            <TableCell className='font-medium text-zinc-900'>
              {category.name}
            </TableCell>
            <TableCell className='text-xs text-zinc-500'>
              {category.productsCount} products
            </TableCell>
            <TableCell>
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='info-outline'
                  size='sm'
                  onClick={e => {
                    e.stopPropagation();
                    onEdit(category);
                  }}
                  className='flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                >
                  <Pen className='h-4 w-4' />
                  {t('category-edit-button')}
                </Button>
                <Button
                  type='button'
                  variant='destructive-outline'
                  size='sm'
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(category);
                  }}
                  className='flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                >
                  <Trash2 className='h-4 w-4' />
                  {t('category-delete-button')}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
