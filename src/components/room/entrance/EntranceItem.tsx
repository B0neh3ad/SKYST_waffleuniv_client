import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface EntranceItemProps {
  handleNext: () => void;
}

export default function EntranceItem({ handleNext }: EntranceItemProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
      <div className="self-stretch text-center text-[28px] font-bold text-[#3B3029] mt-[97.4px] mb-[40px]">
        다락이가 찾아낸 당신의 다락이에요!
      </div>

      <div className="relative left-[-200px]">
        <div className="flex shrink-0 flex-col w-[599px] h-[599px] bg-[#37678F] rounded-[20px] p-[50px] gap-[20px]">
          <span className="flex items-center h-[60px] gap-[20px]">
            <div className="h-[60px] flex items-center justify-center bg-[#FFFFFF99] rounded-[10px] px-[20px] gap-[10px]">
              <img src="/img/sad.svg" alt="sad" />
              <span className="text-center text-[25px] font-bold text-[#3B3029]">슬픔</span>
            </div>
            <span className="text-center text-[25px] font-bold text-white">다락</span>
          </span>
          <div className="flex flex-col gap-[10px]">
            <span className="flex gap-[10px]">
              <img src="/img/person.svg" alt="person" width={19} height={20}/>
              <span className="text-[#FFFFFFCC] text-[18px]">18명이 이 다락에 함께하고 있어요.</span>
            </span>
            <span className="flex gap-[10px]">
              <img src="/img/cd.svg" alt="cd" width={19} height={19}/>
              <span className="text-[#FFFFFFCC] text-[18px]">지금 재생 중인 음악 - Falling</span>
            </span>
          </div>
        </div>
        <img
          className="animate-lp-spin"
          src="/img/LP.svg"
          width={596}
          height={596}
          style={{
            position: "absolute",
            top: 0,
            left: "336px",
          }}
        />
      </div>
      <button
        className="w-[134px] h-[60px] rounded-[10px] bg-[#B46A5599] text-black text-[20px] font-bold text-center mt-[50px]"
        onClick={handleNext}
        style={{
          cursor: "pointer",
        }}
      >
        확인
      </button>
    </div>
  );
}

function DraggableArcs({ handleNext }: { handleNext: () => void }) {
  return (
    <div
      className="relative w-72 h-36 flex flex-col items-center transform rotate-180 cursor-pointer select-none"
      onClick={handleNext}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 border-4 border-white rounded-b-full"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-60 h-28 border-2 border-white rounded-b-full"></div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-20 border border-white rounded-b-full"></div>
    </div>
  );
}