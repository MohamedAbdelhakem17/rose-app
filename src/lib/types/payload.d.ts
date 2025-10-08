export type Testimonials = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  rating: number;
  content: string;
  status: string;
  featured: true;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TestimonialsResponse = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  testimonials: [
    {
      _id: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        photo: string;
      };
      rating: number;
      content: string;
      status: string;
      featured: true;
      createdAt: string;
      updatedAt: string;
      __v: number;
    },
  ];
};
