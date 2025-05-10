import React from "react";

export default function CurrentMusic({ userColor }: { userColor: string }) {
  return (
    <div>
      <div className="flex flex-col justify-start items-start w-[247px] relative gap-5">
        {/* 컬러 원 + 해시 */}
        <div className="flex flex-col justify-center items-center h-[60px] w-[214px] gap-2.5 px-[30px] py-3 rounded-[10px] bg-white/60">
          <div className="flex justify-start items-center relative">
            {/* 컬러 원 (SVG) */}
            <svg
              width="43"
              height="44"
              viewBox="0 0 43 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <g filter="url(#filter0_d_35_3808)">
                <circle
                  cx="19.5"
                  cy="20"
                  r="16.5"
                  fill={userColor || "#FF0000"}
                ></circle>
              </g>
              <defs>
                <filter
                  id="filter0_d_35_3808"
                  x="0"
                  y="0.5"
                  width="43"
                  height="43"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dx="2" dy="2"></feOffset>
                  <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_35_3808"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_35_3808"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
            <div className="flex justify-center items-center gap-2.5 p-2.5">
              <p className="text-[25px] font-bold text-center text-[#3b3029]">
                #{userColor || "FF0000"}
              </p>
            </div>
          </div>
        </div>
        {/* 구분선 */}
        <svg
          width="247"
          height="1"
          viewBox="0 0 247 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="self-stretch"
          preserveAspectRatio="none"
        >
          <line y1="0.5" x2="247" y2="0.5" stroke="#3B3029"></line>
        </svg>
        {/* 곡 정보 */}
        <div className="flex flex-col justify-start items-start w-[191px] gap-5">
          <div className="flex justify-start items-center gap-2.5">
            <p className="text-lg text-left text-[#373737]/30">곡명</p>
            <p className="w-[105px] text-lg text-left text-[#373737]/80">
              그대에게
            </p>
          </div>
          <div className="flex justify-start items-center gap-[13px]">
            <p className="text-lg text-left text-[#373737]/30">가수명</p>
            <p className="w-[105px] text-lg text-left text-[#373737]/80">
              신해철
            </p>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch gap-2.5">
            <p className="w-[191px] text-lg text-left text-[#373737]/30">
              곡 한줄 소개
            </p>
            <p className="w-[191px] text-lg text-left text-[#373737]/80">
              <span>슬플 때마다 이 노래를 </span>
              <br />
              <span>들으면서 힘을 얻습니다.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-[-3px] top-[605px] w-[599px]  flex justify-center">
        <div
          className="rounded-xl w-full bg-[#faf5f1] py-4 text-xl font-bold text-center shadow-lg"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
        >
          <span className="text-black">탭해서 </span>
          <span className="text-[#FF0000]">#{userColor || "FF0000"}</span>
          <span className="text-black"> 님의 일기 보기</span>
        </div>
      </div>
    </div>
  );
}
