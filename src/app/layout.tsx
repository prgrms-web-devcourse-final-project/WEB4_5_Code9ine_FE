import type { Metadata } from 'next';
import './globals.css';
import ColoredBox from '@/components/layout/coloredBox';

export const metadata: Metadata = {
  title: '티태',
  description: '티태',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen items-center justify-center">
          {/* 메인 컨테이너를 flex로 지정해 내부를 가로 배치 */}
          <main className="flex h-[900px] w-[1366px] gap-[15px] rounded-[10px] bg-[var(--background)] p-[15px]">
            {/* 사이드바 */}
            <ColoredBox />
            {/* 콘텐츠 영역 */}
            {children}
          </main>
      </body>
    </html>
  );
}
