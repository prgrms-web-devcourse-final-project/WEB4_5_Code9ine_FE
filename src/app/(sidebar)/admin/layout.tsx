export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex-1 flex flex-col min-h-[702px] py-[15px] min-w-[360px] overflow-hidden md:flex md:h-[870px] md:w-[1121px] md:flex-col max-h-full md:p-0">
        {children}
      </div>
    </div>
  );
}