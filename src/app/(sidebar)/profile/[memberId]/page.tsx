import UserThreads from '@/components/profile/UserThreads';
import UserTitleSwiper from '@/components/profile/UserTitleSwiper';
import UserProfile from '@/components/profile/UserProfile';
import Mission from '@/components/profile/Mission';
import { getChallenge } from '@/api/profile';
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
  // console.log(accessToken);
  // console.log('Profile page - memberId:', memberId);

  let challenges: Challenge[] = [];
  try {
    const res = await getChallenge(accessToken!);
    challenges = res.data.challenges;
    // console.log(challenges);
  } catch (err) {
    console.log('챌린지 목록 조회 실패', err);
  }

  return (
    <>
      <div className="mt-[15px] flex flex-col items-center justify-center gap-[15px] overflow-x-hidden select-none md:mt-0 md:flex-row md:items-start">
        <div className="flex w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center gap-[15px] md:order-2 md:w-[350px] md:gap-[20px]">
          <div className="h-[390px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <UserTitleSwiper memberId={memberId} />
            <UserProfile memberId={memberId} />
          </div>
          <div className="h-[460px] w-full rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
            <Mission challengeList={challenges} />
          </div>
        </div>

        <div className="w-full max-w-[calc(100vw-32px)] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)] md:order-1 md:h-[870px] md:w-[756px]">
          <div className="hide-scrollbar h-full overflow-y-auto">
            <UserThreads memberId={memberId} />
          </div>
        </div>
      </div>
    </>
  );
}
