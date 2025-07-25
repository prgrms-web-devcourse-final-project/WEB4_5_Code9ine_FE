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
  return (
    <div className={styles.container}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {achievedChallenge.map((mission, i) => (
            <div
              key={`1-${i}`}
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
            </div>
          ))}

          {achievedChallenge.map((mission, i) => (
            <div
              key={`2-${i}`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
