// src/components/result/EmotionConfirm.tsx
"use client";

import { useEffect, useState } from "react";
import { useUserColor } from "../../../provider/UserContextProvider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EmotionConfirm({
  state,
  onBack,
}: {
  state: string;
  onBack: () => void;
}) {
  // context가 제대로 반영되어있는지 확인 필요
  // context null 일때 안보이도록 해야함.
  const { userColor } = useUserColor();

  return (
    <div className="relative w-full h-screen flex flex-col items-center overflow-hidden">
      {/* 메시지 */}
      <div className="flex items-center justify-center mt-[130px]">
        <img
          src="/img/darak.svg"
          className="w-[86px] h-[57px] relative top-[-80px] left-[-10px]"
        ></img>
        <div className="flex flex-col items-left justify-center max-w-4xl mx-auto rounded-xl rounded-tl-none shadow bg-[#F2D6C2] w-[665.438px] h-[143px] px-[32px]">
          <img
            src="/img/bubbletip.svg"
            className="relative top-[-35px] -left-[42px] z-10 w-[15px] h-[12px]"
          ></img>
          {/* 프로필 + 닉네임 */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg px-[30px] py-[12px] text-[25px] text-[#3B3029] bg-[#FFFFFF99] rounded flex items-center gap-2">
              <div
                className="w-[33px] h-[33px] rounded-full inline-block filter drop-shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: userColor || "#FFE4E4" }}
              ></div>
              <span>#{(userColor || "").replace("#", "")}</span>
            </span>
            <span className="ml-2 text-base text-[22px] text-[#6B4F3B]">
              님과 비슷한 감정의 다락을 찾고 있어요.
            </span>
          </div>
        </div>
      </div>
      <Image
        src="/img/emotions.svg"
        alt="emotions"
        width={600}
        height={100}
        style={{
          marginTop: "71px",
        }}
      />
    </div>
  );
}
