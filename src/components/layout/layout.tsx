"use client";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showFooter = pathname === "/";

  return (
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
