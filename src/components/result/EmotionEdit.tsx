import { emotionLabels, emotionMapping } from "@/constants/constants";
import { useAuth } from "../../../provider/UserContextProvider";
import { HomeAPI } from "../../../api/api";
import { useState, useEffect } from "react";
import { EmotionLabelResponse } from "../../../api/api";

export default function EmotionEdit({
  selectedState,
  onSelect,
  onConfirm,
}: {
  selectedState: string;
  onSelect: (state: string) => void;
  onConfirm: () => void;
}) {
  // EmotionList를 HomeAPI의  getEmotionLabel으로 받아와
  const { labelId, labelName, token, setLabelId, setLabelName } = useAuth();
  const [emotionList, setEmotionList] = useState<EmotionLabelResponse[]>([]);

  useEffect(() => {
    const fetchEmotionList = async () => {
      const res = await HomeAPI.getEmotionLabels(token);
      console.log(res);
      setEmotionList(res.data);
    };
    fetchEmotionList();

    console.log(emotionList);
  }, []);

  // 감정 선택 핸들러
  const handleSelect = (emotion: EmotionLabelResponse) => {
    setLabelId(emotion.id);
    setLabelName(emotion.name);
    onSelect(emotion.name); // 선택된 감정 이름을 상위로 전달
  };

  return (
    <div className="max-w-4xl h-[80vh] flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center max-w-4xl mx-auto rounded-xl rounded-tl-none shadow bg-[#F2D6C2] w-[530px] h-[143px] px-[40px]">
        <div className="text-[22px] mb-2 text-[#6B4F3B]">
          죄송해요. 분석에 실수가 있었던 것 같아요.
        </div>
        <div className="text-[22px] text-[#6B4F3B]">
          직접 기분을 선택해 주시겠어요?
        </div>
        <div className="relative">
          <img
            src="/img/bubbletip.svg"
            className="absolute -left-[49px] -top-[103.5px] z-10 w-[15px] h-[12px]"
          />
          <img
            src="/img/darak.svg"
            className="absolute w-[86px] h-[57px] -left-[160px] -top-[150px] z-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mx-auto my-6 w-fit">
        {emotionList.map((emotion) => (
          <button
            key={emotion.id}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center justify-center gap-4
              ${
                selectedState === emotion.name
                  ? "bg-[#FFFFFF99] text-[25px] border border-[#B46A55]"
                  : "bg-[#FFFFFF99] text-[25px]"
              }
            `}
            onClick={() => onSelect(emotion)}
            style={{
              cursor: "pointer",
            }}
          >
            <img
              src={`/img/${
                emotionMapping[emotion.name as keyof typeof emotionMapping]
              }.svg`}
              className="w-7 h-7"
              alt={emotion.name}
            />
            <span>{emotion.name}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-6 mt-8 items-center justify-center">
        <button
          className="rounded-xl bg-[#B46A5599] w-[134px] h-[60px] font-bold text-lg"
          onClick={onConfirm}
          style={{
            cursor: "pointer",
          }}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
}
