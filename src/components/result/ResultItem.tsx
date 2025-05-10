"use client";

import { emotionMapping } from "@/constants/constants";
import { useUserColor } from "../../../provider/UserContextProvider";

export default function ResultItem({
  state,
  onReject,
  onConfirm,
}: {
  state: string;
  onReject: () => void;
  onConfirm: () => void;
}) {
  const { userColor } = useUserColor(); // context에서 가져옴.
  const color =
    userColor && userColor.length === 7 ? userColor : "#e5e7eb"; // hex 아니면 gray
  return (
    <div className="flex-wrap">
      <div>
        <img
          src="/img/darak.svg"
          className="w-[86px] h-[57px] relative top-[15px] -left-[110px]"
        ></img>
        <div className="flex flex-col items-left justify-left max-w-4xl h-[80vh] mx-auto rounded-xl rounded-tl-none shadow bg-[#F2D6C2] w-[736px] h-[228px] px-[40px] py-[20px]">
          <img
            src="/img/bubbletip.svg"
            className="relative -top-[20px] -left-[49px] z-10 w-[15px] h-[12px]"
          ></img>
          {/* 프로필 + 닉네임 */}
          <div className="text-xl mb-2 text-[22px] text-[#6B4F3B]">
            힘든 일이 많으셨던 것 같아요.
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-lg px-[30px] py-[12px] text-[25px] text-[#3B3029] bg-[#FFFFFF99] rounded flex items-center gap-2">
              <div
                className="w-[33px] h-[33px] rounded-full inline-block filter drop-shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: userColor || "#FFE4E4" }}
              ></div>
              <span>#{(userColor || "").replace("#", "")}</span>
            </span>
            <span className="ml-2 text-base text-[22px] text-[#6B4F3B]">
              님의 오늘 기분은
            </span>
            <span className="ml-2 px-2 py-1 rounded text-[25px] text-[#3B3029] font-bold bg-[#FFFFFF99] px-[20px] py-[12px]">
              <img src={"/img/"+emotionMapping[state as keyof typeof emotionMapping]+".svg"} className="inline-block mr-4"></img>
              {state}
            </span>
            <span className="ml-2 text-[22px] text-[#6B4F3B]">
              이에요.
            </span>
          </div>
          <div className="text-xl mb-8 text-[22px] text-[#6B4F3B] ">
            제가 잘 분석했을까요?
          </div>
        </div>
      </div>
      <div className="flex gap-6 mt-8 items-center justify-center">
        <button
          className="rounded-xl bg-[#F2D6C2] w-[134px] h-[60px] font-bold text-lg"
          onClick={onReject}
        >
          아니야
        </button>
        <button
          className="rounded-xl bg-[#B46A5599] w-[134px] h-[60px] font-bold text-lg"
          onClick={onConfirm}
        >
          맞아
        </button>
      </div>
    </div>
  );
}
