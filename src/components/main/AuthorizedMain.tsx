import Profile from '../profile/Profile';
import TitleSwiper from '../profile/TitleSwiper';
import Analysis from './Analysis';
import Mission from '@/components/profile/Mission';

export default function AuthorizedMain() {
  return (
    <div className="mt-[15px] flex gap-[15px] md:mt-0">
      <div className="h-full w-full px-[2px] md:h-[870px] md:w-[756px] md:px-0">
        <Analysis />
      </div>
      <div className="hidden md:flex md:flex-col md:gap-[20px]">
        <div className="h-[390px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
          <TitleSwiper />
          <Profile isPersonal={true} />
        </div>
        <div className="h-[460px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
          <Mission />
        </div>
      </div>
    </div>
  );
}
