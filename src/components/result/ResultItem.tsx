"use client";

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
  const color = userColor && userColor.length === 7 ? userColor : "#e5e7eb"; // hex 아니면 gray
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl h-[80vh] mx-auto bg-white rounded-xl shadow">
      {/* 프로필 + 닉네임 */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full border"
          style={{ backgroundColor: userColor || "#e5e7eb" }}
        />
        <span className="font-mono text-lg">
          #{(userColor || "").replace("#", "")}
        </span>
        <span className="ml-2 text-base">님의 오늘 감정은</span>
        <span className="ml-2 px-2 py-1 rounded bg-violet-100 text-violet-700 font-bold">
          {state}
        </span>
        <span className="ml-2">이에요</span>
      </div>
      <div className="text-xl mb-8">제가 잘 분석했을까요?</div>

      <div className="flex gap-6 mt-8">
        <button
          className="px-8 py-3 rounded bg-gray-200 text-gray-700 font-bold text-lg"
          onClick={onReject}
        >
          아니야
        </button>
        <button
          className="px-8 py-3 rounded bg-blue-500 text-white font-bold text-lg"
          onClick={onConfirm}
        >
          맞아
        </button>
      </div>
    </div>
  );
}
