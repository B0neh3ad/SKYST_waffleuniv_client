"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// 타입 정의
interface UserColorContextType {
  userColor: string;
  setUserColor: (color: string) => void;
  roomId: string;
  setRoomId: (id: string) => void;
  token: string;
  setToken: (token: string) => void;
  comment: string;
  labelId: number;
  labelName: string;
  setComment: (comment: string) => void;
  setLabelId: (id: number) => void;
  setLabelName: (name: string) => void;
}

const UserColorContext = createContext<UserColorContextType | undefined>(
  undefined
);

export function useUserColor() {
  const ctx = useContext(UserColorContext);
  if (!ctx)
    throw new Error("useUserColor must be used within a UserColorProvider");
  return ctx;
}

// useAuth 훅 추가
export function useAuth() {
  const ctx = useContext(UserColorContext);
  if (!ctx) throw new Error("useAuth must be used within a UserColorProvider");
  return {
    token: ctx.token,
    setToken: ctx.setToken,
    comment: ctx.comment,
    setComment: ctx.setComment,
    labelId: ctx.labelId,
    setLabelId: ctx.setLabelId,
    labelName: ctx.labelName,
    setLabelName: ctx.setLabelName,
  };
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userColor, setUserColor] = useState("#");
  const [roomId, setRoomId] = useState("");
  const [token, setToken] = useState("");
  const [comment, setComment] = useState("");
  const [labelId, setLabelId] = useState(0);
  const [labelName, setLabelName] = useState("");

  // 쿠키에서 token을 읽어와서 상태에 저장
  useEffect(() => {
    const getTokenFromCookie = () => {
      return (
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || ""
      );
    };

    // 최초 마운트 시 토큰 저장
    setToken(getTokenFromCookie());

    // 1초마다 쿠키 변경 감지해서 토큰 갱신 (수시로)
    const interval = setInterval(() => {
      setToken(getTokenFromCookie());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserColorContext.Provider
      value={{
        userColor,
        setUserColor,
        roomId,
        setRoomId,
        token,
        setToken,
        comment,
        setComment,
        labelId,
        setLabelId,
        labelName,
        setLabelName,
      }}
    >
      {children}
    </UserColorContext.Provider>
  );
}
