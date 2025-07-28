'use client';
import { useEffect, useState } from 'react';
import Threads from '@/components/profile/MyThreads';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import { getChallenge, getMyPage } from '@/api/profile';
import { Challenge, UserData } from '@/types/userType';

export default function MyProfilePage() {
  const [myData, setMyData] = useState<UserData | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 내 프로필 데이터 가져오기
        const myDataRes = await getMyPage();
        setMyData(myDataRes.data.data);

        // 챌린지 데이터 가져오기
        const challengeRes = await getChallenge();
        setChallenges(challengeRes.data.challenges);
      } catch (err) {
        console.error('데이터 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--main-color-3)]"></div>
          <p className="text-[var(--text-color)]">프로필을 불러오는 중...</p>
        </div>
      </div>
    );
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
            <Threads profileData={myData ?? undefined} />
          </div>
        </div>
      </div>
    </>
  );
}
