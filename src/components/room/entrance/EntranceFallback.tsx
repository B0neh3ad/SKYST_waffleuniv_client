export default function EntranceFallback() {
  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full bg-gray-50 overflow-hidden">
      <div className="mt-32 bg-white rounded-3xl shadow-lg w-[520px] max-w-full p-12 flex flex-col items-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">신청이 완료되었어요!</h1>
        <p className="text-lg text-gray-600 text-center mb-8">이제 편안히 음악을 듣고 감상해주세요.</p>
        <div className="text-3xl text-gray-400 animate-bounce">▼</div>
      </div>
      {/* Optional: Decorative background below card */}
      <div className="absolute left-0 right-0 bottom-0 top-1/2 bg-gradient-to-t from-purple-100 to-transparent pointer-events-none -z-10" />
    </div>
  );
}