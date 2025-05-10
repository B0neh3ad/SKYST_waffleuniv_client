// src/components/result/EmotionConfirm.tsx
"use client";

import { useEffect, useState } from "react";
import { useUserColor } from "../../../provider/UserContextProvider";
import { motion } from "framer-motion";

export default function EmotionConfirm({
  state,
  onBack,
}: {
  state: string;
  onBack: () => void;
}) {
  const { userColor, setUserColor } = useUserColor();

  const circles = Array.from({ length: 7 }).map((_, idx) => {
    const size = Math.floor(Math.random() * 80) + 40; // 40~120px
    const top = Math.floor(Math.random() * 60) + 10; // vh 기준
    const left = Math.floor(Math.random() * 80) + 10; // vw 기준

    return (
      <motion.div
        key={idx}
        className="absolute rounded-full border-4 border-violet-400 opacity-40"
        style={{
          width: size,
          height: size,
          top: `${top}vh`,
          left: `${left}vw`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  });
  return (
    <div className="relative w-full h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* 메시지 */}
      <div className="text-center z-10">
        <div className="text-sm text-gray-400 mb-1">#{state}</div>
        <div className="text-2xl font-semibold text-gray-800">
          님과 비슷한 감정 그룹을 찾고 있어요...
        </div>
      </div>

      {/* 원 애니메이션들 */}
      {circles}
    </div>
  );
}
