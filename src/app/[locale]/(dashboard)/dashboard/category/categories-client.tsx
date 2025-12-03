'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useDeleteCategory } from '@/hooks/use-delete-category';
import type { Category } from '@/lib/types/filters';
import CategoriesHeader from './components/categories-header';
import CategoriesSearch from './components/categories-search';
import CategoriesTable from './components/categories-table/categories-table';
import CategoriesPagination from './components/categories-pagination';
import DeleteCategoryDialog from './components/delete-category-dialog';

interface CategoriesClientProps {
  categories: Category[];
  totalPages: number;
  searchQuery: string;
  error?: string;
}

export default function CategoriesClient({
  categories,
  totalPages,
  searchQuery,
  error,
}: CategoriesClientProps) {
  const router = useRouter();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSearchChange = (query: string) => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer with 300ms debounce
    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) {
        params.set('search', query.trim());
      }
      params.delete('page');
      router.push(`?${params.toString()}`, { scroll: false });
    }, 300);
  };

  const handleAddCategory = () => {
    router.push('/dashboard/category/add');
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
      deleteCategory(
        { id: categoryToDelete._id },
        {
          onSuccess: () => {
            // Close dialog only after successful deletion
            setIsDeleteDialogOpen(false);
            setCategoryToDelete(null);
          },
          onError: () => {
            // Keep dialog open on error so user can retry or see the error
            // Optionally close after showing error message
          },
        }
      );
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <section className='bg-gray-50 min-h-screen px-10 py-8'>
      <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
        <CategoriesHeader onAddCategory={handleAddCategory} />

        <CategoriesSearch
          initialSearch={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <div className='px-6 pb-6'>
          <div className='overflow-hidden rounded-xl border border-zinc-100'>
            <CategoriesTable
              error={error}
              categories={categories}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          </div>

          {!error && <CategoriesPagination totalPages={totalPages} />}
        </div>
      </div>

      <DeleteCategoryDialog
        isOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
}
