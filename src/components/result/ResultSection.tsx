"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResultItem from "./ResultItem";
import EmotionEdit from "./EmotionEdit";
import EmotionConfirm from "./EmotionConfirm";
import { useRouter } from "next/navigation";
export default function ResultSection() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>("기쁨");
  const [step, setStep] = useState<"result" | "edit" | "confirm">("result");

  const handleConfirm = () => {
    // TODO: 감정 Label 전송하고, 기다리는 동안, EmotionConfirm 표시
    // TODO: response가 오면 '/room/entrance'으로 이동
    console.log("submitted");
    setStep("confirm");
    setTimeout(() => router.push("/room/entrance"), 2000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
              onReject={() => setStep("edit")}
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
