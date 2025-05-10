"use client";

import Link from "next/link";
import { useState } from "react";
import LogConfirmSection from "./LogConfirm";
import { useUserColor } from "../../../provider/UserContextProvider";

export default function LogSection() {
  // State for emotion, diary text, and character count
  const { userColor, setUserColor } = useUserColor();
  const [diary, setDiary] = useState("");
  const [step, setStep] = useState<"input" | "confirm">("input");
  const maxChars = 500;

  // Handler for clearing the diary
  const handleClear = () => {
    setDiary("");
  };

  // Handler for diary text change
  const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setDiary(e.target.value);
    }
  };

  // Handler for next/confirm
  const handleNext = () => setStep("confirm");
  const handleBack = () => setStep("input");

  if (step === "confirm") {
    return (
      <LogConfirmSection diary={diary} handleBack={handleBack} />
    );
  }

  // Input step
  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* User info and prompt */}
      <div className="flex items-center mb-2">
        <div
          className="w-8 h-8 rounded-full mr-2 border-2 border-gray-500 flex items-center justify-center"
          style={{ backgroundColor: userColor }}
        />
        <span className="text-gray-700">
          <span className="font-semibold mr-1">{userColor}</span>
          님, 오늘의 감정이 드러나도록 일기를 작성해주세요.
        </span>
      </div>
      {/* Diary card */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <div className="flex items-center mb-4">
          <span className="text-lg mr-2">오늘의 감정 일기</span>
          <div
            className="w-8 h-8 rounded-full mr-2 border-2 border-gray-500 flex items-center justify-center"
            style={{ backgroundColor: userColor }}
          />
          <span className="font-semibold mr-1">{userColor}</span>
          <button
            onClick={handleClear}
            className="ml-auto text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100"
          >
            clear
          </button>
        </div>
        <textarea
          className="w-full h-32 border border-gray-200 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
          placeholder="오늘의 감정을 자유롭게 적어보세요..."
          value={diary}
          onChange={handleDiaryChange}
          maxLength={maxChars}
        />
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span></span>
          <span>{diary.length}/{maxChars}</span>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between mt-2">
        <Link href="/home">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">이전</button>
        </Link>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
