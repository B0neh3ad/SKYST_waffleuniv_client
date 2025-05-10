"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogSubmitFallback from "./LogSubmitFallback";
import { useUserColor } from "../../../provider/UserContextProvider";

interface LogConfirmProps {
    diary: String;
    handleBack: () => void;
};

export default function LogConfirm({ diary, handleBack }: LogConfirmProps) {
    const router = useRouter();
    const { userColor, setUserColor } = useUserColor();
    const [submitted, setSubmitted] = useState(false);
    
    const handleConfirm = () => {
        // TODO: 일기를 전송하고 response가 올 때까지 LogSubmitFallback 표시
        // TODO: response가 오면 LogSubmitSection으로 이동
        console.log("submitted");
        setSubmitted(true);
        setTimeout(() => router.push("/log/submit"), 2000);
    }

    if (submitted) {
      return (
        <LogSubmitFallback />
      );
    }

    return (
      <div className="p-6 max-w-3xl mx-auto flex flex-row gap-8">
        {/* Left: Diary summary */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="mb-4">
            <span className="text-lg font-semibold">오늘의 감정 일기</span>
          </div>
          <div className="flex items-center mb-4">
            <div
              className="w-8 h-8 rounded-full mr-2 border-2 border-gray-500 flex items-center justify-center"
              style={{ backgroundColor: userColor }}
            />
            <span className="font-semibold mr-1">{userColor}</span>
          </div>
          <div className="whitespace-pre-line text-gray-800 min-h-[80px]">
            {diary}
          </div>
        </div>
        {/* Right: Confirmation and options */}
        <div className="flex-1 flex flex-col justify-between bg-white rounded-xl shadow p-6">
          <div>
            <div className="text-lg font-semibold mb-2">일기를 확정할까요?</div>
            <div className="mb-4 text-gray-700 text-sm">확정하면 AI가 나의 감정을 분석해요</div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleBack}
            >
              이전
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleConfirm} // Implement confirm logic as needed
            >
              확정
            </button>
          </div>
        </div>
      </div>
    );
}