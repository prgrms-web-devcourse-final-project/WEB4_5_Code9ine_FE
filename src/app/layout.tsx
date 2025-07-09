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
      <body className="flex min-h-screen items-center justify-center">
        <main className="">{children}</main>
      </body>
    </html>
  );
}
