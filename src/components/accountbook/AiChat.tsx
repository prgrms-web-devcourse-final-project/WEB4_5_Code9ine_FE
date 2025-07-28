'use client';
import { useEffect, useRef, useState } from 'react';
import TalkBalloon from './TalkBalloon';
import TiTaeProfile from './TiTaeProfile';
import TitaeTalkBalloon from './TiTaeTalkBalloon';
import { useAccountData } from '@/stores/accountStore';
import { GetMyPageData } from '@/types/userType';
import { Chatting } from '@/types/payData';

export default function AiChat() {
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [user, setUser] = useState<GetMyPageData | null>(null);
  const [message, setMessage] = useState<Chatting[]>([]);
  // const [chatResponse, setChatResponse] = useState<Response | null>(null);
  const [isHello, setIsHello] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<boolean>(false);
  const [recommend, setRecommend] = useState<boolean>(false);
  const [spend, setSpend] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<boolean>(false);
  const [isReturn, setIsReturn] = useState<boolean>(false);
  const newMsg = useRef<HTMLDivElement>(null);
  const { userData } = useAccountData();
  const nickname = user?.data.data.nickname;
  const welcomeMessage = `안녕하세요 ${nickname}님! 무엇을 도와드릴까요?`;
  const handleFetch = async () => {
    setShowIcon(false);
    setIsHello(true);
    // if (chatResponse === null) {
    // const res = await setChatResponseData();
    // setChatResponse(res);
    // }
  };

  const handleCategory = (value: string) => {
    if (value === '추천') {
      setRecommend(true);
      setIsHello(false);
    } else if (value === '소비') {
      setSpend(true);
      setIsHello(false);
    } else if (value === '절약') {
      setSaving(true);
      setIsHello(false);
    } else if (value === '평가') {
      setEstimate(false);
      setIsReturn(true);
    } else if (value === '돌아가기') {
      setIsReturn(false);
    } else if (value === '인사') {
      setIsHello(false);
      setSelectCategory(true);
    }
  };

  const handleClick = async (value: string, id: string) => {
    if (id === 'savingFeedback') {
      setMessage([
        { user: true, message: value },
        // { user: false, message: chatResponse!.savingFeedback },
      ]);
    } else if (id === 'spendingTips') {
      setMessage([
        ...message,
        { user: true, message: value },
        // { user: false, message: chatResponse!.spendingTips },
      ]);
    } else if (id === 'spendingPattern') {
      setMessage([
        ...message,
        { user: true, message: value },
        // { user: false, message: chatResponse!.spendingPattern },
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
          {/* 초기 버튼 */}
          {showIcon ? (
            <button
              className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
              onClick={handleFetch}
            >
              자산 관리에 대해 티태에게 물어보세요!
            </button>
          ) : null}
          {isHello ? (
            <button
              className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
              onClick={() => handleCategory('인사')}
            >
              인사
            </button>
          ) : null}
          {/* 카테고리 선택 */}
          {selectCategory ? (
            <div>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                추천
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                소비
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                절약
              </button>
            </div>
          ) : null}
          {/* 추천 메뉴 */}
          {recommend ? (
            <div>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleClick('메세지', '아이디')}
              >
                점심 메뉴를 추천해줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                저녁 메뉴를 추천해줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                서울 내에서 갈만한 착한 가게 추천해줘
              </button>
            </div>
          ) : null}
          {spend ? (
            <div>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                지출이 제일 많은 분야 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                내 수입보다 많이 지출한 분야 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                내가 다른 사람들보다 많이 지출한 분야를 알려줘
              </button>
            </div>
          ) : null}
          {saving ? (
            <div>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                절약 꿀팁 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                내가 절약할 수 있을만한 카테고리 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                지출을 줄일 수 있는 부분을 알려줘
              </button>
            </div>
          ) : null}
          {estimate ? (
            <div>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                고마워 도움이 되었어
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={handleFetch}
              >
                미안 별로 도움이 되지는 않았어
              </button>
            </div>
          ) : null}
          {isReturn ? (
            <button
              className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
              onClick={handleFetch}
            >
              다시 물어보기
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
