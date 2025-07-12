import type { Metadata } from 'next';
import './globals.css';

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
      <body className="flex min-h-screen bg-[var(--background-full)] md:items-center md:justify-center">
        {/* 메인 컨테이너를 flex로 지정해 내부를 가로 배치 */}
        <main className="h-full w-[1366px] gap-[15px] rounded-[10px] bg-[var(--background)] md:flex md:h-[900px] md:p-[15px]">
          {/* 사이드바 */}
          {/* <ColoredBox /> */}
          {/* 콘텐츠 영역 */}
          {children}
        </main>
      </body>
    </html>
  );
}
