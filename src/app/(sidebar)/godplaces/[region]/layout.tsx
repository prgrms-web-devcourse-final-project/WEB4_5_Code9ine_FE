export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[15px]">
      <div className="h-[870px] w-[756px] rounded-[10px] bg-white shadow-md">
        {children}
      </div>
      <div className="flex h-[870px] w-[350px] flex-col rounded-[10px] bg-white shadow-md"></div>
    </div>
  );
}
