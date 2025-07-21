export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex-1 flex flex-col gap-[15px] min-h-[702px] py-[15px] min-w-[360px] overflow-hidden md:h-[870px] md:w-[1121px] max-h-full md:p-0">
        {children}
      </div>
    </div>
  );
}