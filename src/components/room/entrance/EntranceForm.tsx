import { useUserColor } from "../../../../provider/UserContextProvider";

interface EntranceFormProps {
  handleSubmit: () => void;
}

export default function EntranceForm({ handleSubmit }: EntranceFormProps) {
  const { userColor } = useUserColor();

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full bg-gray-50 overflow-hidden">
      {/* Top: Title */}
      <div className="mt-16 mb-8 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: userColor }}
          />
          <span className="text-xl font-semibold">
            <span className="text-purple-400">{userColor}</span>
            의 신청곡을 작성해주세요!
          </span>
        </div>
      </div>
      {/* Form Card */}
      <form
        className="relative bg-white rounded-3xl shadow-lg w-[520px] max-w-full p-10 flex flex-col items-center z-10"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Applicant color circle and nickname */}
        <div className="flex items-center mb-6 w-full">
          <span
            className="w-8 h-8 rounded-full mr-2 border-2 border-gray-500 flex items-center justify-center"
            style={{ backgroundColor: userColor }}
          />
          <span className="text-lg font-semibold">{userColor}</span>
        </div>
        {/* Fields */}
        <div className="w-full space-y-4 mb-6">
          <input
            type="text"
            placeholder="곡명"
            className="w-full border-b-2 border-gray-200 focus:border-purple-400 outline-none text-base py-1 px-2 bg-transparent"
            required
          />
          <input
            type="text"
            placeholder="가수명"
            className="w-full border-b-2 border-gray-200 focus:border-purple-400 outline-none text-base py-1 px-2 bg-transparent"
            required
          />
          <input
            type="url"
            placeholder="유튜브 URL"
            className="w-full border-b-2 border-gray-200 focus:border-purple-400 outline-none text-base py-1 px-2 bg-transparent"
            required
          />
          <input
            type="text"
            placeholder="한줄소개"
            className="w-full border-b-2 border-gray-200 focus:border-purple-400 outline-none text-base py-1 px-2 bg-transparent"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 px-8 py-2 bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-lg shadow transition"
        >
          신청하기
        </button>
        {/* Decorative Arc on the right */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-40 h-40 border-4 border-purple-200 rounded-full z-0 opacity-60 pointer-events-none" />
      </form>
    </div>
  );
}