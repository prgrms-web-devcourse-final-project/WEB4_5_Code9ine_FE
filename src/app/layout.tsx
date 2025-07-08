import type { Metadata } from "next";
import "./globals.css";
import Layout from "../components/layout/layout";

export const metadata: Metadata = {
  title: "티태",
  description: "티태",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
