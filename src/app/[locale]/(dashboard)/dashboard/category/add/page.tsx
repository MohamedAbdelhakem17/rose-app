'use client';

import { useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Upload } from 'lucide-react';
import { useCreateCategory } from '@/hooks/use-create-category';

export default function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createCategory, isPending, error } = useCreateCategory();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form
    if (!categoryName.trim()) {
      return;
    }

    if (!selectedFile) {
      return;
    }

    // Convert File to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      // Call mutation with base64 string
      createCategory({
        name: categoryName.trim(),
        image: base64String,
        imageName: selectedFile.name,
      });
    };
    reader.onerror = () => {
      // Handle file read error
      console.error('Error reading file');
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <section className='bg-gray-50 min-h-screen px-10 py-8'>
      <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
        <div className='px-6 pt-6'>
          <h1 className='text-lg font-semibold text-zinc-900'>
            Add a New Category
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

          {/* Category Image Field */}
          <div className='space-y-2'>
            <Label htmlFor='category-image' className='text-sm font-medium'>
              Category image <span className='text-red-500'>*</span>
            </Label>
            <div className='relative flex items-center'>
              <Input
                id='category-image'
                type='text'
                placeholder={
                  selectedFile ? selectedFile.name : 'No file selected'
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
                required
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
                Upload file
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='rounded-lg bg-red-50 border border-red-200 p-3'>
              <p className='text-sm text-red-600'>{error.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            size='lg'
            className='w-full rounded-lg'
            disabled={isPending}
            loading={isPending}
            loadingText='Creating...'
          >
            Add Category
          </Button>
        </form>
      </div>
    </section>
  );
}
