"use client";
import React, { useEffect, useRef, useState } from "react";
import PlaylistSection from "./PlaylistSection";
import CurrentMusic from "./CurrentMusic";
import { useUserColor } from "../../../../provider/UserContextProvider";
import Image from "next/image";
import type { YouTubePlayer as PlayerType } from "react-youtube";
import YouTubePlayer from "./YoutubePlayer";
import { HomeAPI } from "../../../../api/api";
import { useAuth } from "../../../../provider/UserContextProvider";
import { useStompClient } from "../../../../hooks/stompClient";
import LP_Icon from "../../../../public/img/LP_Icon";
import { emotionColorMapping, emotionMapping } from "@/constants/constants";

export default function RoomSection({ roomId }: { roomId: string }) {
  const {
    token,
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
    labelId,
    labelName,
  } = useAuth();

  // Add state for current song
  const [currentSong, setCurrentSong] = useState<{
    id: number;
    title: string;
    artist: string;
    videoId: string;
    comment: string;
    fullStory: string;
  } | null>(null);

  const [isStompReady, setIsStompReady] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("🔍 Current State:", {
      currentSong,
      currentSongVideoId,
      currentSongStartedAt,
      userCount,
      songCount,
      submittedSong,
      isStompReady,
    });
  }, [
    currentSong,
    currentSongVideoId,
    currentSongStartedAt,
    userCount,
    songCount,
    submittedSong,
    isStompReady,
  ]);

  const playlistSectionRef = useRef<any>(null);

  const { sendSongRequest, sendReaction } = useStompClient({
    url: "https://d2xeo8dtqopj84.cloudfront.net/ws",
    token,
    roomId,
    onConnect: () => {
      console.log("✅ STOMP 연결 성공");
      setIsStompReady(true);

      // STOMP 연결 직후 노래 요청 보내기
      if (submittedSong.title) {
        console.log(
          "🎵 Sending song request after STOMP connect:",
          submittedSong
        );
        sendSongRequest({
          title: submittedSong.title,
          artist: submittedSong.artist,
          sourceUrl: submittedSong.sourceUrl,
          comment: submittedSong.comment,
        });
      }
    },
    onMessage: (msg) => {
      console.log("📥 Incoming STOMP Message:", {
        action: msg.action,
        content: msg.content,
        fullMessage: msg,
      });

      if (msg.action == "PLAY") {
        console.log("🎵 Playing new song:", msg.content);
        setCurrentSong(msg.content);
        setCurrentSongVideoId(msg.content.videoId);
        setCurrentSongStartedAt(msg.content.startedAt);
      } else if (msg.action == "UPD_SONG_COUNT") {
        setSongCount(msg.content);
      } else if (msg.action == "UPD_USER_COUNT") {
        setUserCount(msg.content);
      } else if (msg.action === "REACTION") {
        // REACTION 메시지 도착 시 PlaylistSection에 이모지 전달
        if (
          playlistSectionRef.current &&
          playlistSectionRef.current.addEmojiFromReaction
        ) {
          console.log("🎵 Reaction received:", msg.content);
          playlistSectionRef.current.addEmojiFromReaction(msg.content);
        }
      } else {
        console.log("❓ Unknown message type:", msg);
      }
    },
  });

  useEffect(() => {
    // 1. 새로운 방에 대한 정보 가져오기
    const fetchRoomInfo = async () => {
      if (!token) {
        console.log("⚠️ No token available, skipping room info fetch");
        return;
      }

      console.log("🔄 Fetching room info...");
      try {
        const roomInfo = await HomeAPI.getRoomInfo(token);
        const res_data = roomInfo.data as any;
        console.log("📦 Room info response:", res_data);

        if (res_data) {
          setUserCount(res_data.userCount);
          setSongCount(res_data.songCount);
          setCurrentSong(res_data.currentSong);
          setCurrentSongVideoId(res_data.currentSongVideoId);
          setCurrentSongStartedAt(res_data.currentSongStartedAt);
          // 현재 재생 중인 곡 정보도 설정
          if (res_data.currentSong) {
            setCurrentSong(res_data.currentSong);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching room info:", error);
      }
    };
    fetchRoomInfo();
  }, [roomId, token]);

  // STOMP 연결 상태 모니터링
  useEffect(() => {
    const checkStompConnection = () => {
      if (token && roomId) {
        setIsStompReady(true);
      }
    };
    checkStompConnection();
  }, [token, roomId]);

  const { userColor } = useUserColor();
  const playerRef = useRef<PlayerType | null>(null);
  const [ready, setReady] = useState(false);

  const [emotionColor, setEmotionColor] = useState<string>("#000000");
  const [emotionName, setEmotionName] = useState<string>("sad");

  // 바늘 각도 토글 state
  const [stickToggled, setStickToggled] = useState(false);

  // 각도 계산 (기본 18도, 토글 시 -72도)
  const stickAngle = stickToggled ? -72 : 6;

  const handleStartClick = () => {
    playerRef.current?.playVideo();
    setStickToggled(!stickToggled);
    console.log("눌렀음");
  };

  useEffect(() => {
    if (labelName in emotionColorMapping) {
      setEmotionColor(
        emotionColorMapping[labelName as keyof typeof emotionColorMapping]
      );
    }
    if (labelName in emotionMapping) {
      setEmotionName(emotionMapping[labelName as keyof typeof emotionMapping]);
    }
  }, [labelName]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center bg-darak-bg">
      {/* 상단: 제목, 인원수, 안내문구 */}
      <div className="flex flex-col justify-start items-start w-[375px] h-[163px] gap-2.5 px-10 py-[29px] rounded-bl-[20px] rounded-br-[20px] bg-white/60">
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[295px] gap-2.5">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5">
            <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[60px] w-[145px] gap-2.5 px-5 py-3 rounded-[10px] bg-white/60">
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[95px] relative space-x-[-5px]">
                {/* Emotion Circle SVG would go here */}
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[87px] relative gap-2.5 p-2.5">
                  <img src={`/img/${emotionName}.svg`} alt="감정 이미지" />
                  <p className="flex-grow-0 flex-shrink-0 text-[25px] font-bold text-center text-[#3b3029]">
                    {labelName}
                  </p>
                </div>
              </div>
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-[25px] font-bold text-center text-[#373737]">
              다락
            </p>
          </div>
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
            {/* User Icon SVG would go here */}
            <p className="flex-grow-0 flex-shrink-0 w-[266px] text-lg text-left text-[#373737]/80">
              {userCount}명이 이 다락에 함께하고 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* 중앙: 좌우 배치 */}
      <div className="flex w-full h-full flex-row items-center mt-8 mb-8 relative">
        {/* 곡 정보 카드 */}
        <div
          className="z-10 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-2"
          style={{
            width: 599,
            minHeight: 599,
            marginRight: -200, // LP와 살짝 겹치게
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            filter: "drop-shadow(0px 10px 4px rgba(0,0,0,0.25))",
          }}
        >
          <CurrentMusic userColor={userColor} currentSong={currentSong} />
        </div>

        {/* LP */}
        <div
          style={{ width: 599, height: 599, zIndex: 10, marginLeft: 0 }}
          className="relative"
        >
          <LP_Icon
            centerColor={emotionColor}
            className="w-[599px] h-[599px] object-cover animate-lp-spin"
          />
          {/* LP 헤드 */}
          <button
            onClick={handleStartClick}
            className="absolute cursor-pointer border-none bg-transparent p-0"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(50%, -80%) rotate(${stickAngle}deg)`,
              transformOrigin: "20% 15%",
              transition: "transform 1.2s cubic-bezier(.4,2,.6,1)",
              zIndex: 100,
            }}
          >
            <img src="/img/LPhead.svg" alt="LPhead" className="w-full h-full" />
          </button>
          <YouTubePlayer
            videoId={currentSongVideoId}
            onPlayerReady={(player) => {
              playerRef.current = player;
              setReady(true);
            }}
          />
        </div>
        {/* 오른쪽: 플레이리스트/이모지 */}
        <div
          className="absolute"
          style={{ top: 0, right: 0, height: "100%", zIndex: 20 }}
        >
          <PlaylistSection
            ref={playlistSectionRef}
            sendReaction={sendReaction}
          />
        </div>
      </div>
    </div>
  );
}
