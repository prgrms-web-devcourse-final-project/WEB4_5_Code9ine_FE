'use client';
import styles from '../../css/TitleSwiper.module.css';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { getMyPage, getUserProfile } from '@/api/profile';
import { iconMap } from '@/data/iconMap';
import { MyTitle } from '@/types/userType';
import TitleSwiperSkeleton from './TitleSwiperSkeleton';

interface MappedTitle extends MyTitle {
  iconImage?: StaticImageData;
}

interface TitleSwiperProps {
  profileData?: { achievedTitles?: MyTitle[] };
  memberId?: string;
}

export default function TitleSwiper({
  profileData,
  memberId,
}: TitleSwiperProps) {
  const [achievedChallenge, setAchievedChallenge] = useState<MappedTitle[]>([]);
  const [loading, setLoading] = useState(!profileData);
  interface MyDataType {
    memberId: number;
  }
  const [myData, setMyData] = useState<MyDataType | null>(null);

  // 내 정보 가져오기
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await getMyPage();
        setMyData(res.data.data);
      } catch (err) {
        console.log('내 정보 조회 실패', err);
      }
    };
    fetchMyData();
  }, []);

  // 내 프로필인지 판단
  const isMyProfile = Boolean(
    !memberId || (myData && String(myData.memberId) === String(memberId)),
  );

  useEffect(() => {
    const fetchTitles = async () => {
      if (profileData) {
        try {
          const achievedTitles = profileData.achievedTitles || [];
          const mapped = achievedTitles.map((item: MyTitle) => ({
            ...item,
            iconImage: iconMap[item.icon as keyof typeof iconMap] ?? undefined,
          }));
          setAchievedChallenge(mapped);
          setLoading(false);
        } catch (err) {
          console.log('프로필 데이터 처리 에러', err);
          setLoading(false);
        }
      } else {
        try {
          setLoading(true);

          let res;
          if (isMyProfile) {
            res = await getMyPage();
          } else if (memberId) {
            res = await getUserProfile(memberId);
          } else {
            throw new Error('필요한 데이터가 없습니다.');
          }

          const achievedTitles = res.data.data.achievedTitles || [];
          const mapped = achievedTitles.map((item: MyTitle) => ({
            ...item,
            iconImage: iconMap[item.icon as keyof typeof iconMap] ?? undefined,
          }));

          setAchievedChallenge(mapped);
        } catch (err) {
          console.log('획득한 칭호 에러', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTitles();
  }, [profileData, memberId, isMyProfile]);

  // 칭호 개수에 따른 애니메이션 속도 계산
  const getAnimationDuration = () => {
    if (achievedChallenge.length === 0) return '90s';
    if (achievedChallenge.length <= 3) return '15s';
    if (achievedChallenge.length <= 6) return '25s';
    return '35s'; // 많은 칭호
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={styles.container}>
        <TitleSwiperSkeleton />
      </div>
    );
  }

  // 획득한 칭호가 없는 경우
  if (achievedChallenge.length === 0) {
    const emptyMessage = isMyProfile
      ? '🏆 챌린지에 도전해서 칭호를 획득해 보세요! 🏆'
      : '🏆 아직 획득한 칭호가 없습니다 🏆';

    return (
      <div className={styles.container}>
        <div className={styles.marquee}>
          <div
            className={styles.marqueeContent}
            style={{ animationDuration: getAnimationDuration() }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="mx-[30px] flex text-[16px] whitespace-nowrap md:text-[20px] dark:text-[#2b2e34]"
              >
                {emptyMessage}
              </div>
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={`duplicate-${i}`}
                className="mx-[30px] flex text-[16px] whitespace-nowrap md:text-[20px] dark:text-[#2b2e34]"
              >
                {emptyMessage}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 칭호가 있는 경우
  return (
    <div className={styles.container}>
      <div className={styles.marquee}>
        <div
          className={styles.marqueeContent}
          style={{ animationDuration: getAnimationDuration() }}
        >
          {Array.from({ length: 15 }, (_, setIndex) =>
            achievedChallenge.map((mission, i) => (
              <div
                key={`${setIndex}-${i}`}
                className="mx-[30px] flex text-[16px] md:text-[20px] dark:text-[#2b2e34]"
              >
                {mission.iconImage && (
                  <Image
                    src={mission.iconImage}
                    alt="미션 아이콘"
                    width={25}
                    height={25}
                    className="mr-[5px]"
                  />
                )}
                {mission.name}
                <div className="text-[12px] text-[var(--main-color-3)]">
                  {mission.minCount}
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
