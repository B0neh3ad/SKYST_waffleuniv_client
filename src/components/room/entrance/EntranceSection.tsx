"use client";

import { useEffect, useState } from "react";
import EntranceItem from "./EntranceItem";
import EntranceForm from "./EntranceForm";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../../provider/UserContextProvider";
import { HomeAPI } from "../../../../api/api";
import { useAuth } from "../../../../provider/UserContextProvider";
import EntranceConfirmDialog from "./EntranceConfirmDialog";
import { useStompClient } from "../../../../hooks/stompClient";
export default function EntranceSection() {
  const router = useRouter();
  const [step, setStep] = useState<"init" | "form">("init");
  const [submitted, setSubmitted] = useState(false);
  const { userColor } = useUserColor();
  const {
    token,
    roomId,
    setToken,
    setUserCount,
    setSongCount,
    setCurrentSongVideoId,
    setCurrentSongStartedAt,
    setRoomId,
  } = useAuth();
  useEffect(() => {
    console.log(userColor);
    if (userColor == "#") {
      router.push("/");
    }
  }, [userColor]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setToken(token);
    }
  }, [token]);

  const handleNext = async () => {
    setStep("form");
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (step == "init") {
    return <EntranceItem handleNext={handleNext} />;
  } else if (step == "form") {
    return (
      <>
        <EntranceForm handleSubmit={handleSubmit} />
        <EntranceConfirmDialog
          open={submitted}
          onConfirm={() => router.push(`/room/${roomId}`)}
        />
      </>
    );
  }
}
