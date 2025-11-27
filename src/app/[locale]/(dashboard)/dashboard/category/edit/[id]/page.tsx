/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useUpdateCategory } from '@/hooks/use-update-category';

export default function EditCategoryPage() {
  // TRANSLATIONS
  const t = useTranslations();
  const params = useParams();
  const categoryId = params.id as string;

  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [selectedFile] = useState<File | null>(null);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { mutate: updateCategory, isPending } = useUpdateCategory();

  // Fetch category data on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoadingCategory(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${categoryId}`,
          {
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }

        const data = await response.json();
        const category = data.category || data.data || data;

        setCategoryName(category.name);
        if (category.image) {
          setCategoryImage(category.image);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load category';
        setError(errorMessage);
        console.error('Error fetching category:', err);
      } finally {
        setIsLoadingCategory(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const handleViewImage = () => {
    if (categoryImage) {
      setIsImageModalOpen(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setError(null);

    // Prepare update data
    const updateData: {
      id: string;
      name: string;
      image?: string;
      imageName?: string;
    } = {
      id: categoryId,
      name: categoryName.trim(),
    };

    // Only include image if a new file was selected
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateData.image = base64String;
        updateData.imageName = selectedFile.name;

        // Call mutation
        updateCategory(updateData);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Call mutation without image if no new file selected
      updateCategory(updateData);
    }
  };

  return (
    <section className='bg-gray-50 min-h-screen px-10 py-8'>
      <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
        <div className='px-6 pt-6'>
          <h1 className='text-lg font-semibold text-zinc-900'>
            {t('category-edit-title')}: {categoryName}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className='px-6 pt-6 pb-6 space-y-6'>
          {/* Name Field */}
          <div className='space-y-2'>
            <Label htmlFor='category-name' className='text-sm font-medium'>
              {t('category-edit-name-label')}{' '}
              <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='category-name'
              type='text'
              placeholder={t('category-edit-name-placeholder')}
              value={categoryName}
              onChange={event => setCategoryName(event.target.value)}
              required
              disabled={isLoadingCategory || isPending}
              className='h-12'
            />
          </div>

          {/* Category Image Field */}
          <div className='space-y-2 ms-auto  justify-self-end'>
            <div className='space-y-2'>
              {categoryImage && (
                <Button
                  type='button'
                  variant='secondary-outline'
                  size='sm'
                  onClick={handleViewImage}
                  className='flex items-center gap-2 text-blue-500'
                >
                  <Image className='h-4 w-4 ' />
                  {t('category-edit-view-image')}
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='rounded-lg bg-red-50 border border-red-200 p-3'>
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            size='lg'
            className='w-full rounded-lg'
            disabled={isLoadingCategory || isPending}
            loading={isPending}
            loadingText={t('category-edit-loading')}
          >
            {t('category-edit-submit')}
          </Button>
        </form>
      </div>

      {/* Image Modal Dialog */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>{t('category-image-modal-title')}</DialogTitle>
          </DialogHeader>
          <div className='flex items-center justify-center py-6'>
            <img
              src={categoryImage}
              alt='Category'
              className='max-w-full max-h-[60vh] object-contain rounded'
            />
          </div>
          <DialogFooter>
            <Button
              variant='secondary-outline'
              onClick={() => setIsImageModalOpen(false)}
            >
              {t('category-image-modal-close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
