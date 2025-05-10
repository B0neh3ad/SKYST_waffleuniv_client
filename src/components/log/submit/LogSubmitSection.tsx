"use client";

interface LogSubmitSectionProps {
  diary: String;
}

export default function LogSubmitSection() {
  const handleNext = () => {}

  // Analysis done
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <div className="text-lg font-semibold mb-6 text-center">
          분석이 완료되었어요!<br />
          감정 분석이 명확히 되었는지 확인해주세요
        </div>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNext}
        >
          OK
        </button>
      </div>
    </div>
  );
}