import { MAX_DIARY_LENGTH } from "@/constants/constants";
import { useUserColor } from "../../../provider/UserContextProvider";
import DiaryHeader from "./DiaryHeader";

interface LogConfirmProps {
    diary: String;
    handleBack: () => void;
    handleConfirm: () => void;
};

export default function LogConfirm({ diary, handleBack, handleConfirm }: LogConfirmProps) {
    const { userColor } = useUserColor();

    return (
      <div className="flex w-full h-screen bg-darak-bg">
        {/* Left: Diary summary */}
        <div className="flex-1 flex flex-col w-[50%] bg-darak-bg justify-center items-center">
          <div
            className="flex flex-col w-[550px] h-[676px] rounded-[15px] bg-[#FAF5F1] px-[75px] py-[60px]"
            style={{
              boxShadow: '5px 5px 100px 0px rgba(0, 0, 0, 0.10)',
            }}
          >
            <DiaryHeader userColor={userColor} />
            <div className="w-full h-full bg-[#FAF5F1] text-[#6B4F3B] resize-none leading-[53px] text-[20px] text-[#6B4F3B] mt-[57px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 52px, #B7A89A 52px, #B7A89A 53px)",
                backgroundSize: "100% 53px",
                overflow: "hidden",
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                fontFamily: "hakgyoansimNadeuriLarge",
              }}
            >
              {diary}
            </div>
            <div className="mb-[50px] flex self-end justify-end items-center text-sm text-gray-400">
              <span className="text-[#6B4F3B] text-center text-[20px] font-bold">{diary.length}</span>
              <span className="text-[#00000080] text-center text-[20px] font-bold">/{MAX_DIARY_LENGTH}</span>
            </div>
          </div>
        </div>
        {/* Right: Confirmation and options */}
        <div className="flex-1 flex flex-col w-[50%] justify-between bg-[#DCD8CF] justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-[10px] self-stretch mb-[40px]">
            <div className="flex h-[39px] flex-col justify-center self-stretch text-center text-black text-[28px] font-bold">일기를 확정할까요?</div>
            <div className="text-[#6B4F3B] text-center text-[18px] font-bold">확정하면 AI가 나의 감정을 분석해요</div>
          </div>
          <div className="flex justify-between gap-[20px]">
            <button
              className="w-[134px] h-[60px] rounded-[10px] bg-[#F2D6C2] text-black text-center text-[20px] font-bold"
              onClick={handleBack}
              style={{
                cursor: 'pointer',
              }}
            >
              돌아가기
            </button>
            <button
              className="w-[134px] h-[60px] rounded-[10px] bg-[#B46A5599] text-black text-center text-[20px] font-bold"
              onClick={handleConfirm}
              style={{
                cursor: 'pointer',
              }}
            >
              확정하기
            </button>
          </div>
        </div>
      </div>
    );
}