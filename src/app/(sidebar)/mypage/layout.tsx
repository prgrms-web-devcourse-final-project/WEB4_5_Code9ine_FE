// import TitleSwiper from '@/components/profile/TitleSwiper';
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[15px]">
      <div className="h-[870px] w-[756px] rounded-[10px] bg-white shadow-md">
        {children}
      </div>
      <div className="flex flex-col gap-[21px]">
        <div className="h-[390px] w-[350px] rounded-[10px] bg-white shadow-md">
          {/* <TitleSwiper /> */}
        </div>
        <div className="h-[460px] w-[350px] rounded-[10px] bg-white shadow-md"></div>
      </div>
    </div>
  );
}
