import MyThreads from '@/components/profile/MyThreads';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import Modal from '@/components/common/Modal';

export default function page() {
  return (
    <>
      <div className="flex gap-[10px]">
        <div className="h-[870px] w-[756px] rounded-[10px] bg-[var(--white-color)] shadow-md">
          <MyThreads />
          {/* <Modal
            title="로그인 후 이용 가능해요!"
            buttons={
              <>
                <div className="mt-[10px] flex flex-col items-center justify-center gap-[10px]">
                  <button className="h-[35px] w-[160px] rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-3)]">
                    로그인 하러가기
                  </button>
                  <button className="h-[35px] w-[160px] rounded-[10px] bg-[var(--point-color-1)] hover:bg-[var(--point-color-2)]">
                    취소
                  </button>
                </div>
              </>
            }
          /> */}
        </div>
        <div className="flex flex-col gap-[21px]">
          <div className="h-[390px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md">
            <TitleSwiper />
            <Profile />
          </div>
          <div className="h-[460px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-md">
            <Mission />
          </div>
        </div>
      </div>
    </>
  );
}
