'use client';
import { useEffect, useRef, useState } from 'react';
import TalkBalloon from './TalkBalloon';
import TiTaeProfile from './TiTaeProfile';
import TitaeTalkBalloon from './TiTaeTalkBalloon';
import { useAccountData } from '@/stores/accountStore';
import { GetMyPageData } from '@/types/userType';
import { Chatting, Response } from '@/types/payData';
import { setChatResponseData } from '@/api/accountApi';

export default function AiChat() {
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [user, setUser] = useState<GetMyPageData | null>(null);
  const [message, setMessage] = useState<Chatting[]>([]);
  const [chatResponse, setChatResponse] = useState<Response | null>(null);
  const newMsg = useRef<HTMLDivElement>(null);
  const { userData } = useAccountData();
  const nickname = user?.data.data.nickname;
  const welcomeMessage = `안녕하세요 ${nickname}님! 무엇을 도와드릴까요?`;
  const handleFetch = async () => {
    setShowIcon(false);
    if (chatResponse === null) {
      const res = await setChatResponseData();
      console.log(res);
      setChatResponse(res);
    }
  };
  const handleClick = async (value: string, id: string) => {
    // if (chatResponse === null) {
    //   const res = await setChatResponseData();
    //   console.log(res);
    //   setChatResponse(res);
    // }
    console.log(message);
    if (id === 'savingFeedback') {
      setMessage([
        ...message,
        { user: true, message: value },
        { user: false, message: chatResponse!.savingFeedback },
      ]);
    } else if (id === 'spendingTips') {
      setMessage([
        ...message,
        { user: true, message: value },
        { user: false, message: chatResponse!.spendingTips },
      ]);
    } else if (id === 'spendingPattern') {
      setMessage([
        ...message,
        { user: true, message: value },
        { user: false, message: chatResponse!.spendingPattern },
      ]);
    }
  };
  useEffect(() => {
    setMessage([]);
    setUser(userData);
  }, []);
  useEffect(() => {
    if (newMsg && newMsg.current) {
      newMsg.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);
  return (
    <>
      <div
        className={`relative mt-[16px] flex h-[70px] max-h-[400px] w-[350px] flex-col items-center rounded-[10px] bg-[var(--white-color)] shadow-md transition-[height] ${!showIcon ? 'h-[500px]' : ''}`}
      >
        {!showIcon ? (
          <button
            className="absolute top-[10px] right-[10px]"
            onClick={() => setShowIcon(true)}
          >
            x
          </button>
        ) : null}
        <div className="mt-[45px] mb-[175px] flex w-full overflow-y-scroll">
          {!showIcon ? (
            <div className="flex w-full flex-col gap-[25px] px-[10px] text-center">
              <div className="flex w-full gap-[10px]">
                <TiTaeProfile />
                <TitaeTalkBalloon message={welcomeMessage} />
                {/* <TitaeTalkBalloon
                  message={'※ AI챗봇은 하루 3회 이용 가능합니다'}
                /> */}
              </div>
              {message?.map((v, i) =>
                !v.user ? (
                  <div className="flex w-full gap-[10px]" key={i}>
                    <TiTaeProfile />
                    <TitaeTalkBalloon message={v.message} />
                  </div>
                ) : (
                  <div className="flex w-full justify-end" key={i}>
                    <TalkBalloon message={v.message} />
                  </div>
                ),
              )}
              <div ref={newMsg} />
            </div>
          ) : null}
        </div>
        <div className="absolute right-[30px] bottom-[15px] flex gap-[20px]">
          {showIcon ? <TiTaeProfile /> : null}
          {showIcon ? (
            <button
              className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
              onClick={handleFetch}
            >
              자산 관리에 대해 티태에게 물어보세요!
            </button>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() =>
                  handleClick('내 소비를 간단히 분석해줘', 'savingFeedback')
                }
                id="savingFeedback"
              >
                내 소비를 간단히 분석해줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() =>
                  handleClick(
                    '돈을 더 아끼려면 어떻게 해야 할까?',
                    'spendingTips',
                  )
                }
                id="spendingTips"
              >
                돈을 더 아끼려면 어떻게 해야 할까?
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() =>
                  handleClick('내 소비 패턴을 알려줘', 'spendingPattern')
                }
                id="spendingPattern"
              >
                내 소비 패턴을 알려줘
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
