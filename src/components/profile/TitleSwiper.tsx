'use client';
import styles from '../../css/TitleSwiper.module.css';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { getMyPage } from '@/api/profile';
import { iconMap } from '@/data/iconMap';
import { MyTitle } from '@/types/userType';

interface MappedTitle extends MyTitle {
  iconImage?: StaticImageData;
}

export default function TitleSwiper() {
  const [achievedChallenge, setAchievedChallenge] = useState<MappedTitle[]>([]);

  useEffect(() => {
    const myTitles = async () => {
      try {
        const res = await getMyPage();
        console.log(res.data.data.achievedTitles);
        const mapped = res.data.data.achievedTitles.map((item) => ({
          ...item,
          iconImage: iconMap[item.icon as keyof typeof iconMap] ?? undefined,
        }));
        setAchievedChallenge(mapped);
      } catch (err) {
        console.log('획득한 칭호 에러', err);
      }
    };
    myTitles();
  }, []);

  // 칭호 개수에 따른 애니메이션 속도 계산
  const getAnimationDuration = () => {
    if (achievedChallenge.length === 0) return '90s'; // 빈 메시지용 - 느리게
    if (achievedChallenge.length <= 3) return '15s'; // 적은 칭호
    if (achievedChallenge.length <= 6) return '25s'; // 보통 칭호
    return '35s'; // 많은 칭호
  };

  // 획득한 칭호가 없는 경우
  if (achievedChallenge.length === 0) {
    const emptyMessage = '🏆 챌린지에 도전해서 칭호를 획득해 보세요! 🏆';
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
                <Image
                  src={mission.iconImage!}
                  alt="미션 아이콘"
                  width={25}
                  height={25}
                  className="mr-[5px]"
                />
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
