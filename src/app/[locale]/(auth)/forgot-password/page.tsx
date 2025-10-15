'use client';
import ForgotPasswordLayout from './_components/_layout/forgot-password-layout';

export default function page() {
  return (
    <main>
      {/* Render current step of forgot password steps */}
      <ForgotPasswordLayout />
    </main>
  );
}
