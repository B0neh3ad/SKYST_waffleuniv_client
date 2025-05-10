"use client";

import { useState, useEffect } from "react";
import LogConfirmSection from "./LogConfirm";
import { useUserColor } from "../../../provider/UserContextProvider";
import LogSubmitFallback from "./LogSubmitFallback";
import { useRouter } from "next/navigation";
import LogItem from "./LogItem";
import { MAX_DIARY_LENGTH } from "@/constants/constants";
import LogSubmitConfirmDialog from "./LogSubmitConfirmDialog";
import { useAuth } from "../../../provider/UserContextProvider";
import { u } from "framer-motion/client";
import { HomeAPI } from "../../../api/api";
function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return "";
}
export default function LogSection() {
  // State for emotion, diary text, and character count
  const router = useRouter();
  const { userColor } = useUserColor();
  const { token, setToken, setComment, setLabelId, setLabelName } = useAuth(); // 추가

  const [diary, setDiary] = useState("");
  const [step, setStep] = useState<"input" | "confirm" | "submit" | "complete">(
    "input"
  );
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

  useEffect(() => {
    //localstorage에 저장된 token 꺼내서 provider에 설정
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);
  // Handler for next/confirm
  const handleNext = () => setStep("confirm");
  const handleBack = () => setStep("input");

  const handleConfirm = async () => {
    // TODO: 일기를 전송하고 response가 올 때까지 LogSubmitFallback 표시
    // TODO: response가 오면 LogSubmitSection으로 이동
    setStep("submit");
    console.log("토큰", token);
    try {
      const res = await HomeAPI.record(diary, token);
      setComment(res.data.comment);
      setLabelId(res.data.labelId);
      setLabelName(res.data.labelName);
      setSubmitted(true);
    } catch (e) {
      console.error("일기 전송 실패", e);
      setStep("input");
      setSubmitted(false);
    }
  };

  if (step === "confirm") {
    return (
      <LogConfirmSection
        diary={diary}
        handleBack={handleBack}
        handleConfirm={handleConfirm}
      />
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
    );
  }
}
