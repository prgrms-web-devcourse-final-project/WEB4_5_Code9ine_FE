import MyThreads from '@/components/profile/MyThreads';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import { getChallenge } from '@/api/profile';
import { Challenge } from '@/types/userType';
import { cookies } from 'next/headers';

export default async function page() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  console.log(accessToken);
  let challenges: Challenge[] = [];
  try {
    const res = await getChallenge(accessToken!);
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL2}/api/members/mypage/challenges/dashboard`,
    //   {
    //     method: 'GET',
    //     // credentials: 'include',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );
    // if (!res.ok) {
    //   console.error('fetch 실패:', res.status);
    //   throw new Error(`error!: ${res.status}`);
    // }

    // const data = await res.json();
    challenges = res.data.challenges;
    console.log(challenges);
  } catch (err) {
    console.log('챌린지 목록 조회 실패', err);
  }
  return (
    <>
      <div className="mt-[15px] flex flex-col items-center justify-center gap-[15px] overflow-x-hidden select-none md:mt-0 md:flex-row md:items-start">
        <div className="flex w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center gap-[15px] md:order-2 md:w-[350px] md:gap-[20px]">
          <div className="h-[390px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <TitleSwiper />
            <Profile />
          </div>
          <div className="h-[460px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <Mission challengeList={challenges} />
          </div>
        </div>

        <div className="w-full max-w-[calc(100vw-32px)] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:order-1 md:h-[870px] md:w-[756px]">
          <div className="hide-scrollbar h-full overflow-y-auto">
            <MyThreads />
          </div>
        </div>
      </div>
    </>
  );
}
