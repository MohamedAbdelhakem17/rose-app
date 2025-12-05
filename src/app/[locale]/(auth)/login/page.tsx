import { useTranslations } from 'next-intl';
import AuthenticationHeading from './../_components/_layout/authentication-heading';
import AuthenticationLink from './../_components/_layout/authentication-link';
import LoginForm from './_components/login-form';

export default function Page() {
  const t = useTranslations();
  return (
    <section className=' flex flex-col justify-center items-center'>
      {/* Title */}
      <AuthenticationHeading.title className='font-edwardian text-5xl text-center w-full text-maroon-700 font-normal '>
        {t('login-page-heading')}
      </AuthenticationHeading.title>

      {/* Form */}
      <LoginForm />

      {/* Link */}
      <AuthenticationLink
        message={t('register-paragraph')}
        link={{
          label: t('register-paragraph-action'),
          href: '/register',
        }}
      />
    </section>
  );
}
