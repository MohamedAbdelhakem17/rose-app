'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/utils';
import { useRouter } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useDeleteCategory } from '@/hooks/use-delete-category';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Trash2, Pen } from 'lucide-react';
import type { Category } from '@/lib/types/filters';

interface CategoriesClientProps {
  initialCategories: Category[];
  totalPages: number;
  totalCategories: Category[];
  initialSearch: string;
  error?: string;
}

export default function CategoriesClient({
  initialCategories,
  totalPages,
  initialSearch,
  error: initialError,
}: CategoriesClientProps) {
  // TRANSLATIONS
  const t = useTranslations();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  //NAVIGATION
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  // Extract pathname without locale prefix for pagination
  const pathnameWithoutLocale = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return '/' + segments.slice(1).join('/');
  }, [pathname]);

  const handleSearchChange = (query: string) => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set('search', query.trim());
    }
    // Reset page on search
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleEditCategory = (category: Category) => {
    router.push(`/dashboard/category/edit/${category._id}`);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory({ id: categoryToDelete._id });
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <section className='bg-gray-50 min-h-screen px-10 py-8'>
      <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
        <div className='flex items-center justify-between px-6 pt-6'>
          <h1 className='text-lg font-semibold text-zinc-900'>
            {t('category-all-categories')}
          </h1>

          <Button
            variant='primary'
            size='lg'
            className='rounded-full px-6'
            onClick={() => router.push('/dashboard/category/add')}
          >
            {t('category-add-new')}
          </Button>
        </div>

        <div className='px-6 pt-4 pb-2'>
          <div className='relative w-full'>
            <Search
              className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400'
              strokeWidth={1.5}
            />
            <Input
              type='text'
              placeholder={t('category-search-placeholder')}
              defaultValue={initialSearch}
              onChange={event => handleSearchChange(event.target.value)}
              className='w-full bg-zinc-50 pl-9'
            />
          </div>
        </div>

        <div className='px-6 pb-6'>
          <div className='overflow-hidden rounded-xl border border-zinc-100'>
            <TableContent
              error={initialError}
              categories={initialCategories}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          </div>

          {!initialError && (
            <Pagination
              totalPages={totalPages}
              pathname={pathnameWithoutLocale}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
                <Trash2 className='h-6 w-6 text-gray-600' />
              </div>
              <DialogTitle className='text-center text-xl font-semibold'>
                {t('category-delete-title')}
              </DialogTitle>
            </div>
          </DialogHeader>
          <DialogFooter className='flex gap-3 sm:justify-center'>
            <Button
              variant='secondary-outline'
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCategoryToDelete(null);
              }}
              className='flex-1'
            >
              {t('category-delete-cancel')}
            </Button>
            <Button
              variant='destructive'
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              loading={isDeleting}
              loadingText={t('category-delete-loading')}
              className='flex-1'
            >
              {t('category-delete-confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

type TableContentProps = {
  error?: string;
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

function TableContent({
  error,
  categories,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: TableContentProps) {
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
    <table className='w-full text-left text-sm'>
      <thead className='bg-zinc-50 text-xs uppercase text-zinc-500'>
        <tr>
          <th className='px-6 py-3 font-medium'>{t('category-table-name')}</th>
          <th className='px-6 py-3 font-medium'>
            {t('category-table-products')}
          </th>
          <th className='px-6 py-3 text-right font-medium'>
            {t('category-table-actions')}
          </th>
        </tr>
      </thead>
      <tbody className='bg-white text-sm text-zinc-700'>
        {categories.map(category => (
          <tr
            key={category._id}
            onClick={() =>
              onSelect(selectedId === category._id ? null : category._id)
            }
            className={cn(
              'cursor-pointer border-t border-zinc-100 transition-colors hover:bg-soft-pink-50',
              selectedId === category._id && 'bg-soft-pink-50'
            )}
          >
            <td className='px-6 py-3 align-middle text-sm font-medium text-zinc-900'>
              {category.name}
            </td>
            <td className='px-6 py-3 align-middle text-xs text-zinc-500'>
              {category.productsCount} products
            </td>
            <td className='px-6 py-3 align-middle'>
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='info-outline'
                  size='sm'
                  onClick={event => {
                    event.stopPropagation();
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
                  onClick={event => {
                    event.stopPropagation();
                    onDelete(category);
                  }}
                  className='flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                >
                  <Trash2 className='h-4 w-4' />
                  {t('category-delete-button')}
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
