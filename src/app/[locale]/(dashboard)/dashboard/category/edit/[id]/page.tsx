import { getCategoryById } from '@/lib/apis/categories/get-category-by-id';
import { EditCategoryForm } from './_components/edit-category-form';

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  try {
    const category = await getCategoryById(id);

    return <EditCategoryForm category={category} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to load category';

    return (
      <section className='bg-gray-50 min-h-screen px-10 py-8'>
        <div className='bg-white rounded-2xl shadow-sm border border-zinc-100'>
          <div className='px-6 pt-6'>
            <h1 className='text-lg font-semibold text-zinc-900'>Error</h1>
          </div>
          <div className='px-6 pt-6 pb-6'>
            <div className='rounded-lg bg-red-50 border border-red-200 p-3'>
              <p className='text-sm text-red-600'>{errorMessage}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
