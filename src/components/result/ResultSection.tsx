"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResultItem from "./ResultItem";
import EmotionEdit from "./EmotionEdit";
import EmotionConfirm from "./EmotionConfirm";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../provider/UserContextProvider";
import { useAuth } from "../../../provider/UserContextProvider";
import { HomeAPI } from "../../../api/api";

export default function ResultSection() {
  const router = useRouter();
  const { setRoomId } = useUserColor();
  const {
    labelId,
    labelName,
    setToken,
    token,
    setUserCount,
    setSongCount,
    setCurrentSongVideoId,
    setCurrentSongStartedAt,
  } = useAuth();
  const [selectedState, setSelectedState] = useState<string>(labelName || "");
  const [step, setStep] = useState<"result" | "edit" | "confirm">("result");
  const [isCorrect, setIsCorrect] = useState(true);

  useEffect(() => {
    //localstorage에 저장된 token 꺼내서 provider에 설정
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);

  const handleConfirm = async () => {
    // TODO: 감정 Label 전송하고, 기다리는 동안, EmotionConfirm 표시
    console.log(token);
    const res = await HomeAPI.joinRoom(token);
    console.log(res);
    const res_data = res.data as any;
    if (res_data) {
      const roomId = res_data.roomId;
      const userCount = res_data.userCount;
      const songCount = res_data.songCount;
      const currentSongVideoId = res_data.currentSongVideoId;
      const currentSongStartedAt = res_data.currentSongStartedAt;
      setUserCount(userCount);
      setSongCount(songCount);
      setCurrentSongVideoId(currentSongVideoId);
      setCurrentSongStartedAt(currentSongStartedAt);
      setRoomId(roomId);
    }
    HomeAPI.feedback(isCorrect, labelId, token).then((res) => {
      console.log(res);
      router.push("/room/entrance");
    });

    // TODO: response가 오면 '/room/entrance'으로 이동
    console.log("submitted");
    setStep("confirm");
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
