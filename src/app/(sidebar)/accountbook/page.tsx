import AiChat from '@/components/accountbook/AiChat';
import Calander from '@/components/accountbook/Calander';
import ListArea from '@/components/accountbook/ListArea';

export default function page() {
  return (
    <>
      <div className="flex gap-[15px]">
        <div className="flex flex-col">
          <div className="mx-[13px] my-[30px]">
            <span>7월 9일까지의 총수입은 </span>
            <span className="mt-[10px] text-[var(--main-color-3)]">
              300,000
            </span>
            <span>원이에요</span>
            <br />
            <span>7월 9일까지의 총지출은 </span>
            <span className="text-[var(--point-color-1)]">30,000</span>
            <span>원이에요</span>
          </div>
          <Calander />
        </div>
        <div className="flex flex-col">
          <div className="flex h-full w-[350px] flex-col rounded-[10px] bg-[var(--white-color)] shadow-md">
            {/* <AccountAdd /> */}
            <ListArea />
          </div>
          <AiChat />
        </div>
      </div>
    </>
  );
}
