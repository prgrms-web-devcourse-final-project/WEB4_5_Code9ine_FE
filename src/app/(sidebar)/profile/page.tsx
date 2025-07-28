import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import Threads from '@/components/profile/MyThreads';
import { getChallenge, getMyPage } from '@/api/profile';
import { Challenge } from '@/types/userType';
import { cookies } from 'next/headers';

export default async function page() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  let myData = null;
  let challenges: Challenge[] = [];

  try {
    // 내 프로필 데이터 가져오기
    const myDataRes = await getMyPage();
    myData = myDataRes.data.data;

    // 챌린지 데이터 가져오기
    const challengeRes = await getChallenge(accessToken!);
    challenges = challengeRes.data.challenges;
    console.log('My data:', myData);
    console.log('Challenges:', challenges);
  } catch (err) {
    console.log('데이터 조회 실패', err);
  }

  return (
    <>
      <div className="mt-[15px] flex flex-col items-center justify-center gap-[15px] overflow-x-hidden select-none md:mt-0 md:flex-row md:items-start">
        <div className="flex w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center gap-[15px] md:order-2 md:w-[350px] md:gap-[20px]">
          <div className="h-[390px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <TitleSwiper profileData={myData ?? undefined} />
            <Profile profileData={myData ?? undefined} />
          </div>
          <div className="h-[460px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <Mission challengeList={challenges} />
          </div>
        </div>

        <div className="w-full max-w-[calc(100vw-32px)] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:order-1 md:h-[870px] md:w-[756px]">
          <div className="hide-scrollbar h-full overflow-y-auto">
            <Threads profileData={myData} />
          </div>
        </div>
      </div>
    </>
  );
}
