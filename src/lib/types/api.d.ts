declare interface ErrorResponse {
<<<<<<< HEAD
  message: string;
}

declare type SuccessResponse<T> = {
  message: 'success';
=======
  message: 'string';
}

declare type SuccessResponse<T, M = Metadata> = {
  message: 'success';
  metadata: M;
>>>>>>> fcef5b32b9101d184b9863a42765945454f4ff64
} & T;

declare type Metadata = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
  nextPage: number;
};

declare type PaginatedResponse<T, M = Metadata> = {
  metadata: M;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
