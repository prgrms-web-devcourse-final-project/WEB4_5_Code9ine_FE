import Category from './Category';

export default function AccountAdd() {
  return (
    <>
      <div className="p-[30px]">
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
          <input
            type="text"
            className="w-[290px] border-b-1 border-[var(--main-color-3)]"
          />
          <input
            type="text"
            className="w-[290px] border-b-1 border-[var(--main-color-3)]"
          />
          <input
            type="text"
            className="w-[290px] border-b-1 border-[var(--main-color-3)]"
          />
          <input
            type="text"
            className="w-[290px] border-b-1 border-[var(--main-color-3)]"
          />
        </div>
        <div className="mt-[40px] grid size-[300px] grid-cols-3 gap-x-[10px] gap-y-[20px] rounded-[10px] px-[20px] py-[40px] shadow-md">
          <Category />
        </div>
        <div className="mx-[70px] mt-[58px] flex gap-[10px]">
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
