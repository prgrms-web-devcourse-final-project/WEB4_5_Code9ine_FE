import ColoredBox from '@/components/layout/coloredBox';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="rounded-[10px] shadow-md">
        {/* 사이드바 */}
        <ColoredBox />
      </div>
      <div>{children}</div>
    </>
  );
}
