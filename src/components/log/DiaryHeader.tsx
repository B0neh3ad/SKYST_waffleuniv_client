import { useUserColor } from "../../../provider/UserContextProvider";

export default function DiaryHeader({ userColor, mb }: { userColor: string, mb?: boolean }) {
  
  return (
    <div className={`flex items-center ${mb ? "mb-[110px]" : ""}`}>
        <div className="flex w-[214px] h-[60px] px-[30px] py-[12px] items-center gap-[10px] bg-[#FFFFFF99] rounded-[10px] mr-[22px]">
        <div
            className="w-[33px] h-[33px] rounded-full drop-shadow-[2px_2px_5px_rgba(0,0,0,0.10)]"
            style={{ backgroundColor: userColor === "#DARACK" ? "#DADADA" : userColor }}
        />
        <span className="text-[#3B3029] text-center text-[25px] font-bold leading-[16px]">{userColor}</span>
        </div>
        <div className="flex flex-col text-center">
        <span className="flex justify-center items-center gap-[10px] self-stretch text-[#3B3029] text-center text-[20px] font-bold">오늘의 감정 일기</span>
        <span className="text-[#3B30294D] text-center text-[20px] font-bold">2025.05.11</span>
        </div>
    </div>
  );
}