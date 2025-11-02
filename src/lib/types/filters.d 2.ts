export declare interface FilterHeaderProps {
  title: string;
  onReset: () => void;
  className?: string;
}

export declare interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export declare interface RatingFilterProps {
  max?: number;
  initial?: number;
}
