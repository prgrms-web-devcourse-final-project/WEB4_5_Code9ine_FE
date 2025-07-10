import MyThreads from '@/components/profile/MyThreads';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Challenge from '@/components/profile/Challenge';
export default function page() {
  return (
    <>
      <div className="flex gap-[10px]">
        <div className="h-[870px] w-[756px] rounded-[10px] bg-[var(--white-color)] shadow-md">
          <MyThreads />
        </div>
        <div className="flex flex-col gap-[21px]">
          <div className="h-[390px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md">
            <TitleSwiper />
            <Profile />
          </div>
          <div className="h-[460px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md">
            <Challenge />
          </div>
        </div>
      </div>
    </>
  );
}
