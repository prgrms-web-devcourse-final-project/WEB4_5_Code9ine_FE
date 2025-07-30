'use client';
import { useEffect, useRef, useState } from 'react';
import Calculator from './Calculator';
import Category from './Category';
import DatePicker, { registerLocale } from 'react-datepicker';
import '../../css/CustomDatePicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import {
  API_ADD,
  patchAccount,
  postAccount,
  setData,
  setMonthData,
} from '@/api/accountApi';
import { useAccountData } from '@/stores/accountStore';
import toast from 'react-hot-toast';
import { SlCalculator } from 'react-icons/sl';
import imageCompression from 'browser-image-compression';
import { Receipt } from '@/types/payData';

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
  const [content, setContent] = useState<string>('');
  const [isAdd, setIsAdd] = useState<string>('추가');
  const [isCalculator, setIsCalculator] = useState<boolean>(false);
  const [rewriteDate, setRewriteDate] = useState<Date>();
  const [receiptResponse, setReceiptResponse] = useState<Receipt>();
  const [receiptDate, setReceiptDate] = useState<Date>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const receiptUploadRef = useRef<HTMLInputElement>(null);

  const {
    isAccount,
    setInsert,
    isId,
    calcString,
    setCalcString,
    setTotaldata,
    rewriteData,
    setCalendarData,
  } = useAccountData();

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
    try {
      setIsUploading(false);
      const today = new Date();
      const month = today.getMonth() + 1;

      if (isAdd === '추가') {
        postAccount(accountTag, startDate, value, price, content);
        onDataChange(false);
        setInsert(false);
        const totalData = await setData(0);
        setTotaldata(totalData);
        const monthlyCalendarData = await setMonthData(today, month);
        setCalendarData(await monthlyCalendarData.json());
      } else if (isAdd === '수정') {
        patchAccount(accountTag, rewriteDate!, value, price, content, isId!);
        onDataChange(false);
        setInsert(false);
        const totalData = await setData(0);
        setTotaldata(totalData);
        const monthlyCalendarData = await setMonthData(today, month);
        setCalendarData(await monthlyCalendarData.json());
      }
    } catch (e) {
      console.error(e);
      toast.error('문제가 발생했어요');
    } finally {
      setIsUploading(false);
      if (isAdd === '추가') toast.success('추가되었어요');
      else if (isAdd === '수정') toast.success('수정되었어요');
    }
  };

  const onCickImageUpload = () => {
    receiptUploadRef.current?.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 1, // 최대 1MB로 압축
        maxWidthOrHeight: 1920, // 최대 너비 또는 높이
        useWebWorker: true, // 웹 워커 사용 여부
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // 압축된 이미지 파일 처리 로직 (서버 업로드 등)
        const formData = new FormData();
        formData.append('file', compressedFile, imageFile.name);

        try {
          const receiptResponse = await (
            await fetch(`${API_ADD}/api/budget/receipt`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                accept: 'application/json',
              },
              body: formData,
            })
          ).json();
          setReceiptResponse(receiptResponse);
        } catch (e) {
          console.error('에러가 발생했습니다: ', e);
          if (
            receiptResponse === undefined ||
            receiptResponse.message ===
              '오늘의 OCR 사용 가능 횟수를 초과했어요.'
          )
            toast.error('오늘 사용 가능한 횟수를 초과했어요');
        }
      } catch (error) {
        console.error('에러: ', error);
        toast.error('문제가 발생했어요');
      }
    }
  };

  useEffect(() => {
    if (isAdd === '수정') {
      setValue(rewriteData!.category);
      setPrice(rewriteData!.price.toLocaleString('ko-KR'));
      setContent(rewriteData!.content);
      setAccountTag(rewriteData!.type);
    }
  }, [isAdd, rewriteData]);

  useEffect(() => {
    setCalcString('');
    const date = rewriteData?.date;

    const dateArr = date?.split('-');

    if (dateArr !== undefined) {
      const newDate = new Date(
        Number(dateArr[0]),
        Number(dateArr[1]) - 1,
        Number(dateArr[2]),
      );
      setRewriteDate(newDate);
    }

    const receiptDate = receiptResponse?.data.date;
    const receiptDateArr = receiptDate?.split('-');
    if (receiptDateArr !== undefined) {
      const newReceiptDate = new Date(
        Number(receiptDateArr[0]),
        Number(receiptDateArr[1]) - 1,
        Number(receiptDateArr[2]),
      );
      setReceiptDate(newReceiptDate);
    }
  }, []);

  useEffect(() => {
    setIsAdd(isAccount);
    if (calcString !== null && calcString?.length > 0) setPrice(calcString);

    if (receiptResponse !== undefined && receiptResponse.data !== null) {
      setPrice(receiptResponse.data.totalprice.toString());
      setContent(receiptResponse.data.storeName);
    }
  }, [isAccount, calcString, receiptResponse]);

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
          <label htmlFor="upload">
            <button
              className="ml-[74px] h-[35px] w-[120px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] text-[#000000] active:bg-[var(--main-color-2)]"
              onClick={onCickImageUpload}
            >
              영수증 첨부하기
            </button>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            accept="image/*"
            ref={receiptUploadRef}
            onChange={handleImageUpload}
          />
        </div>
        <div className="mt-[45px] flex flex-col gap-[34px]">
          {isAdd === '추가' ? (
            <label className="flex items-center justify-center gap-[10px] border-b-1 border-[var(--main-color-3)]">
              <span className="w-[55px]">날짜</span>
              <DatePicker
                locale="ko"
                selected={
                  receiptResponse !== undefined &&
                  receiptResponse.data !== null &&
                  receiptResponse.data.date !== null
                    ? receiptDate
                    : startDate
                }
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
              <div className="mb-[5px] flex size-[20px] items-center justify-center rounded-[5px]"></div>
            </label>
          ) : (
            <label className="flex items-center justify-center gap-[10px] border-b-1 border-[var(--main-color-3)]">
              <span className="w-[55px]">날짜</span>
              <DatePicker
                locale="ko"
                selected={rewriteDate}
                onChange={(date) => setStartDate(date!)}
                dateFormat="yyyy년 MM월 dd일"
                className="text-center text-[var(--gray-color-2)]"
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
                readOnly
              />
              <div className="mb-[5px] flex size-[20px] cursor-pointer items-center justify-center rounded-[5px]"></div>
            </label>
          )}
          <label className="flex gap-[8px] border-b-1 border-[var(--main-color-3)]">
            <span>금액</span>
            {!isCalculator ? (
              <input
                type="text"
                className="items-center justify-center text-center focus:outline-none"
                onFocus={() => isToolStatus('금액')}
                onChange={handlePrice}
                defaultValue={isAdd === '추가' ? price! : rewriteData?.price}
              />
            ) : (
              <input
                type="text"
                className="items-center justify-center text-center focus:outline-none"
                readOnly
                value={calcString ?? ''}
                onChange={handlePrice}
                onFocus={() => isToolStatus('금액')}
              />
            )}
            {toolStatus === '금액' ? (
              <button
                className="cursor-pointer rounded-[5px] bg-[var(--gray-color-1)] px-[5px] text-black"
                onClick={() => setIsCalculator(!isCalculator)}
              >
                <SlCalculator />
              </button>
            ) : (
              <div className="w-[26px]"></div>
            )}
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
              defaultValue={
                isAdd === '추가' ? content : (rewriteData?.content ?? '')
              }
            />
          </label>
        </div>
        {toolStatus === '카테고리' ? (
          <Category accountTag={accountTag} handleTag={handleCategory} />
        ) : null}
        {isCalculator && toolStatus === '금액' ? <Calculator /> : null}
        <div className="absolute bottom-[25px] flex gap-[25px] md:bottom-[60px] md:left-[70px] md:gap-[10px]">
          {!isUploading ? (
            <button
              className={`h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] text-[#000000]`}
              type="submit"
              onClick={handlePost}
            >
              확인
            </button>
          ) : (
            <button
              className={`h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] text-[#000000] ${isUploading ? 'bg-[var(--gray-color-2)]' : ''}`}
              type="submit"
              onClick={handlePost}
              disabled
            >
              확인
            </button>
          )}
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
