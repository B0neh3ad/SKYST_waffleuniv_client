"use client";

import { useState } from "react";
import LogConfirmSection from "./LogConfirm";
import { useUserColor } from "../../../provider/UserContextProvider";
import LogSubmitFallback from "./LogSubmitFallback";
import { useRouter } from "next/navigation";
import LogItem from "./LogItem";
import { MAX_DIARY_LENGTH } from "@/constants/constants";
import LogSubmitConfirmDialog from "./LogSubmitConfirmDialog";

export default function LogSection() {
  // State for emotion, diary text, and character count
  const router = useRouter();
  const { userColor } = useUserColor();
  const [diary, setDiary] = useState("");
  const [step, setStep] = useState<"input" | "confirm" | "submit" | "complete">("input");
  const [submitted, setSubmitted] = useState(false);

  // Handler for clearing the diary
  const handleClear = () => {
    setDiary("");
  };

  // Handler for diary text change
  const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_DIARY_LENGTH) {
      setDiary(e.target.value);
    }
  };

  // Handler for next/confirm
  const handleNext = () => setStep("confirm");
  const handleBack = () => setStep("input");

  const handleConfirm = () => {
    // TODO: 일기를 전송하고 response가 올 때까지 LogSubmitFallback 표시
    // TODO: response가 오면 LogSubmitSection으로 이동
    setStep("submit");
    setTimeout(() => setSubmitted(true), 2000);
  }

  if (step === "confirm") {
    return (
      <LogConfirmSection diary={diary} handleBack={handleBack} handleConfirm={handleConfirm} />
    );
  } else if (step === "submit") {
    return (
      <>
        <LogSubmitFallback />
        <LogSubmitConfirmDialog
          open={submitted}
          onConfirm={() => router.push("/result")}
        />
      </>
    );
  } else {
    return (
      <LogItem
        userColor={userColor}
        diary={diary}
        handleClear={handleClear}
        handleDiaryChange={handleDiaryChange}
        handleNext={handleNext}
      />
    )
  }
}
