"use client";

import { useEffect, useState } from "react";
import { useUserColor } from "../../../../provider/UserContextProvider";
import LP_Icon from "../../../../public/img/LP_Icon";
import { emotionColorMapping, emotionMapping } from "@/constants/constants";

interface EntranceFormProps {
  handleSubmit: () => void;
}

export default function EntranceForm({ handleSubmit }: EntranceFormProps) {
  const { userColor, labelName } = useUserColor();
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const { setSubmittedSong } = useUserColor();

  const [ emotionColor, setEmotionColor ] = useState<string>("#000000");
  
  useEffect(() => {
    if (labelName in emotionColorMapping) {
      setEmotionColor(emotionColorMapping[labelName as keyof typeof emotionColorMapping]);
    }
  }, [labelName]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
      <div className="self-stretch text-center text-[28px] font-bold text-[#3B3029] mt-[97.4px] mb-[40px]">
        다락에서 재생될 신청곡을 작성해주세요!
      </div>

      <div className="relative left-[-200px]">
        <form
          id="entrance-form"
          className={`flex shrink-0 flex-col w-[599px] h-[599px] rounded-[20px] p-[50px] gap-[20px]`}
          onSubmit={(e) => {
            e.preventDefault();
            if (
              name === "" ||
              artist === "" ||
              url === "" ||
              description === ""
            ) {
              alert("모든 필드를 입력해 주세요.");
              return;
            }
            handleSubmit();
          }}
          style={{
            backgroundColor: emotionColor,
          }}
        >
          <div className="shrink-0 h-[60px] w-[214px] mb-[30px] flex items-center justify-center bg-[#FFFFFF99] rounded-[10px] px-[20px] gap-[10px]">
            <div
              className="w-[33px] h-[33px] rounded-full drop-shadow-[2px_2px_5px_rgba(0,0,0,0.10)]"
              style={{ backgroundColor: userColor }}
            />
            <span className="text-center text-[25px] font-bold text-[#3B3029]">
              {userColor}
            </span>
          </div>
          <div className="flex flex-col gap-[20px]">
            <span className="flex gap-[10px]">
              <span className="text-[#373737CC] text-[18px]">곡명</span>
              <input
                type="text"
                placeholder="입력해주세요"
                className="text-white text-[18px] bg-transparent border-none outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </span>
            <span className="flex gap-[10px]">
              <span className="text-[#373737CC] text-[18px]">가수명</span>
              <input
                type="text"
                placeholder="입력해주세요"
                className="text-white text-[18px] bg-transparent border-none outline-none"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </span>
            <span className="flex flex-col gap-[10px]">
              <span className="text-[#373737CC] text-[18px]">유튜브 URL</span>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="text-white w-[214px] text-[18px] bg-transparent border-none outline-none"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  overflow: "hidden",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </span>
            <span className="flex flex-col gap-[10px]">
              <span className="text-[#373737CC] text-[18px]">곡 한줄 소개</span>
              <input
                type="text"
                placeholder="입력해주세요"
                className="text-white text-[18px] bg-transparent border-none outline-none"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
          </div>
          <button
            className="w-[134px] h-[60px] shrink-0 rounded-[10px] bg-[#B46A5599] text-black text-[20px] font-bold text-center mt-[90px]"
            onClick={() => {
              setSubmittedSong({
                title: name,
                artist: artist,
                sourceUrl: url,
                comment: description,
              });

              handleSubmit();
            }}
            style={{
              cursor: "pointer",
            }}
          >
            신청하기
          </button>
        </form>
        <LP_Icon
          centerColor={emotionColor}
          className="absolute top-0 left-[336px] w-[596px] h-[596px] animate-lp-spin"
        />
      </div>
    </div>
  );
}
