export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-[870px] w-[1121px]">{children}</div>
    </div>
  );
}
