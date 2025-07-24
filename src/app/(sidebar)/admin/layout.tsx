export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex max-h-full min-h-[702px] min-w-[360px] flex-1 flex-col gap-[15px] overflow-hidden py-[15px] md:h-[870px] md:w-[1121px] md:p-0">
        {children}
      </div>
    </div>
  );
}
