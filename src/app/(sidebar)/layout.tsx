import ColoredBox from '@/components/layout/coloredBox';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        {/* 사이드바 */}
        <ColoredBox />
      <div>{children}</div>
    </>
  );
}
