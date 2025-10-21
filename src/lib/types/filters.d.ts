export type FilterHeaderProps = {
  title: string;
  onReset: () => void;
  className?: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type RatingFilterProps = {
  max?: number;
  initial?: number;
};
