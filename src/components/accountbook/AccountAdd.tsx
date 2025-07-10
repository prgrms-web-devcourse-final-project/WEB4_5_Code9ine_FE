// import Category from './Category';

import Calculator from './Calculator';

export default function AccountAdd() {
  return (
    <>
      <div className="relative flex h-full flex-col items-center py-[30px]">
        <span className="font-bold">가계부 입력</span>
        <div className="mt-[30px] flex gap-[5px]">
          <button className="h-[35px] w-[45px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] active:bg-[var(--main-color-2)]">
            지출
          </button>
          <button className="h-[35px] w-[45px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] active:bg-[var(--main-color-2)]">
            수입
          </button>
          <button className="ml-[74px] h-[35px] w-[120px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)] active:bg-[var(--main-color-2)]">
            영수증 첨부하기
          </button>
        </div>
        <div className="mt-[45px] flex flex-col gap-[34px]">
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">날짜</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
            />
            <button className="size-[30px] cursor-pointer border-1">리</button>
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">금액</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
            />
            <span className="ml-[3px]">원</span>
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">카테고리</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
            />
          </label>
          <label className="flex gap-[10px] border-b-1 border-[var(--main-color-3)]">
            <span className="w-[55px]">내용</span>
            <input
              type="text"
              className="items-center justify-center text-center focus:outline-none"
            />
          </label>
        </div>
        {/* <Category /> */}
        <Calculator />
        <div className="absolute bottom-[60px] left-[70px] flex gap-[10px]">
          <button className="h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--main-color-1)]">
            확인
          </button>
          <button className="h-[40px] w-[100px] cursor-pointer rounded-[5px] bg-[var(--gray-color-1)]">
            취소
          </button>
        </div>
      </div>
    </>
  );
}
