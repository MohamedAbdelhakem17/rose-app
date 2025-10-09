type ErrorResponse = {
  error: 'string';
};

type SuccessResponse<T> = {
  message: string | 'success';
} & T;

declare type Metadata = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
};

declare type PaginatedResponse<T, M = Metadata> = {
  metadata: M;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
