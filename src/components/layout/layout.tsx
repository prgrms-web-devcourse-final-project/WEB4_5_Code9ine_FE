// 'use client';

// import Header from './header';
// import Footer from './footer';
// import { usePathname } from 'next/navigation';

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const hideHeaderFooterRoutes = ['/login', '/404']; // 숨길 경로들
//   const shouldHide = hideHeaderFooterRoutes.includes(pathname);

//   return (
//     <>
//       {!shouldHide && <Header />}
//       <main>{children}</main>
//       {!shouldHide && pathname === '/' && <Footer />}
//     </>
//   );
// }
