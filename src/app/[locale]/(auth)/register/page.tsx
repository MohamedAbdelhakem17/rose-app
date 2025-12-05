import AuthenticationHeading from '@/app/[locale]/(auth)/_components/_layout/authentication-heading';
import { useTranslations } from 'next-intl';
import AuthenticationLink from './../_components/_layout/authentication-link';
import RegisterForm from './_components/register-form';

export default function RegisterPage() {
  const t = useTranslations();
  return (
    <div>
      {/* Title */}
      <AuthenticationHeading.title className='font-edwardian text-5xl text-center w-full text-maroon-700 font-normal '>
        {t('register-page-heading')}
      </AuthenticationHeading.title>

      {/* Form */}
      <RegisterForm />

      {/* Link */}
      <AuthenticationLink
        message={t('forgot-password-redirect-message')}
        link={{
          label: t('forgot-password-redirect-link'),
          href: '/login',
        }}
      />
    </div>
  );
}
