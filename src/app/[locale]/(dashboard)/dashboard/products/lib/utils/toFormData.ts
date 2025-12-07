import { AddProductForm } from '@/lib/schemas/dashboard/products.schema';

export function toFormData(values: AddProductForm) {
  const formData = new FormData();
  // Title
  formData.append('title', values.title);

  // Description
  formData.append('description', values.description);

  formData.append('price', values.price);

  // Discount
  values.discount
    ? formData.append('discount', values.discount)
    : formData.append('discount', '0');

  // PriceAfterDiscount
  values.priceAfterDiscount
    ? formData.append('priceAfterDiscount', values.priceAfterDiscount)
    : formData.append('priceAfterDiscount', values.price);

  // Quantity
  formData.append('quantity', values.quantity);

  // Category
  formData.append('category', values.category);

  // Occasion
  formData.append('occasion', values.occasion);

  return formData;
}
