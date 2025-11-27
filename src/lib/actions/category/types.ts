import type { Category } from '@/lib/types/filters';

export interface CreateCategoryResponse {
  success: boolean;
  data?: Category;
  error?: string;
  message?: string;
}

export interface CreateCategoryInput {
  name: string;
  image: string; // base64 encoded image
  imageName: string; // original filename
}

export interface UpdateCategoryInput {
  id: string;
  name: string;
  image?: string; // base64 encoded image (optional if not changing image)
  imageName?: string; // original filename
}

export interface DeleteCategoryInput {
  id: string;
}
