"use client";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../provider/UserContextProvider";
import Image from "next/image";

export default function LogSubmitConfirmDialog({
  open,
  onConfirm,
}: {
  open: boolean;
  onConfirm: () => void;
}) {
  const router = useRouter();
  const { userColor } = useUserColor();
  const handleConfirm = () => {
    onConfirm();
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[#FAF5F1] rounded-[10px] w-[735px] h-[408px] py-[98px] flex-col justify-center items-center gap-[10px]">
        <Image
          src="/img/darak.svg"
          alt="darak"
          width={85.7}
          height={57.44}
          style={{
            marginLeft: "183px",
          }}
        />
        <div className="flex flex-col mb-[30px] items-center">
          <div className="flex h-[39px] flex-col justify-center self-stretch color-[#3B3029] text-center text-[28px] font-bold">
            다락이가 분석을 완료했어요!
          </div>
          <div className="self-stretch text-[#6B4F3B] text-center text-[18px] font-bold">
            기분 분석이 명확히 완료되었는지 확인해주세요.
          </div>
        </div>
        <div className="flex self-stretch items-center justify-center">
          <button
            onClick={handleConfirm}
            className="flex w-[180px] h-[60px] flex-col justify-center items-center bg-[#B46A5599] rounded-[10px] text-[20px] font-bold text-center text-black"
            style={{
              cursor: "pointer",
            }}
          >
            확인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
