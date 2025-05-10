"use client";

import { useEffect, useState } from "react";
import EntranceItem from "./EntranceItem";
import EntranceForm from "./EntranceForm";
import { useRouter } from "next/navigation";
import { useUserColor } from "../../../../provider/UserContextProvider";
import EntranceConfirmDialog from "./EntranceConfirmDialog";

export default function EntranceSection() {
  const router = useRouter();
  const [step, setStep] = useState<"init" | "form">("init");
  const [submitted, setSubmitted] = useState(false);
  const { userColor } = useUserColor();

  useEffect(() => {
    console.log(userColor);
    if (userColor == "#") {
      router.push("/");
    }
  }, [userColor]);

  const handleNext = () => {
    setStep("form");
  }

  const handleSubmit = () => {
    setSubmitted(true);
  }

  if (step == "init"){
    return (
      <EntranceItem handleNext={handleNext}/>
    );
  } else if (step == "form"){
    return (
      <>
        <EntranceForm handleSubmit={handleSubmit} />
        <EntranceConfirmDialog
          open={submitted}
          onConfirm={() => router.push("/room/1")}
        />
      </>
    );
  }
}
