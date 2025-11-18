'use client';

import {
  FileText,
  Gift,
  Headphones,
  HelpCircle,
  Home,
  Info,
  List,
  LucideProps,
  PartyPopper,
  Shield,
} from 'lucide-react';

import { useTranslations } from 'next-intl';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type NavType = 'navbar' | 'footer';

type LinkType = {
  name: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export function useNavigationLinks(type: NavType = 'navbar'): LinkType[] {
  //  Translation
  const t = useTranslations();

  // Variables
  const baseLinks: LinkType[] = [
    { name: t('home-link'), href: '/', icon: Home },
    { name: t('products-link'), href: '/products', icon: Gift },
    { name: t('categories-link'), href: '/categories', icon: List },
    { name: t('occasions-link'), href: '/occasions', icon: PartyPopper },
    { name: t('contact-link'), href: '/contact', icon: Headphones },
    { name: t('about-link'), href: '/about', icon: Info },
    { name: t('terms-link'), href: '/terms', icon: FileText },
    { name: t('privacy-link'), href: '/privacy', icon: Shield },
    { name: t('faqs-link'), href: '/faqs', icon: HelpCircle },
  ];

  // Navbar Links
  const navbarPaths = [
    '/',
    '/products',
    '/categories',
    '/occasions',
    '/contact',
    '/about',
  ];

  //  Filter links based on menu type
  const filtered = baseLinks.filter(link =>
    type === 'navbar' ? navbarPaths.includes(link.href) : true
  );

  //  Map and return translated + typed links
  return filtered.map(link => ({
    name: link.name,
    href: link.href,
    ...(type === 'navbar' && { icon: link.icon }), // add icon only for navbar
  }));
}
