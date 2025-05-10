"use client";
import React, { useEffect, useState } from "react";
import PlaylistSection from "./PlaylistSection";
import CurrentMusic from "./CurrentMusic";
import { useUserColor } from "../../../../provider/UserContextProvider";
import Image from "next/image";

export default function RoomSection({ roomId }: { roomId: string }) {
  useEffect(() => {
    console.log(roomId);
    // fetch('/api/room/${roomId}`) 로 데이터 페칭해오기.
    // 로딩일때는 다른 ui 보여주도록 하면 됨.
  }, [roomId]);

  const { userColor } = useUserColor();

  // 바늘 각도 토글 state
  const [stickToggled, setStickToggled] = useState(false);

  // 각도 계산 (기본 18도, 토글 시 -72도)
  const stickAngle = stickToggled ? -72 : 6;

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
                  <img src="/img/sad.svg" alt="sad" />
                  <p className="flex-grow-0 flex-shrink-0 w-[66px] text-[25px] font-bold text-center text-[#3b3029]">
                    슬픔
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
              18명이 이 다락에 함께하고 있어요.
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
          <CurrentMusic userColor={userColor} />
        </div>

        {/* LP */}
        <div
          style={{ width: 599, height: 599, zIndex: 10, marginLeft: 0 }}
          className="relative"
        >
          <img
            src="/img/LP.svg"
            alt="LP"
            width={599}
            height={599}
            className="w-[599px] h-[599px] object-cover"
            style={{
              width: 599,
              height: 599,
              display: "block",
              objectFit: "cover",
              left: "50%",
            }}
          />
          {/* LP 헤드 */}
          <img
            src="/img/LPhead.svg"
            alt="LPhead"
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(50%, -80%) rotate(${stickAngle}deg)`,
              transformOrigin: "20% 15%",
              pointerEvents: "none",
              transition: "transform 1.2s cubic-bezier(.4,2,.6,1)",
            }}
          />
        </div>
        {/* 오른쪽: 플레이리스트/이모지 */}
        <div
          className="absolute"
          style={{ top: 0, right: 0, height: "100%", zIndex: 20 }}
        >
          <PlaylistSection />
        </div>
      </div>
    </div>
  );
}
