import { Gift, Headphones, Home, Info, List, PartyPopper } from 'lucide-react';

export const navigationItems = [
  { name: 'Home', href: '/', icon: Home, ar: 'الصفحه الرئسيه' },
  { name: 'Products', href: '/products', icon: Gift, ar: 'المنتجات' },
  { name: 'Categories', href: '/categories', icon: List, ar: 'الفئات' },
  { name: 'Occasions', href: '/occasions', icon: PartyPopper, ar: 'المناسبات' },
  { name: 'Contact', href: '/contact', icon: Headphones, ar: 'تواصل معنا' },
  { name: 'About', href: '/about', icon: Info, ar: 'من نحن' },
];
