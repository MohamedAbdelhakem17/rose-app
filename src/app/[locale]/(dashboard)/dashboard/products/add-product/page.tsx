import React from 'react';
import AddForm from './_components/add-form';

export default function Page() {
  return (
    <div className='mx-7'>
      <h1 className=' text-2xl font-semibold font-inter mt-7 mb-6'>
        Add a New Product
      </h1>
      <AddForm />
    </div>
  );
}
