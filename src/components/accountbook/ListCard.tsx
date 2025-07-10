import CardMenu from './CardMenu';

export default function ListCard() {
  return (
    <>
      <div className="group relative flex h-[95px] w-[315px] items-center justify-center gap-[10px] rounded-[10px] bg-[var(--white-color)] px-[10px] py-[22px] shadow-md">
        <div className="size-[50px] rounded-full bg-[var(--main-color-1)]"></div>
        <div>
          <p className="text-[var(--main-color-3)]">식비</p>
          <p>냠냠 친구랑 김밥</p>
        </div>
        <span className="ml-[26px] text-[var(--point-color-1)]">-6000원</span>
        <div className="absolute top-[80px] right-[13px] hidden group-hover:flex">
          <CardMenu />
        </div>
      </div>
    </>
  );
}
