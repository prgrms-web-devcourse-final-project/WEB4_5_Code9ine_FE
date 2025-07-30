'use client';
import { useEffect, useRef, useState } from 'react';
import TalkBalloon from './TalkBalloon';
import TiTaeProfile from './TiTaeProfile';
import TitaeTalkBalloon from './TiTaeTalkBalloon';
import { useAccountData } from '@/stores/accountStore';
import { Chatting, Response } from '@/types/payData';
import RandomData from '../../data/test.json';
import { askGemini, getRandomStore } from '@/api/accountApi';
import { getBudgetAnalysis } from '@/services/mainService';

export default function AiChat() {
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [message, setMessage] = useState<Chatting[]>([]);
  const [chatResponse, setChatResponse] = useState<Response | null>(null);
  const [selectCategory, setSelectCategory] = useState<boolean>(false);
  const [recommend, setRecommend] = useState<boolean>(false);
  const [spend, setSpend] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isReturn, setIsReturn] = useState<boolean>(false);
  const newMsg = useRef<HTMLDivElement>(null);
  const { userData } = useAccountData();
  const welcomeMessage = `안녕하세요 ${userData?.data.data.nickname}님! 무엇을 도와드릴까요?`;
  const handleFetch = async () => {
    setShowIcon(false);
    setSelectCategory(true);
    // if (chatResponse === null) {
    // const res = await setChatResponseData();
    // setChatResponse(res);
    // }
  };

  const handleCategory = async (value: string) => {
    if (value === '추천') {
      setRecommend(true);
      setSelectCategory(false);
    } else if (value === '소비') {
      setSpend(true);
      setSelectCategory(false);
      if (chatResponse === null) {
        const geminiAnswer = await askGemini();
        setChatResponse(geminiAnswer);
      }
    } else if (value === '절약') {
      setSaving(true);
      setSelectCategory(false);
      if (chatResponse === null) {
        const geminiAnswer = await askGemini();
        setChatResponse(geminiAnswer);
      }
    } else if (value === '돌아가기') {
      setIsReturn(false);
      setSelectCategory(true);
    }
  };

  const handleRandomRecommend = async (value: string) => {
    const randomData = RandomData;
    if (value === '점메추') {
      message.push({ user: true, message: '점심 메뉴를 추천해줘' });
      const randomLunch =
        randomData.lunch[Math.floor(Math.random() * randomData.lunch.length)]
          .title;
      const recommendLunchMessage = `오늘 점심으로 ${randomLunch}은(는) 어떠신가요?`;
      setMessage([...message, { user: false, message: recommendLunchMessage }]);
    } else if (value === '저메추') {
      message.push({ user: true, message: '저녁 메뉴를 추천해줘' });
      const randomDinner =
        randomData.dinner[Math.floor(Math.random() * randomData.dinner.length)]
          .title;
      const recommendDinnerMessage = `오늘 저녁으로 ${randomDinner}은(는) 어떠신가요?`;
      setMessage([
        ...message,
        { user: false, message: recommendDinnerMessage },
      ]);
    } else if (value === '착한가게') {
      message.push({
        user: true,
        message: '서울 내에서 갈만한 착한 가게 추천해줘',
      });
      const randomStore = await getRandomStore();
      const randomPick =
        randomStore[Math.floor(Math.random() * randomStore.length)];
      const randomPickMessage = `${randomPick.name}을(를) 가보시는건 어떠신가요? ${randomPick.address}에 있어요!`;
      setMessage([...message, { user: false, message: randomPickMessage }]);
    }
    setIsReturn(true);
    setRecommend(false);
  };

  const handleSpend = async (value: string) => {
    if (value === '지출분석') {
      message.push({ user: true, message: '지출이 제일 많은 분야 알려줘' });
      const budget = await getBudgetAnalysis();
      const maxItem = budget.categorySummary.reduce((max, current) =>
        current.totalAmount > max.totalAmount ? current : max,
      );
      const mostPayMessage = `${maxItem.category} 카테고리에서 지출이 제일 많으시네요! 총 ${maxItem.totalAmount}원 사용하셨어요!`;
      setMessage([...message, { user: false, message: mostPayMessage }]);
    } else if (value === '과소비분석') {
      message.push({
        user: true,
        message: '내 수입보다 많이 지출한 분야 알려줘',
      });
      if (chatResponse === null) {
        setMessage([
          ...message,
          {
            user: false,
            message: `답변을 생각 중이에요. 잠시 후 다시 시도해주세요.`,
          },
        ]);
        return;
      }
      const analyze = chatResponse!.overIncomeSpending;
      setMessage([...message, { user: false, message: analyze }]);
    } else if (value === '평균이상지출') {
      message.push({
        user: true,
        message: '내가 다른 사람들보다 많이 지출한 분야를 알려줘',
      });
      if (chatResponse === null) {
        setMessage([
          ...message,
          {
            user: false,
            message: `답변을 생각 중이에요. 잠시 후 다시 시도해주세요.`,
          },
        ]);
        return;
      }
      const analyze = chatResponse!.aboveAverageSpending;
      setMessage([...message, { user: false, message: analyze }]);
    }
    setIsReturn(true);
    setSpend(false);
  };

  const handleSaving = async (value: string) => {
    if (value === '꿀팁') {
      message.push({ user: true, message: '절약 꿀팁 알려줘' });
      const randomTip = chatResponse!.savingTips;
      setMessage([...message, { user: false, message: randomTip }]);
    } else if (value === '절약카테고리') {
      message.push({
        user: true,
        message: '내가 절약할 수 있을만한 카테고리 알려줘',
      });
      if (chatResponse === null) {
        setMessage([
          ...message,
          {
            user: false,
            message: `답변을 생각 중이에요. 잠시 후 다시 시도해주세요.`,
          },
        ]);
        return;
      }
      const saveCategory = chatResponse!.savableCategories;
      setMessage([...message, { user: false, message: saveCategory }]);
    } else if (value === '지출감소') {
      message.push({
        user: true,
        message: '지출을 줄일 수 있는 부분을 알려줘',
      });
      if (chatResponse === null) {
        setMessage([
          ...message,
          {
            user: false,
            message: `답변을 생각 중이에요. 잠시 후 다시 시도해주세요.`,
          },
        ]);
        return;
      }
      const saveCategory = chatResponse!.moneySavingAreas;
      setMessage([...message, { user: false, message: saveCategory }]);
    }
    setIsReturn(true);
    setSaving(false);
  };

  const handleClose = () => {
    setShowIcon(true);
    setSelectCategory(false);
    setRecommend(false);
    setSpend(false);
    setSaving(false);
    setIsReturn(false);
  };

  useEffect(() => {
    setMessage([]);
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
            onClick={handleClose}
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
          {/* 카테고리 선택 */}
          {selectCategory ? (
            <div className="flex flex-col justify-center gap-[5px]">
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleCategory('추천')}
              >
                추천
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleCategory('소비')}
              >
                소비
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleCategory('절약')}
              >
                절약
              </button>
            </div>
          ) : null}
          {/* 추천 메뉴 */}
          {recommend ? (
            <div className="flex flex-col justify-center gap-[5px]">
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleRandomRecommend('점메추')}
              >
                점심 메뉴를 추천해줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleRandomRecommend('저메추')}
              >
                저녁 메뉴를 추천해줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleRandomRecommend('착한가게')}
              >
                서울 내에서 갈만한 착한 가게 추천해줘
              </button>
            </div>
          ) : null}
          {spend ? (
            <div className="flex flex-col justify-center gap-[5px]">
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSpend('지출분석')}
              >
                지출이 제일 많은 분야 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSpend('과소비분석')}
              >
                내 수입보다 많이 지출한 분야 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSpend('평균이상지출')}
              >
                내가 다른 사람들보다 많이 지출한 분야를 알려줘
              </button>
            </div>
          ) : null}
          {saving ? (
            <div className="flex flex-col justify-center gap-[5px]">
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSaving('꿀팁')}
              >
                절약 꿀팁 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSaving('절약카테고리')}
              >
                내가 절약할 수 있을만한 카테고리 알려줘
              </button>
              <button
                className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
                onClick={() => handleSaving('지출감소')}
              >
                지출을 줄일 수 있는 부분을 알려줘
              </button>
            </div>
          ) : null}
          {isReturn ? (
            <button
              className={`h-[40px] w-[240px] items-center justify-center rounded-[10px] border-1 border-[var(--main-color-2)] px-[10px] text-[14px] transition-[width] placeholder:text-center focus-within:w-[290px] focus:border-[var(--main-color-3)] focus:outline-none focus:placeholder:opacity-0 dark:bg-[var(--background)] ${!showIcon ? 'w-[290px] border-[var(--main-color-3)]' : ''}`}
              onClick={() => handleCategory('돌아가기')}
            >
              다시 물어보기
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
