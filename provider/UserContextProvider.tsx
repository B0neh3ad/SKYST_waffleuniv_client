"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { JoinRoomResponse } from "../api/api";
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
  userCount: number;
  setUserCount: (count: number) => void;
  songCount: number;
  setSongCount: (count: number) => void;
  currentSongVideoId: string;
  setCurrentSongVideoId: (id: string) => void;
  currentSongStartedAt: string;
  setCurrentSongStartedAt: (time: string) => void;
  submittedSong: {
    title: string;
    artist: string;
    sourceUrl: string;
    comment: string;
  };
  setSubmittedSong: (song: {
    title: string;
    artist: string;
    sourceUrl: string;
    comment: string;
  }) => void;
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
    roomId: ctx.roomId,
    setRoomId: ctx.setRoomId,
    comment: ctx.comment,
    setComment: ctx.setComment,
    labelId: ctx.labelId,
    setLabelId: ctx.setLabelId,
    labelName: ctx.labelName,
    setLabelName: ctx.setLabelName,
    userCount: ctx.userCount,
    setUserCount: ctx.setUserCount,
    songCount: ctx.songCount,
    setSongCount: ctx.setSongCount,
    currentSongVideoId: ctx.currentSongVideoId,
    setCurrentSongVideoId: ctx.setCurrentSongVideoId,
    currentSongStartedAt: ctx.currentSongStartedAt,
    setCurrentSongStartedAt: ctx.setCurrentSongStartedAt,
    submittedSong: ctx.submittedSong,
    setSubmittedSong: ctx.setSubmittedSong,
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
  const [userCount, setUserCount] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [currentSongVideoId, setCurrentSongVideoId] = useState("");
  const [currentSongStartedAt, setCurrentSongStartedAt] = useState("");

  /*object : { title, artist, sourceUrl, comment } */
  const [submittedSong, setSubmittedSong] = useState({
    title: "",
    artist: "",
    sourceUrl: "",
    comment: "",
  });

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
        userCount,
        setUserCount,
        songCount,
        setSongCount,
        currentSongVideoId,
        setCurrentSongVideoId,
        currentSongStartedAt,
        setCurrentSongStartedAt,
        submittedSong,
        setSubmittedSong,
      }}
    >
      {children}
    </UserColorContext.Provider>
  );
}
