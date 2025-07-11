export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-[702px] w-[360px] md:h-[870px] md:w-[1121px]">
        {children}
      </div>
    </div>
  );
}
