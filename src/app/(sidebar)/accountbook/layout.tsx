import AccountAdd from '@/components/accountbook/AccountAdd';
// import AiChat from '@/components/accountbook/AiChat';
// import ListArea from '@/components/accountbook/ListArea';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[15px]">
      {children}
      <div className="flex flex-col">
        <div className="flex h-full w-[350px] flex-col rounded-[10px] bg-white shadow-md">
          <AccountAdd />
          {/* <ListArea /> */}
        </div>
        {/* <AiChat /> */}
      </div>
    </div>
  );
}
