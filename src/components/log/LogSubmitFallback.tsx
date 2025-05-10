export default function LogSubmitFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col items-center">
        <div className="text-lg font-semibold mb-6 text-center">
          AI가 일기의 감정을<br />분석하고 있어요
        </div>
        <div className="w-full flex flex-col gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-6 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse`}
              style={{ width: `${60 + i * 20}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}