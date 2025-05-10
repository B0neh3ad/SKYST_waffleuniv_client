"use client";

import { useState } from "react";
import ProfileConfirmDialog from "./ProfileConfirmDialog";
import { useUserColor } from "../../../provider/UserContextProvider";
import Image from "next/image";

function isValidHexColor(str: string) {
  return /^#[0-9a-fA-F]{6}$/.test(str);
}

export default function HomeSection() {
  // 좌측
  const [serviceDesc, setServiceDesc] = useState("");
  const [checked, setChecked] = useState(false);
  // 우측
  const [dialogOpen, setDialogOpen] = useState(false);
  const { userColor, setUserColor } = useUserColor();
  const isValid = isValidHexColor(userColor);

  return (
    <div className="flex w-full h-screen mx-auto overflow-hidden">
      {/* 좌측 */}
      <div className="flex-1 flex flex-col w-[50%] items-center bg-darak-bg justify-center gap-6">
        {/* 로고 넣을 부분. */}
        <Image src="/img/darak.svg" alt="darak" width={85.7} height={57.44} />
        <Image src="/img/title.svg" alt="title" width={335} height={130} />
        <div className="flex justify-center items-center mx-[140px] min-w-[500px] h-[261px] relative gap-2.5 p-[22px] rounded-[20px] bg-[#979797]/20">
          <p className="flex-grow-0 flex-shrink-0 w-full text-base text-left">
            <span className="flex-grow-0 flex-shrink-0 w-full text-base font-light text-left text-[#373737]">
              와플대학이 느낀 ‘그대에게’의 이미지는 [연결, 위로, 공감] 입니다. 저희는 ’그대에게’가, 공연에서
              관중들의 호응과 함께하며 완성되는 음악이라고 생각했습니다. 사람들과 함께하고, ‘으쌰라으쌰’ 에
              맞춰 응원하며 공연을 즐기는 이미지에서 웹페이지에서 다른 사용자와의 ‘연결’ 을 강조하고
              싶었습니다. 
              와플대학은, <br />
            </span>
            <span className="flex-grow-0 flex-shrink-0 w-full text-base text-left text-[#6b4f3b]">
              ‘다락방'
            </span>
            <span className="flex-grow-0 flex-shrink-0 w-full text-base font-light text-left text-[#373737]">
              이 처음 보는 사람들끼리도 음악을 통해 서로가 함께하고 있다는 공감을 주고받고 위로받을 수 있는
              서비스로 다가왔으면 좋겠습니다.
            </span>
          </p>
        </div>

      </div>
      {/* 우측 */}
      <div className="flex-1 flex flex-col w-[50%] items-center justify-center bg-[#DCD8CF] gap-6 relative">
        <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
          <p className="self-stretch flex-grow-0 flex-shrink-0 text-[28px] font-bold text-center text-black">
            만나서 반가워요! <br/>
            다락에서 사용할 익명 프로필을 만들어주세요
          </p>
          <span className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-[#6b4f3b]">
            다락방 서비스는 고유 컬러값을 이용해 사용자를 등록합니다. <br/>
            컬러 차트에서 원하는 색을 찍어주세요!
          </span>
        </div>
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[200px] relative gap-5">
          <div
            className="w-[180px] h-[180px] rounded-full mb-2 border-2 border-white"
            style={{
              backgroundColor: isValid ? userColor : "#e5e7eb", // gray-200 fallback
            }}
          />
          <input
            className="flex flex-col justify-start flex-grow-0 flex-shrink-0 h-[60px] w-[200px] gap-2.5 px-[30px] py-3 rounded-[10px] bg-white/60 bg-white/60 justify-center items-center relative gap-2.5 p-2.5 text-[25px] font-bold text-center text-[#3b3029]/70"
            placeholder="aabbcc"
            value={userColor.replace("#", "")}
            maxLength={6}
            onChange={(e) => {
              const val = e.target.value;
              // 6글자 이하, 16진수만 허용
              if (val.length <= 6 && /^[0-9a-fA-F]*$/.test(val)) {
                setUserColor("#" + val);
              }
            }}
          />
        </div>
        
        <button
          className="flex flex-col justify-center items-center w-[134px] h-[60px] gap-2.5 px-[33px] py-[15px] rounded-[10px] bg-[#b46a55]/60"
          onClick={() => {
            if (isValid) setDialogOpen(true);
          }}
          disabled={!isValid}
          style={{
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5">
            <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-black">선택 완료</p>
          </div>
        </button>
      </div>
      {/* 다이얼로그 */}
      <ProfileConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          setDialogOpen(false); /* TODO: handle confirm */
        }}
        userColor={userColor}
      />
    </div>
  );
}
