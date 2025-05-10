"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import EmojiFly from "./EmojiFly";
import { v4 as uuidv4 } from "uuid";
import EmotionCircle from "../../../../public/img/LP_smallIcon";
import { useAuth } from "../../../../provider/UserContextProvider";

interface CurrentSong {
  id: number;
  title: string;
  artist: string;
  videoId: string;
  comment: string;
  fullStory: string;
}

interface PlaylistSectionProps {
  sendReaction?: (reaction: { name: string }) => void;
}

const PlaylistSection = forwardRef<any, PlaylistSectionProps>(
  ({ sendReaction }, ref) => {
    const [emojis, setEmojis] = useState<
      { id: string; emoji: string; x: number; y: number }[]
    >([]);
    const { songCount } = useAuth();
    const addEmoji = (emoji: string, x: number, y: number) => {
      console.log("addEmoji called with", emoji, x, y);

      const id = uuidv4();
      setEmojis((prev) => [...prev, { id, emoji, x, y }]);
    };

    const removeEmoji = (id: string) => {
      setEmojis((prev) => prev.filter((e) => e.id !== id));
    };

    // 외부에서 이 함수를 호출할 수 있게 ref로 노출
    useImperativeHandle(ref, () => ({
      addEmojiFromReaction: (emoji: string) => {
        // 화면 중앙에서 애니메이션 시작 (예시)
        console.log("addEmojiFromReaction called with", emoji);

        const x = window.innerWidth / 2;
        const y = window.innerHeight - 100;
        addEmoji(emoji, x, y);
      },
    }));

    return (
      <div className="flex flex-col items-center mt-4 relative w-full h-full">
        <div className="flex justify-end">
          <EmotionCircle centerColor="#EAC04D" className="relative -mr-16" />
          <EmotionCircle centerColor="#4682B4" className="relative -mr-16" />
          <EmotionCircle centerColor="#D32F2F" className="relative -mr-16" />
          <EmotionCircle centerColor="#D32F2F" className="relative" />
        </div>
        {/* 상단: 재생 대기 중인 음악 */}
        <div className="flex justify-end items-center relative gap-2.5 mb-4 px-4">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M9.5 6.33333C9.9217 6.3238 10.3411 6.39861 10.7335 6.55337C11.1258 6.70814 11.4834 6.93974 11.785 7.23457C12.0867 7.52941 12.3264 7.88154 12.4901 8.2703C12.6538 8.65905 12.7382 9.07659 12.7383 9.4984C12.7384 9.92021 12.6542 10.3378 12.4907 10.7266C12.3272 11.1155 12.0877 11.4677 11.7862 11.7627C11.4846 12.0577 11.1272 12.2895 10.7349 12.4444C10.3426 12.5994 9.92329 12.6744 9.50158 12.6651C8.6742 12.6468 7.88685 12.3053 7.30808 11.7138C6.72932 11.1222 6.40513 10.3276 6.40492 9.49998C6.40472 8.67239 6.72851 7.8776 7.30697 7.28576C7.88544 6.69391 8.67262 6.35204 9.5 6.33333ZM9.5 11.0833C9.08007 11.0833 8.67735 10.9165 8.38041 10.6196C8.08348 10.3227 7.91667 9.91993 7.91667 9.5C7.91667 9.08007 8.08348 8.67735 8.38041 8.38041C8.67735 8.08348 9.08007 7.91667 9.5 7.91667C9.91993 7.91667 10.3227 8.08348 10.6196 8.38041C10.9165 8.67735 11.0833 9.08007 11.0833 9.5C11.0833 9.91993 10.9165 10.3227 10.6196 10.6196C10.3227 10.9165 9.91993 11.0833 9.5 11.0833ZM9.5 0C8.25244 -1.85901e-08 7.0171 0.245725 5.86451 0.723144C4.71191 1.20056 3.66464 1.90033 2.78249 2.78249C1.90033 3.66464 1.20056 4.71191 0.723145 5.86451C0.245725 7.0171 0 8.25244 0 9.5C0 10.7476 0.245725 11.9829 0.723145 13.1355C1.20056 14.2881 1.90033 15.3354 2.78249 16.2175C3.66464 17.0997 4.71191 17.7994 5.86451 18.2769C7.0171 18.7543 8.25244 19 9.5 19C12.0196 19 14.4359 17.9991 16.2175 16.2175C17.9991 14.4359 19 12.0196 19 9.5C19 6.98044 17.9991 4.56408 16.2175 2.78249C14.4359 1.00089 12.0196 3.75443e-08 9.5 0Z"
              fill="#373737"
              fillOpacity="0.5"
            ></path>
          </svg>
          <p className="flex-grow-0 flex-shrink-0 w-[200px] text-lg text-right text-[#373737]/80">
            재생 대기 중인 음악 {songCount}곡
          </p>
        </div>
        {/* 이모지 날아오르는 애니메이션 */}
        {emojis.map((e) => (
          <EmojiFly
            key={e.id}
            emoji={e.emoji}
            x={e.x}
            y={e.y}
            onDone={() => removeEmoji(e.id)}
          />
        ))}
        {/* 이모지/추가 버튼 등 - 하단 고정 */}
        <div className="absolute bottom-8 left-0 w-full flex flex-row gap-4 justify-center z-10">
          {[
            <img key="heart" src="/img/heartLine.svg" width="24" height="24" />,
            <img
              key="thumbs"
              src="/img/thumbLine.svg"
              width="24"
              height="24"
            />,
          ].map((icon, index) => (
            <button
              key={index}
              className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center text-gray-600 hover:text-gray-800 shadow"
              onClick={(e) => {
                const rect = (
                  e.currentTarget as HTMLButtonElement
                ).getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const emoji = index === 0 ? "❤️" : "👍";
                addEmoji(emoji, x, y);
                if (sendReaction) {
                  sendReaction({ name: emoji });
                }
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export default PlaylistSection;
