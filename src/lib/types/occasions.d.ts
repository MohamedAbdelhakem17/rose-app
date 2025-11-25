// --------------------------------------
//  occasions Types
// --------------------------------------
/** Single occasion item (from API) */
declare type OccasionsType = {
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
//  API Response Types
// --------------------------------------

/** Response: Get all occasions */
type GetOccasionsTypeResponse = ApiResponse<
  PaginatedResponse<{ occasions: OccasionsType[] }>
>;

/** Response: create new occasions */
type OccasionMutationResponse = ApiResponse<{
  occasions: OccasionsType;
}>;
