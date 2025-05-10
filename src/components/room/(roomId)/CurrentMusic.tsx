import React from "react";

export default function CurrentMusic({ userColor }: { userColor: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="text-md font-semibold">선하현</div>
      <div className="text-2xl font-bold mt-1">그대에게</div>
      <div className="text-sm text-gray-400 mt-2">
        위로가 되려할 때, 썼었던 음악입니다.
      </div>
      <button className="mt-6 px-4 py-2 bg-gray-100 rounded-lg text-purple-600 font-semibold shadow">
        #{userColor}의 일기 보기
      </button>
    </div>
  );
}
