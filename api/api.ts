import axios from "axios";
import { prefix } from "./utils";
import { BASE_URL } from ".";

// 타입 정의를 이 파일에 직접 작성
export interface RegisterResponse {
  nickName: string;
  token: string;
  userId: string;
}
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  resultCode: string;
  [key: string]: any;
}

// record 응답 타입 정의
export interface RecordResponse {
  comment: string;
  labelId: number;
  labelName: string;
}

// join-room 응답 타입 정의
export interface JoinRoomResponse {
  roomId: number;
  userCount: number;
  songCount: number;
  currentSongVideoId: string;
  currentSongStartedAt: string;
}

// feedback 요청 타입 정의
export interface FeedbackRequest {
  isCorrect: boolean;
  labelId: number;
}
// 필요시 응답 타입도 정의 (예시로 빈 객체로 둡니다)
export interface FeedbackResponse {
  // 실제 응답 구조에 맞게 작성
}

// me 응답 타입 정의
export interface MeResponse {
  id: number;
}

export interface EmotionLabelResponse {
  id: number;
  name: string;
}

export class HomeAPI {
  private static pathname = (path: string) =>
    BASE_URL + `${prefix}/v1/users/${path}`;

  private static emotionLabelPathname = (path: string) =>
    BASE_URL + `${prefix}/v1/emotion-labels/${path}`;

  static register = (colorHex: string, token?: string) => {
    return axios.post<ApiResponse<RegisterResponse>>(
      this.pathname("register"),
      { colorHex },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // PUT /api/v1/users/record
  static record = (content: string, token?: string) => {
    return axios.put<ApiResponse<RecordResponse>>(
      this.pathname("record"),
      { content },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // POST /api/v1/users/leave-room
  static leaveRoom = (token?: string) => {
    return axios.post(
      this.pathname("leave-room"),
      {},
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // POST /api/v1/users/join-room
  static joinRoom = (token?: string) => {
    return axios.post<ApiResponse<JoinRoomResponse>>(
      this.pathname("join-room"),
      {},
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // POST /api/v1/users/feedback
  static feedback = (isCorrect: boolean, labelId: number, token?: string) => {
    return axios.post<ApiResponse<FeedbackResponse>>(
      this.pathname("feedback"),
      { isCorrect, labelId },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // GET /api/v1/users/me
  static me = (token?: string) => {
    return axios.get<ApiResponse<MeResponse>>(this.pathname("me"), {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  };

  // PUT /api/v1/emotion-labels/{id}
  static updateEmotionLabel = (id: number, name: string, token?: string) => {
    return axios.put<ApiResponse<EmotionLabelResponse>>(
      this.emotionLabelPathname(`${id}`),
      { name },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // DELETE /api/v1/emotion-labels/{id}
  static deleteEmotionLabel = (id: number, token?: string) => {
    return axios.delete(this.emotionLabelPathname(id.toString()), {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  };

  // GET /api/v1/emotion-labels/{id}
  static getEmotionLabels = (token?: string) => {
    return axios.get<ApiResponse<EmotionLabelResponse[]>>(
      BASE_URL + `${prefix}/v1/emotion-labels`,
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };

  // POST /api/v1/emotion-labels
  static createEmotionLabel = (name: string, token?: string) => {
    // POST는 /api/v1/emotion-labels (path 파라미터 없이)
    return axios.post<ApiResponse<EmotionLabelResponse>>(
      BASE_URL + `${prefix}/v1/emotion-labels`,
      { name },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  };
  // 다른 API도 아래처럼 추가
  // static someOtherApi = (param: string) => {
  //   return axios.get<ApiResponse<SomeType>>(this.pathname(`/some-path`), { params: { param } });
  // };
}
