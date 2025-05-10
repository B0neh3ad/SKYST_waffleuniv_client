const EMOTION_LIST = [
  "기쁨",
  "슬픔",
  "분노",
  "불안",
  "평온",
  "놀람",
  "지루함",
  "감사",
  "후회",
  "자신감",
];

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
      setEmotionList(res.data ?? []);
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
    <div className="max-w-4xl h-[80vh] bg-white rounded-xl shadow flex flex-col items-center justify-center">
      <div className="text-xl mb-4">수정할 감정을 선택해주세요!</div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {emotionList.map((emotion) => (
          <button
            key={emotion.id}
            className={`px-4 py-2 rounded-full border transition-colors
              ${
                selectedState === emotion.name
                  ? "bg-violet-500 text-white border-violet-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-violet-100"
              }
            `}
            onClick={() => handleSelect(emotion)}
          >
            {emotion.name}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-full font-bold"
        onClick={onConfirm}
      >
        확정
      </button>
    </div>
  );
}
