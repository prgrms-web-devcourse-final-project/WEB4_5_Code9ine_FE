'use client';
import { useEffect, useState } from 'react';
// import Category from './Category';

import Calculator from './Calculator';
import Category from './Category';
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoRepeat } from 'react-icons/io5';
import '../../css/CustomDatePicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { API_ADD } from '@/api/api';
import { useAccountData } from '@/stores/accountStore';
import toast from 'react-hot-toast';

export default function AccountAdd({
  onDataChange,
}: {
  onDataChange: (arg0: boolean) => void;
}) {
  registerLocale('ko', ko);
  const [toolStatus, isToolStatus] = useState<string>('날짜');
  const [accountTag, setAccountTag] = useState<string>('지출');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [value, setValue] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string | null>(null);
  const [isAdd, setIsAdd] = useState<string>('추가');

  const { isAccount, setInsert, isId } = useAccountData();

  const handleCalculator = (value: string) => {
    setPrice(value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = e.target.value.replace(/[^0-9]/g, '');
    if (!/^\d+$/.test(priceValue) && priceValue !== '') {
      return;
    }
    const numberValue = Number(priceValue.replace(/[^0-9]/g, ''));
    setPrice(numberValue.toLocaleString('ko-KR'));
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTag = (tag: string) => {
    setAccountTag(tag);
    setValue('');
  };
  const handleCategory = (category: string) => {
    setValue(category);
  };

  const handleStatus = () => {
    const status = false;
    onDataChange(status);
    setInsert(false);
  };

  const handlePost = async () => {
    if (price === '' || content === null || value === '') {
      toast.error('내용을 기입해주세요');
      return;
    }
    if (isAdd === '추가') {
      try {
        const response = await fetch(API_ADD + `/api/budget/detail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: accountTag,
            date: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate()}`,
            category: value,
            price: Number(price),
            content: content,
            repeatCycle: 'NONE',
          }),
        });

        if (!response.ok) throw new Error('통신에 실패했습니다');

        const result = await response.json();
        console.log(result);
        toast.success('저장되었습니다');
        onDataChange(false);
        setInsert(false);
      } catch (error) {
        console.error(error);
        toast.error('문제가 발생했습니다');
      }
    } else if (isAdd === '수정') {
      try {
        const response = await fetch(API_ADD + `/api/budget/detail/${isId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: accountTag,
            date: `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate()}`,
            category: value,
            price: Number(price),
            content: content,
            repeatCycle: 'NONE',
          }),
        });

        if (!response.ok) throw new Error('통신에 실패했습니다');

        const result = await response.json();
        console.log(result);
        toast.success('수정되었습니다');
      } catch (error) {
        console.error(error);
        toast.error('문제가 발생했습니다');
      }
    }
  };

  useEffect(() => {
    setIsAdd(isAccount);
  }, [isAccount]);
  return (
    <>
      <div className="relative mx-[5px] flex w-[97.7vw] flex-col items-center rounded-[10px] bg-[var(--white-color)] py-[30px] md:h-[870px] md:w-full">
        {isAdd === '추가' ? (
          <span className="font-bold text-[var(--text-color)]">
            가계부 입력
          </span>
        ) : (
          <span className="font-bold text-[var(--text-color)]">
            가계부 수정
          </span>
        )}
        <div className="mt-[30px] flex gap-[5px]">
          <button
            className={`h-[35px] w-[45px] cursor-pointer rounded-[5px] text-[#000000] active:bg-[var(--main-color-2)] ${accountTag === '지출' ? 'bg-[var(--main-color-2)]' : 'bg-[var(--main-color-1)]'}`}
            onClick={() => {
              handleTag('지출');
            }}
          >
            지출
          </button>
          <button
            className={`h-[35px] w-[45px] cursor-pointer rounded-[5px] text-[#000000] active:bg-[var(--main-color-2)] ${accountTag === '수입' ? 'bg-[var(--main-color-2)]' : 'bg-[var(--main-color-1)]'}`}
            onClick={() => {
              handleTag('수입');
            }}
          >
            수입
          </button>
          <button className="ml-[74px] h-[35px] w-[120px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] text-[#000000] active:bg-[var(--main-color-2)]">
            영수증 첨부하기
          </button>
        </div>
        <div className="mt-[45px] flex flex-col gap-[34px]">
          <label className="flex items-center justify-center gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">날짜</span>
            <DatePicker
              locale="ko"
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="yyyy년 MM월 dd일"
              className="text-center"
              onFocus={() => isToolStatus('날짜')}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex items-center justify-center">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type="button"
                    className="mr-[20px]"
                  >
                    {'<'}
                  </button>

                  <div className="text-center">
                    <div className="text-[12px] font-bold">
                      {date.getFullYear()}년
                    </div>
                    <div className="text-[16px] font-bold text-[var(--main-color-3)]">
                      {date.getMonth() + 1}월
                    </div>
                  </div>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type="button"
                    className="ml-[20px]"
                  >
                    {'>'}
                  </button>
                </div>
              )}
            />
            <button className="mb-[5px] flex size-[20px] cursor-pointer items-center justify-center rounded-[5px] bg-[var(--gray-color-1)] text-[#000000]">
              <IoRepeat />
            </button>
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">금액</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
              onFocus={() => isToolStatus('금액')}
              onChange={handlePrice}
              value={price!}
            />
            <span className="ml-[3px]">원</span>
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">카테고리</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
              onFocus={() => isToolStatus('카테고리')}
              value={value}
              readOnly
            />
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">내용</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
              onFocus={() => isToolStatus('내용')}
              onChange={handleContent}
            />
          </label>
        </div>
        {toolStatus === '카테고리' ? (
          <Category accountTag={accountTag} handleTag={handleCategory} />
        ) : null}
        {toolStatus === '금액' ? (
          <Calculator calcValue={handleCalculator} />
        ) : null}
        <div className="absolute bottom-[25px] flex gap-[25px] md:bottom-[60px] md:left-[70px] md:gap-[10px]">
          <button
            className="h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] text-[#000000]"
            type="submit"
            onClick={handlePost}
          >
            확인
          </button>
          <button
            className="h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--gray-color-1)] text-black"
            onClick={handleStatus}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
