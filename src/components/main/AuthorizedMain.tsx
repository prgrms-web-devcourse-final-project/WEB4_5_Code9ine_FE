import { useEffect, useState } from 'react';
import Profile from '../profile/Profile';
import TitleSwiper from '../profile/TitleSwiper';
import Analysis from './Analysis';
import Mission from '@/components/profile/Mission';
import { getChallenge } from '@/services/mainService';
import { Challenge, UserData } from '@/types/userType';
import { getMyPage } from '@/api/profile';

export default function AuthorizedMain() {
  const [challengeList, setChallengeList] = useState<Challenge[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenge();
        setChallengeList(data);
      } catch (error) {
        console.error('챌린지 불러오기 실패:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const res = await getMyPage();
        setUserData(res.data.data);
      } catch (error) {
        console.error('유저 정보 가져오기 실패:', error);
      }
    };

    fetchChallenges();
    fetchUserData();
  }, []);

  return (
    <div className="mt-[15px] flex gap-[15px] md:mt-0">
      <div className="h-full w-full px-[2px] md:h-[870px] md:w-[756px] md:px-0">
        <Analysis nickname={userData?.nickname ?? ''} />
      </div>
      <div className="hidden md:flex md:flex-col md:gap-[20px]">
        <div className="h-[390px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
          <TitleSwiper />
          <Profile isPersonal={true} userData={userData} />
        </div>
        <div className="h-[460px] w-[350px] rounded-[10px] bg-[var(--white-color)] shadow-[var(--shadow-md)]">
          <Mission challengeList={challengeList} />
        </div>
      </div>
    </div>
  );
}
