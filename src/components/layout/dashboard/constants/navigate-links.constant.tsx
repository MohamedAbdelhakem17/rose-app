import {
  CalendarHeart,
  ClipboardList,
  LayoutDashboard,
  Package,
} from 'lucide-react';

export const NAVIGATE_LINKS = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    hrf: '/dashboard/overview',
    ar: 'الملخص',
  },
  {
    icon: ClipboardList,
    label: 'Categories',
    hrf: '/dashboard/category',
    ar: 'الفئات',
  },
  {
    icon: CalendarHeart,
    label: 'Occasions',
    hrf: '/dashboard/occasions',
    ar: 'المناسبات',
  },
  {
    icon: Package,
    label: 'Products',
    hrf: '/dashboard/products',
    ar: 'المنتجات',
  },
] as const;
