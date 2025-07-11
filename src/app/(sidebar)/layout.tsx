import ColoredBox from '@/components/layout/coloredBox';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:flex md:gap-[15px]">
        {/* 사이드바 */}
        <ColoredBox />
        <div>{children}</div>
      </div>
    </>
  );
}
