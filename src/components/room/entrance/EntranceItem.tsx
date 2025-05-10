import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface EntranceItemProps {
  handleNext: () => void;
}

export default function EntranceItem({ handleNext }: EntranceItemProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-gray-50 overflow-hidden">
      {/* Decorative Arcs and Hand Icon */}
      <div className="absolute top-16 flex flex-col items-center w-full z-10">
        {/* Upper Arrow Icon (placeholder) */}
        <div className="mb-2 text-4xl">⬆️⬆️</div>
        {/* Arcs (draggable with Framer Motion) */}
        <DraggableArcs handleNext={handleNext} />
      </div>

      {/* Main Card */}
      <div className="relative z-20 mt-44 bg-white rounded-3xl shadow-lg w-[420px] max-w-full p-6 flex flex-col items-center">
        {/* Top Row: Buttons and LP Bar */}
        <div className="flex items-center w-full mb-4">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg mr-2 font-semibold">Btn1</button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg mr-4 font-semibold">Btn2</button>
          <div className="flex-1 h-6 bg-gray-200 rounded-full flex items-center px-3">
            <span className="text-gray-600 text-sm font-bold">LP Bar</span>
          </div>
        </div>
        {/* Info List */}
        <ul className="w-full text-gray-700 text-base space-y-2">
          <li className="flex items-center"><span className="mr-2">①</span>1명이 이 방에 함께하고 있습니다</li>
          <li className="flex items-center"><span className="mr-2">②</span>지금 재생중인 음악 <span className="ml-1">🎵</span> <span className="ml-1 text-gray-400">song~</span></li>
        </ul>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
        위로 <span className="font-semibold">스와이프해서 입장하기</span>
      </div>
    </div>
  );
}

function DraggableArcs({ handleNext }: { handleNext: () => void }) {
  return (
    <div
      className="relative w-72 h-36 flex flex-col items-center transform rotate-180 cursor-pointer select-none"
      onClick={handleNext}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 border-4 border-gray-300 rounded-b-full"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-60 h-28 border-2 border-gray-200 rounded-b-full"></div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-20 border border-gray-100 rounded-b-full"></div>
    </div>
  );
}