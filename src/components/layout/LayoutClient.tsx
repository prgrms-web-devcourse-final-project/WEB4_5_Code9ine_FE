'use client';
import ColoredBox from './coloredBox';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-1 flex-col md:flex md:flex-row md:gap-[15px]">
        {/* 사이드바 */}
        <ColoredBox />
        <div>{children}</div>
      </div>
    </>
  );
}
