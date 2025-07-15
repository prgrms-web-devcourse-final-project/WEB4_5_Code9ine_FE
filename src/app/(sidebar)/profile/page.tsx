import MyThreads from '@/components/profile/MyThreads';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
// import Modal from '@/components/common/Modal';
export default function page() {
  return (
    <>
      <div className="mt-[15px] flex flex-col items-center justify-center gap-[15px] overflow-x-hidden select-none md:mt-0 md:flex-row md:items-start">
        {/* 오른쪽 섹션 (Profile + Mission) */}
        <div className="flex w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center gap-[15px] md:order-2 md:w-[350px] md:gap-[20px]">
          <div className="h-[390px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <TitleSwiper />
            <Profile />
          </div>
          <div className="h-[460px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <Mission />
          </div>
        </div>

        {/* 왼쪽 섹션 (MyThreads) */}
        <div className="w-full max-w-[calc(100vw-32px)] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:order-1 md:h-[870px] md:w-[756px]">
          <div className="hide-scrollbar h-full overflow-y-auto">
            <MyThreads />
          </div>
        </div>
      </div>
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
    </>
  );
}
