"use client";
import { useRouter } from "next/navigation";

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
  const handleConfirm = () => {
    onConfirm();
    router.push("/log");
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 flex flex-col items-center min-w-[320px] relative shadow-lg">
        <div className="mb-4 text-center text-lg font-semibold">
          프로필을 확정할까요?
        </div>
        <div
          className="w-20 h-20 rounded-full mb-4"
          style={{
            backgroundColor: userColor,
          }}
        />
        <div className="mb-4 w-full text-center font-mono">
          {userColor || "닉네임"}
        </div>
        <div className="flex gap-4 mt-2">
          <button onClick={onClose} className="px-6 py-2 rounded bg-gray-200">
            X
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded bg-blue-500 text-white"
          >
            ◯
          </button>
        </div>
      </div>
    </div>
  );
}
