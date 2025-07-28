import TitleSwiper from '@/components/profile/TitleSwiper';
import Profile from '@/components/profile/Profile';
import Mission from '@/components/profile/Mission';
import Threads from '@/components/profile/MyThreads';
import { getChallenge, getUserProfile, getMyPage } from '@/api/profile';
import { Challenge } from '@/types/userType';
import { cookies } from 'next/headers';

interface ProfilePageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export default async function page({ params }: ProfilePageProps) {
  const { memberId } = await params;

  const accessToken = (await cookies()).get('accessToken')?.value;
  console.log(accessToken);
  console.log('Profile page - memberId:', memberId);

  // 챌린지 데이터 가져오기
  let challenges: Challenge[] = [];
  try {
    const res = await getChallenge(accessToken!);
    challenges = res.data.challenges;
    console.log(challenges);
  } catch (err) {
    console.log('챌린지 목록 조회 실패', err);
  }

  // 내 정보 가져오기 (memberId와 비교하기 위해)
  let myData = null;
  try {
    const res = await getMyPage();
    myData = res.data.data;
  } catch (err) {
    console.log('내 정보 조회 실패', err);
  }

  // 내 프로필인지 판단
  const isMyProfile =
    !memberId || (myData && String(myData.memberId) === String(memberId));

  // 유저 데이터 가져오기 (다른 유저일 때만)
  let userData = null;
  if (!isMyProfile && memberId) {
    try {
      const res = await getUserProfile(memberId);
      userData = res.data?.data;
      console.log('Other user profile:', userData);
    } catch (err) {
      console.error('다른 유저 프로필 조회 실패:', err);
    }
  }

  const profileData = isMyProfile ? myData : userData;

  return (
    <>
      <div className="mt-[15px] flex flex-col items-center justify-center gap-[15px] overflow-x-hidden select-none md:mt-0 md:flex-row md:items-start">
        <div className="flex w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center gap-[15px] md:order-2 md:w-[350px] md:gap-[20px]">
          <div className="h-[390px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <TitleSwiper profileData={profileData} isMyProfile={isMyProfile} />
            <Profile
              profileData={profileData}
              isMyProfile={isMyProfile}
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
              profileData={profileData}
              isMyProfile={isMyProfile}
              memberId={memberId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
