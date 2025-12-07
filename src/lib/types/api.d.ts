declare interface ErrorResponse {
  message: string;
}

declare type SuccessResponse<T> = {
  message: 'success';
};

declare type SuccessResponse<T, M = Metadata> = {
  message: 'success';
  metadata: M;
};

declare type SuccessResponse<T, M = Metadata> = {
  message: string | 'success';
  metadata: M;
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
