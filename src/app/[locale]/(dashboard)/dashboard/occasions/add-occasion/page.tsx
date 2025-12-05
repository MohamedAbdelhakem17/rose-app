import OccasionForm from './_components/occasion-form';

export default function AddOccasionPage() {
  return (
    <main className='bg-zinc-50 p-5 min-h-screen'>
      {/* Title */}
      <h1 className='font-semibold text-2xl font-inter mb-6'>
        Add a New Occasion
      </h1>

      {/* Form */}
      <OccasionForm />
    </main>
  );
}
