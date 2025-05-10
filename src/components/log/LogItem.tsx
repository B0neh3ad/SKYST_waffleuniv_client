import { MAX_DIARY_LENGTH } from "@/constants/constants";
import Link from "next/link";
import DiaryHeader from "./DiaryHeader";

interface LogItemProps {
  userColor: string;
  diary: string;
  handleClear: () => void;
  handleDiaryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleNext: () => void;
}

export default function LogItem({
  userColor,
  diary,
  handleClear,
  handleDiaryChange,
  handleNext,
}: LogItemProps) {
  // Input step
  return (
    <div className="p-6 mx-[156px] mt-[110.4px] bg-darak-bg">
      {/* User info and prompt */}
        <div className="flex flex-col items-start gap-[20px] mb-[30px]">
          <span className="flex text-[#3B3029] items-center text-center text-[28px] font-bold">
            <div className="flex w-[214px] h-[60px] px-[30px] py-[12px] items-center gap-[10px] bg-[#FFFFFF99] rounded-[10px] mr-[22px]">
              <div
                className="w-[33px] h-[33px] rounded-full drop-shadow-[2px_2px_5px_rgba(0,0,0,0.10)]"
                style={{ backgroundColor: userColor }}
              />
              <span className="text-[#3B3029] text-center text-[25px] font-bold leading-[16px]">{userColor}</span>
            </div>
            님, 오늘의 감정이 드러나도록 일기를 작성해주세요.
          </span>
          <span className="text-[#6B4F3B] text-center text-[18px] font-bold leading-[25px]">
            작성해 주신 일기 내용은 AI 다락이가 읽고, 기분을 분석해드려요!
          </span>
        </div>

      {/* Diary card */}
      <div
        className="flex h-[550px] px-[100px] py-[42px] flex-col items-center gap-10px self-stretch rounded-[15px] bg-[#FAF5F1]"
        style={{boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.10)'}}
      >
        <DiaryHeader />
        <textarea
          className="w-full h-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
          placeholder="오늘의 감정을 자유롭게 적어보세요..."
          value={diary}
          onChange={handleDiaryChange}
          maxLength={MAX_DIARY_LENGTH}
        />
        <div className="mb-[50px] flex self-end justify-end items-center text-sm text-gray-400">
          <span className="text-[#6B4F3B] text-center text-[20px] font-bold">{diary.length}</span>
          <span className="text-[#00000080] text-center text-[20px] font-bold">/{MAX_DIARY_LENGTH}</span>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-center mt-[50px]">
        <button
          className="w-[179px] h-[60px] text-black text-center text-[20px] font-bold leading-[16px] rounded-[10px] bg-[#B46A5599]"
          onClick={handleNext}
          style={{
            cursor: 'pointer',
          }}
        >
          작성 완료하기
        </button>
      </div>
    </div>
  );
}