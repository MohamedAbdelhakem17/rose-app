// --------------------------------------
//  Occasions Types
// --------------------------------------
export type OccasionType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

// --------------------------------------
//  API Response Type
// --------------------------------------
export type GetOccasionsTypeResponse = {
  message: string;
  status: string;
  occasions: OccasionType[];
};
