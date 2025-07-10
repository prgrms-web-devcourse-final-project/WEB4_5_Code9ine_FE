import ListCard from './ListCard';

export default function ListArea() {
  return (
    <>
      <span className="mt-[65px] ml-[24px] text-[24px] font-semibold">
        내역
      </span>
      <div className="mx-[17px] mt-[45px] flex flex-col gap-[15px]">
        <div className="border-b-1">
          <p>25.07.01</p>
        </div>
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
      </div>
    </>
  );
}
