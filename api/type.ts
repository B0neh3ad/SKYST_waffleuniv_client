interface ApiResponse<T> {
  data: T;
  resultCode: number;
}

export type AxiosResult<T> = Promise<ApiResponse<T>>;

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
