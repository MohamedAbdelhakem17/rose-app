import { Gift, Headphones, Home, Info, List, PartyPopper } from 'lucide-react';

export const navigationItems = [
  { name: 'Home', href: '/', icon: Home, isActive: true },
  { name: 'Products', href: '/products', icon: Gift },
  { name: 'Categories', href: '/categories', icon: List },
  { name: 'Occasions', href: '/occasions', icon: PartyPopper },
  { name: 'Contact', href: '/contact', icon: Headphones },
  { name: 'About', href: '/about', icon: Info },
];
