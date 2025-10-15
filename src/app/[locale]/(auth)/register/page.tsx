import React from 'react';
import RegisterForm from './_components/register-form';

export default function RegisterPage() {
  return (
    <div>
      <header className=''>
        <h1 className='font-edwardian text-[35px] text-center w-full text-maroon-700 '>
          Become part of our family!
        </h1>
      </header>
      <RegisterForm />
    </div>
  );
}
