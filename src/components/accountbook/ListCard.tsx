import CardMenu from './CardMenu';

export default function ListCard() {
  return (
    <>
      <div className="relative flex h-[95px] w-[315px] items-center justify-center gap-[10px] rounded-[10px] border-1 px-[10px] py-[22px]">
        <div className="size-[50px] rounded-full bg-[var(--main-color-1)]"></div>
        <div>
          <p className="text-[var(--main-color-3)]">식비</p>
          <p>냠냠 친구랑 김밥</p>
        </div>
        <span className="ml-[26px] text-[var(--point-color-1)]">-6000원</span>
        <div className="absolute right-[13px] bottom-[-13px]">
          <CardMenu />
        </div>
      </div>
    </>
  );
}
