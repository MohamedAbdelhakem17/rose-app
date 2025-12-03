'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Upload } from 'lucide-react';

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
import { useUpdateCategory } from '@/hooks/use-update-category';
import type { Category } from '@/lib/types/filters';

interface EditCategoryFormProps {
  category: Category;
}

/**
 * Edit Category Form Component
 *
 * Client component that handles:
 * - Category name editing
 * - Optional image replacement
 * - Image preview modal
 * - Form submission via Server Action
 *
 * Receives pre-fetched category data from server component
 */
export function EditCategoryForm({ category }: EditCategoryFormProps) {
  // STATE
  const [categoryName, setCategoryName] = useState(category.name);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // REFS
  const fileInputRef = useRef<HTMLInputElement>(null);

  // MUTATIONS
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  // FUNCTIONS
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleViewImage = () => {
    if (category.image) {
      setIsImageModalOpen(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form
    if (!categoryName.trim()) {
      return;
    }

    // Prepare update data
    const updateData: {
      id: string;
      name: string;
      image?: string;
      imageName?: string;
    } = {
      id: category._id,
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
        console.error('Error reading file');
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
            Edit Category: {categoryName}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className='px-6 pt-6 pb-6 space-y-6'>
          {/* Name Field */}
          <div className='space-y-2'>
            <Label htmlFor='category-name' className='text-sm font-medium'>
              Name <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='category-name'
              type='text'
              placeholder='Enter category name'
              value={categoryName}
              onChange={event => setCategoryName(event.target.value)}
              required
              disabled={isPending}
              className='h-12'
            />
          </div>

          {/* Current Image Preview */}
          {category.image && (
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>Current Image</Label>
              <Button
                type='button'
                variant='secondary-outline'
                size='sm'
                onClick={handleViewImage}
                disabled={isPending}
                className='flex items-center gap-2 text-blue-500'
              >
                <ImageIcon className='h-4 w-4' />
                View Image
              </Button>
            </div>
          )}

          {/* Change Image Field (Optional) */}
          <div className='space-y-2'>
            <Label htmlFor='category-image' className='text-sm font-medium'>
              Change Image{' '}
              <span className='text-gray-400 text-xs'>(Optional)</span>
            </Label>
            <div className='relative flex items-center'>
              <Input
                id='category-image'
                type='text'
                placeholder={
                  selectedFile ? selectedFile.name : 'Choose a new image'
                }
                value={selectedFile ? selectedFile.name : ''}
                readOnly
                className='h-12 pr-32'
              />
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelect}
                className='hidden'
                disabled={isPending}
              />
              <Button
                type='button'
                variant='secondary-outline'
                size='sm'
                onClick={handleUploadClick}
                disabled={isPending}
                className='absolute right-2 flex items-center gap-2'
              >
                <Upload className='h-4 w-4' />
                Upload
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            size='lg'
            className='w-full rounded-lg'
            disabled={isPending}
            loading={isPending}
            loadingText='Updating...'
          >
            Update Category
          </Button>
        </form>
      </div>

      {/* Image Modal Dialog */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Category Image</DialogTitle>
          </DialogHeader>
          <div className='flex items-center justify-center py-6'>
            <Image
              src={category.image}
              alt={category.name}
              width={600}
              height={400}
              className='max-w-full max-h-[60vh] object-contain rounded'
            />
          </div>
          <DialogFooter>
            <Button
              variant='secondary-outline'
              onClick={() => setIsImageModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
