export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  resultCode: string;
}

export interface RegisterResponse {
  userId: string;
  colorHex: string;
}
