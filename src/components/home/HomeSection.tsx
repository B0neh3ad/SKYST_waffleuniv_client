"use client";

import { useState } from "react";
import ProfileConfirmDialog from "./ProfileConfirmDialog";
import { useUserColor } from "../../../provider/UserContextProvider";

function isValidHexColor(str: string) {
  return /^#[0-9a-fA-F]{6}$/.test(str);
}

export default function HomeSection() {
  // 좌측
  const [serviceDesc, setServiceDesc] = useState("");
  const [checked, setChecked] = useState(false);
  // 우측
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userColor, setUserColor } = useUserColor();
  const isValid = isValidHexColor(userColor);

  return (
    <div className="flex w-full h-[80vh] max-w-4xl mx-auto bg-darak-bg rounded-xl shadow overflow-hidden">
      {/* 좌측 */}
      <div className="flex-1 flex flex-col items-center bg-darakBg justify-center gap-6 border-r p-8">
        {/* 로고 넣을 부분. */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-darakPoint3 mb-2 text-center">
          다락방
        </div>
        <div className="text-xl tfont-bold mb-2">공감서비스,{"다락방"}</div>

        <div className="w-full h-24 border bg-darakBg rounded p-2 resize-none">
          다락방은 자신의 감정기록을 기반으로, 비슷한 감정을 공유하는 사람들과
          음악을 통해서 연결되는 감정을 제공하는 서비스입니다.
        </div>
      </div>
      {/* 우측 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 relative">
        <div className="text-lg mb-2">익명 프로필을 만들어주세요!</div>
        <div
          className="w-20 h-20 rounded-full mb-2 border"
          style={{
            backgroundColor: isValid ? userColor : "#e5e7eb", // gray-200 fallback
          }}
        />
        <div className="flex items-center mb-4">
          <span className="border rounded px-2 py-1 text-xl font-medium bg-gray-50 text-gray-600 mr-2 shadow-sm">
            #
          </span>
          <input
            className="w-32 border rounded p-2 text-center"
            placeholder="aabbcc"
            value={userColor.replace("#", "")}
            maxLength={6}
            onChange={(e) => {
              const val = e.target.value;
              // 6글자 이하, 16진수만 허용
              if (val.length <= 6 && /^[0-9a-fA-F]*$/.test(val)) {
                setUserColor("#" + val);
              }
            }}
          />
        </div>
        <button
          className={`absolute right-8 bottom-8 w-12 h-12 rounded-full text-white text-2xl flex items-center justify-center shadow-lg ${
            isValid ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={() => {
            if (isValid) setDialogOpen(true);
          }}
          disabled={!isValid}
        >
          →
        </button>
      </div>
      {/* 다이얼로그 */}
      <ProfileConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false); /* TODO: handle confirm */
        }}
        userColor={userColor}
      />
    </div>
  );
}
