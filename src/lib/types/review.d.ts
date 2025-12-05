import { User } from 'next-auth';

export type Review = {
  reviews: [
    {
      _id: string;
      product: Product;
      user: User;
      rating: number;
      title: string;
      comment: string;
      createdAt: string;
    },
  ];
};

export type Product = {
  _id: string;
  title: string;
  imgCover: string;
  id: string;
};

declare type AddReview = {
  rating: number;
  title: string;
  product: string | string[];
  comment: string;
};
