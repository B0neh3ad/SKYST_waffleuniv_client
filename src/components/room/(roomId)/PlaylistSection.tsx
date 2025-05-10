import React from "react";

export default function PlaylistSection() {
  return (
    <div className="flex flex-col items-center mt-4">
      {/* 이모지/추가 버튼 등 */}
      <div className="flex flex-row gap-2 mb-2">
        <button className="rounded-full bg-gray-200 w-10 h-10">😊</button>
        <button className="rounded-full bg-gray-200 w-10 h-10">❤️</button>
        <button className="rounded-full bg-gray-200 w-10 h-10">➕</button>
      </div>
      {/* 플레이리스트 큐 (프레임만) */}
      <div className="w-80 bg-gray-100 rounded-lg p-4 shadow">
        <div className="text-sm text-gray-500">
          플레이리스트 큐 (여러 곡이 들어갈 예정)
        </div>
      </div>
    </div>
  );
}
