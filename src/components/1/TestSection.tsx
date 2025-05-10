"use client";

import React, { useState } from "react";
import EmojiFly from "./EmojiFly";
import { v4 as uuidv4 } from "uuid";

export default function TestSection() {
  const [emojis, setEmojis] = useState<
    { id: string; emoji: string; x: number }[]
  >([]);

  const addEmoji = (emoji: string, x: number) => {
    const id = uuidv4();
    setEmojis((prev) => [...prev, { id, emoji, x }]);
  };

  const removeEmoji = (id: string) => {
    setEmojis((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 이모지 버튼 */}
      <div className="fixed bottom-4 left-4 flex gap-2 z-10">
        {["🎉", "😂", "❤️", "👍", "👏"].map((emoji) => (
          <button
            key={emoji}
            onClick={(e) => {
              const rect = (
                e.currentTarget as HTMLButtonElement
              ).getBoundingClientRect();
              const x = rect.left + rect.width / 2; // 버튼의 가운데 x좌표
              addEmoji(emoji, x);
            }}
            className="p-2 text-2xl bg-white rounded shadow"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* 이모지 날아오르는 애니메이션 */}
      {emojis.map((e) => (
        <EmojiFly
          key={e.id}
          emoji={e.emoji}
          x={e.x}
          onDone={() => removeEmoji(e.id)}
        />
      ))}
    </div>
  );
}
