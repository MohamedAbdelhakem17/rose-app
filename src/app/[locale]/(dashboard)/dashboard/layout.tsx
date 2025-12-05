import { Header, Sidebar } from '@/components/layout/dashboard';
import { cn } from '@/lib/utils/utils';
import { getLocale } from 'next-intl/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Locale
  const locale = await getLocale();

  // Variables
  const RTL: boolean = locale === 'ar';
  return (
    <div>
      <Sidebar />
      <div className={cn('w-full', RTL ? 'pr-80' : 'pl-80')}>
        <Header />
        {children}
      </div>
    </div>
  );
}
