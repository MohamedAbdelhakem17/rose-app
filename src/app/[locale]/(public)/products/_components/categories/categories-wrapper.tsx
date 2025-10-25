import { getCategories } from '@/lib/apis/categories/get-categories';
import CategoriesList from './categories-list';

// Created a wrapper to be able to make an async function
// to  wrap it around a suspense

export default async function CategoriesWrapper() {
  // get the categories array reponse

  const { categories } = await getCategories();

  return <CategoriesList categories={categories} />;
}
