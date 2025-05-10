"use client";

import { useEffect, useState } from "react";
import EntranceItem from "./EntranceItem";
import EntranceForm from "./EntranceForm";
import EntranceFallback from "./EntranceFallback";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../../provider/UserContextProvider";

export default function EntranceSection() {
  const router = useRouter();
  const [step, setStep] = useState<"init" | "form" | "enter">("init");
  const { userColor } = useUserColor();

  useEffect(() => {
    console.log(userColor);
    if (userColor == "#") {
      router.push("/home");
    }
  }, [userColor]);

  const handleNext = () => {
    setStep("form");
  }

  const handleSubmit = () => {
    setStep("enter");
    setTimeout(() => {
      router.push("/room/1");
    }, 2000);
  }

  if (step == "init"){
    return (
      <EntranceItem handleNext={handleNext}/>
    );
  } else if (step == "form"){
    return (
      <EntranceForm handleSubmit={handleSubmit} />
    );
  } else if (step == "enter"){
    return (
      <EntranceFallback />
    );
  }
}
