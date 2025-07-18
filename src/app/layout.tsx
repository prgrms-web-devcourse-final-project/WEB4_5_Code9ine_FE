import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: '티태 | 티끌모아 부자되기',
  description: '티태',
  icons: {
    icon: '/Logo.png',
  },
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
        <main className="h-dvh w-[1366px] gap-[15px] rounded-[10px] bg-[var(--background)] md:flex md:h-auto md:p-[15px]">
          {/* 사이드바 */}
          {/* <ColoredBox /> */}
          {/* 콘텐츠 영역 */}
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'rounded-lg shadow-lg',
              style: {
                padding: '1rem 1.25rem',
                color: 'var(--white-color)',
                fontWeight: 500,
              },

              success: {
                style: {
                  background: 'var(--main-color-3)',
                },
                iconTheme: {
                  primary: 'var(--white-color)',
                  secondary: 'var(--main-color-3)',
                },
              },

              error: {
                style: {
                  background: 'var(--point-color-2)',
                },
                iconTheme: {
                  primary: 'var(--white-color)',
                  secondary: 'var(--point-color-2)',
                },
              },
            }}
          />
        </main>
      </body>
    </html>
  );
}
