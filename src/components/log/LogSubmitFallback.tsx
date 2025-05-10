import Image from "next/image";
import DiaryHeader from "./DiaryHeader";

export default function LogSubmitFallback() {

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center min-h-[400px] bg-[#CBC8C1]">
      <div className="flex flex-col mt-[116.4px] justify-center mb-[70.56px]">
        <Image src="/img/darak.svg" alt="darak" width={85.7} height={57.44} />
        <div className="flex h-[39px] flex-col justify-center align-stretch text-black text-[28px] font-bold mb-[10px]">
          다락이가 일기의 감정을 분석하고 있어요.
        </div>
        <div className="text-[#6B4F3B] text-center text-[18px] font-bold">
          기다리는 동안 다락이의 일기를 읽어주세요!
        </div>
      </div>
      <div
        className="flex flex-col w-[550px] px-[76px] pt-[60px] items-center rounded-t-[15px] bg-[#FAF5F1] gap-[41px]"
        style={{
          boxShadow: '5px 5px 100px 0px rgba(0, 0, 0, 0.10)',
        }}
      >          
        <DiaryHeader userColor={"#DARACK"} />
        <div
          className="w-full flex flex-col"
          style={{
            fontFamily: 'hakgyoansimNadeuriLarge',
          }}
        >
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">안녕하세요! 저는 다락이에요.</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">사용자님의 일기를 읽게 되어서 정말 기뻐요!</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">얼른 읽고, 어떤 기분을 느끼고 계신지 정확히 분석할게요.</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">제가 곧 분석을 마치면, 같은 기분을 느끼고 계신 분들과</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">함께 음악을 나눌 수 있는 다락으로 초대해 드릴 거예요.</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">그때 나누고 싶은 음악을 미리 생각해 두셔도 좋아요!</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">앞으로도 자주 만날 수 있었으면 좋겠어요.</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">슬플 때, 외로울 때, 기쁜 일이 있을 때, 화날 때, 혹은</div>
          <div className="text-[#6B4F3B] h=[35px] text-[20px] border-b border-b-1 border-[#6B4F3B]">아무 생각 없을 때라도 부담없이 찾아주세요!</div>
        </div>
      </div>
    </div>
  );
}