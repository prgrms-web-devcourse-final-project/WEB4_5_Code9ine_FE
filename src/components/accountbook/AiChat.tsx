'use client';
import { useState } from 'react';
// import TalkBalloon from './TalkBalloon';
import TiTaeProfile from './TiTaeProfile';

export default function AiChat() {
  const [showIcon, setShowIcon] = useState<boolean>(true);
  // const message = '메세지';
  return (
    <>
      <div className="relative mt-[16px] flex h-[70px] max-h-[400px] w-[350px] flex-col items-center overflow-scroll rounded-[10px] bg-[var(--white-color)] shadow-md transition-[height] focus-within:h-[500px]">
        {/* {!showIcon ? (
          <div className="my-[25px] mb-[45px] flex w-full flex-col justify-end gap-[25px] px-[10px] text-center">
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <TalkBalloon message={message} />
            <div></div>
          </div>
        ) : null} */}
        <div className="absolute right-[30px] bottom-[10px] flex gap-[20px]">
          {showIcon ? <TiTaeProfile /> : null}
          <input
            type="text"
            className="h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)]"
            placeholder="자산 관리에 대해 무엇이든 물어보세요!"
            id="AiChat"
            onFocus={() => setShowIcon(false)}
            onBlur={() => setShowIcon(true)}
          />
        </div>
      </div>
    </>
  );
}
