"use client";
import { useRouter } from "next/navigation";
import { HomeAPI } from "../../api/api";
import { useAuth } from "../../provider/UserContextProvider";
export default function ProfileConfirmDialog({
  open,
  onClose,
  onConfirm,
  userColor,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userColor: string;
}) {
  const router = useRouter();
  const { setToken } = useAuth();
  const handleConfirm = async () => {
    onConfirm();

    const colorHex = userColor.replace("#", "");
    try {
      const res = await HomeAPI.register(colorHex);
      // 예시: res.data.data.token 또는 res.data.token 등 실제 응답 구조에 맞게
      console.log("결과", res.data.token);
      if (res.data.token) {
        setToken(res.data.token);
        // local storage에 토큰 저장
        localStorage.setItem("token", res.data.token);
        console.log("토큰", res.data.token);

        router.push("/log");
      } else {
        // 토큰이 없으면 에러 처리 또는 재시도
        alert("토큰이 발급되지 않았습니다. 다시 시도해 주세요.");
      }
    } catch (e) {
      console.error("register error:", e);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-[735px] h-[622px] flex-col items-center bg-background rounded-xl pt-[67.5px] pb-[63px] flex flex-col items-center min-w-[320px] relative shadow-lg">
        <div className="flex flex-col justify-center self-stretch h-[39px] text-[28px] text-center leading-[16px] font-bold text-center justify-center text-lg font-semibold">
          이 색으로 프로필을 확정할까요?
        </div>
        <div className="mb-[30px] text-[#6B4F3B] text-center text-[18px] font-bold leading-[25px]">
          한번 확정한 프로필은 변경할 수 없어요.
        </div>
        <div
          className="w-[180px] h-[180px] rounded-full mb-[32px]"
          style={{
            backgroundColor: userColor,
          }}
        />
        <div className="flex w-[200px] h-[50px] flex-col justify-center items-center text-[25px] font-bold leading-[16px] text-center text-[#3B3029] rounded-[10px] bg-[#FFFFFF99]">
          {userColor || "닉네임"}
        </div>
        <div className="flex gap-[20px] mt-[67.5px]">
          <button
            onClick={onClose}
            className="flex w-[134px] h-[60px] flex-col justify-center items-center gap-[10px] bg-[#F2D6C2] rounded-[10px] text-[20px] font-bold text-center text-black"
            style={{
              cursor: "pointer",
            }}
          >
            돌아가기
          </button>
          <button
            onClick={handleConfirm}
            className="flex w-[134px] h-[60px] flex-col justify-center items-center gap-[10px] bg-[#B46A5599] rounded-[10px] text-[20px] font-bold text-center text-black"
            style={{
              cursor: "pointer",
            }}
          >
            확정하기
          </button>
        </div>
      </div>
    </div>
  );
}
