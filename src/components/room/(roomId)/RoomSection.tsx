"use client";
import React, { useEffect, useState } from "react";
import PlaylistSection from "./PlaylistSection";
import CurrentMusic from "./CurrentMusic";
import { useUserColor } from "../../../../provider/UserContextProvider";

export default function RoomSection({ roomId }: { roomId: string }) {
  useEffect(() => {
    console.log(roomId);
    // fetch('/api/room/${roomId}`) 로 데이터 페칭해오기.
    // 로딩일때는 다른 ui 보여주도록 하면 됨.
  }, [roomId]);

  const { userColor } = useUserColor();
  return (
    <div className="relative w-full h-screen flex flex-col items-center bg-white">
      {/* 상단: 제목, 인원수, 안내문구 */}
      <div className="w-full flex flex-col items-center mt-6">
        <div className="text-lg font-bold">방 제목 (예: 그대에게)</div>
        <div className="text-sm text-gray-500 mt-1">
          15명의 사람들이 함께 듣고 있습니다.
        </div>
      </div>

      {/* 중앙: 좌우 배치 */}
      <div className="flex flex-row items-center justify-between w-full flex-1 mt-8 mb-8 gap-12">
        {/* 왼쪽: 현재 곡 정보 */}
        <CurrentMusic userColor={userColor} />

        {/* 중앙: LP Bar */}
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-64 rounded-full border-4 border-gray-300 flex items-center justify-center">
            {/* LP 중앙 */}
            <div className="relative">
              <img src="/img/LP.svg" alt="LP" className="w-64 h-64" />
              {/* LP 바늘 (로딩/재생 상태에 따라 위치 변경 예정) */}
              <div
                className="absolute left-1/2 top-1/2 w-1 h-32 bg-purple-400 rounded-full origin-bottom"
                style={{ transform: "translateX(-50%) rotate(30deg)" }}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 플레이리스트/이모지 */}
        <PlaylistSection />
      </div>
    </div>
  );
}
