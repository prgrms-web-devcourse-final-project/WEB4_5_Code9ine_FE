'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import Threads from '@/components/profile/MyThreads';
import { getChallenge, getUserProfile, getMyPage } from '@/api/profile';
import { Challenge, UserData } from '@/types/userType';

export default function ProfilePage() {
  const params = useParams();
  const memberId = params?.memberId as string;

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [myData, setMyData] = useState<UserData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 내 프로필인지 판단
  const isMyProfile =
    !memberId || (myData && String(myData.memberId) === String(memberId));
  const profileData = isMyProfile ? myData : userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 챌린지 데이터 가져오기
        const challengeRes = await getChallenge();
        setChallenges(challengeRes.data.challenges);

        // 내 정보 가져오기 (memberId와 비교하기 위해)
        const myDataRes = await getMyPage();
        setMyData(myDataRes.data.data);

        // 다른 유저 데이터 가져오기
        if (memberId) {
          const currentIsMyProfile =
            String(myDataRes.data.data.memberId) === String(memberId);

          if (!currentIsMyProfile) {
            const userDataRes = await getUserProfile(memberId);
            setUserData(userDataRes.data?.data);
          }
        }
      } catch (err) {
        console.error('데이터 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId]);

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
            <TitleSwiper
              profileData={profileData ?? undefined}
              memberId={memberId}
            />
            <Profile
              profileData={profileData ?? undefined}
              memberId={memberId}
            />
          </div>
          <div className="h-[460px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <Mission challengeList={challenges} />
          </div>
        </div>

        <div className="w-full max-w-[calc(100vw-32px)] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:order-1 md:h-[870px] md:w-[756px]">
          <div className="hide-scrollbar h-full overflow-y-auto">
            <Threads
              profileData={profileData ?? undefined}
              memberId={memberId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
