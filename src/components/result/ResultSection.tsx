"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResultItem from "./ResultItem";
import EmotionEdit from "./EmotionEdit";
import EmotionConfirm from "./EmotionConfirm";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../provider/UserContextProvider";
import { useAuth } from "../../../provider/UserContextProvider";

export default function ResultSection() {
  const router = useRouter();
  const { setRoomId } = useUserColor();
  const { labelId, labelName, token } = useAuth();
  const [selectedState, setSelectedState] = useState<string>(labelName || "");
  const [step, setStep] = useState<"result" | "edit" | "confirm">("result");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleConfirm = () => {
    // TODO: 감정 Label 전송하고, 기다리는 동안, EmotionConfirm 표시
    // TODO: response가 오면 '/room/entrance'으로 이동
    console.log("submitted");
    setStep("confirm");
    // global context roomId 설정.
    const roomId = "1";
    setRoomId(roomId);
    setTimeout(() => router.push("/room/entrance"), 2000);
  };

  const handleReject = () => {
    setIsCorrect(false);
    setStep("edit");
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#F3EEE2]">
      <AnimatePresence mode="wait">
        {step === "result" && (
          <motion.div
            key="result"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full flex justify-center"
          >
            <ResultItem
              onReject={handleReject}
              onConfirm={handleConfirm}
              state={selectedState}
            />
          </motion.div>
        )}
        {step === "edit" && (
          <motion.div
            key="edit"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full flex justify-center"
          >
            <EmotionEdit
              selectedState={selectedState}
              onSelect={setSelectedState}
              onConfirm={() => setStep("result")}
            />
          </motion.div>
        )}
        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full flex justify-center"
          >
            <EmotionConfirm
              state={selectedState}
              onBack={() => setStep("result")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
