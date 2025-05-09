import { toast } from "sonner";
import axios from "axios";

// Update BASE_URL to use the Swagger API endpoint
export const BASE_URL = "http://43.201.28.34:8080";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response: any) => {
    return response.data || response;
  },
  async (error) => {
    const { response } = error;
    const errorData = response?.data;

    // 에러 메시지 표시
    if (errorData?.message) {
      toast.error(errorData.message);
    }

    // 원본 에러 던지기
    return Promise.reject({
      ...error,
      errorData,
    });
  }
);

export default api;
