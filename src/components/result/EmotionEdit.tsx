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

export default function EmotionEdit({
  selectedState,
  onSelect,
  onConfirm,
}: {
  selectedState: string;
  onSelect: (state: string) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="max-w-4xl h-[80vh] bg-white rounded-xl shadow flex flex-col items-center justify-center">
      <div className="text-xl mb-4">수정할 감정을 선택해주세요!</div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {EMOTION_LIST.map((emotion) => (
          <button
            key={emotion}
            className={`px-4 py-2 rounded-full border transition-colors
              ${
                selectedState === emotion
                  ? "bg-violet-500 text-white border-violet-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-violet-100"
              }
            `}
            onClick={() => onSelect(emotion)}
          >
            {emotion}
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
