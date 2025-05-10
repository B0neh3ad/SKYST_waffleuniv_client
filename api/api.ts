import axios from "axios";
import { prefix } from "./utils";
import { BASE_URL } from ".";

// 타입 정의를 이 파일에 직접 작성
export interface RegisterResponse {
  userId: string;
  nickName: string;
}
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  resultCode: string;
}

export class HomeAPI {
  private static pathname = (path: string) =>
    BASE_URL + `${prefix}/v1/users/${path}`;

  static register = (colorHex: string) => {
    return axios.post<ApiResponse<RegisterResponse>>(
      this.pathname("register"),
      { colorHex }
    );
  };

  // 다른 API도 아래처럼 추가
  // static someOtherApi = (param: string) => {
  //   return axios.get<ApiResponse<SomeType>>(this.pathname(`/some-path`), { params: { param } });
  // };
}
