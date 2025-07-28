'use client';
import styles from '../../css/TitleSwiper.module.css';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { getMyPage, getUserProfile } from '@/api/profile';
import { iconMap } from '@/data/iconMap';
import { MyTitle } from '@/types/userType';

interface MappedTitle extends MyTitle {
  iconImage?: StaticImageData;
}

interface TitleSwiperProps {
  profileData?: { achievedTitles?: MyTitle[] }; // 서버에서 받아온 프로필 데이터
  memberId?: string; // 유저 ID
}

export default function TitleSwiper({
  profileData,
  memberId,
}: TitleSwiperProps) {
  const [achievedChallenge, setAchievedChallenge] = useState<MappedTitle[]>([]);
  const [loading, setLoading] = useState(!profileData);
  const [error, setError] = useState<string | null>(null);
  interface MyDataType {
    memberId: string | number;
  }
  const [myData, setMyData] = useState<MyDataType | null>(null);

  // 내 정보 가져오기 (memberId와 비교하기 위해)
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
      // profileData가 있으면 그것을 사용, 없으면 API 호출
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
          setError('칭호를 불러올 수 없습니다.');
          setLoading(false);
        }
      } else {
        // fallback: API 호출
        try {
          setLoading(true);
          setError(null);

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
          setError('칭호를 불러올 수 없습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTitles();
  }, [profileData, memberId, isMyProfile]);

  // 칭호 개수에 따른 애니메이션 속도 계산
  const getAnimationDuration = () => {
    if (achievedChallenge.length === 0) return '90s'; // 빈 메시지용 - 느리게
    if (achievedChallenge.length <= 3) return '15s'; // 적은 칭호
    if (achievedChallenge.length <= 6) return '25s'; // 보통 칭호
    return '35s'; // 많은 칭호
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={styles.container}>
        <div className="flex h-[60px] items-center justify-center">
          <p className="text-[14px] text-[var(--gray-color-2)]">
            칭호를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.container}>
        <div className="flex h-[60px] items-center justify-center">
          <p className="text-[14px] text-red-500">{error}</p>
        </div>
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
