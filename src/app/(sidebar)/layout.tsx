'use client';

import SideBar from '../../components/common/SideBar';

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* 메인 컨테이너를 flex로 지정해 내부를 가로 배치 */}
      <main className="flex h-[900px] w-[1366px] gap-[15px] rounded-[10px] bg-[var(--background)] p-[15px]">
        {/* 사이드바 */}
        <SideBar />

        {/* 콘텐츠 영역 */}
        <div className="h-[870px] w-[756px] rounded-[10px] bg-white">
          {children}
        </div>
        <div className="flex flex-col gap-[21px]">
          <div className="h-[390px] w-[350px] rounded-[10px] bg-white"></div>
          <div className="h-[460px] w-[350px] rounded-[10px] bg-white"></div>
        </div>
      </main>
    </div>
  );
}
