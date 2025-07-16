import styles from '../../css/TitleSwiper.module.css';
import Image from 'next/image';
import { missionData } from '@/data/missionData';

// const iconList = {
//   절약왕 : missionData.daily[0].icon,
// }

export default function TitleSwiper() {
  const allMossions = [
    ...missionData.daily,
    ...missionData.weekly,
    ...missionData.monthly,
    ...missionData.community,
  ];
  return (
    <div className={styles.container}>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {allMossions.map((mission, i) => (
            <div
              key={`1-${i}`}
              className="mx-[30px] flex text-[16px] md:text-[20px] dark:text-[#2b2e34]"
            >
              <Image
                src={mission.icon} // iconList[mission.missionTitle]
                alt="미션 아이콘"
                width={25}
                height={25}
                className="mr-[5px]"
              />
              {mission.missionTitle}
            </div>
          ))}

          {allMossions.map((mission, i) => (
            <div
              key={`2-${i}`}
              className="mx-[30px] flex text-[16px] md:text-[20px] dark:text-[#2b2e34]"
            >
              <Image
                src={mission.icon}
                alt="미션 아이콘"
                width={25}
                height={25}
                className="mr-[5px]"
              />
              {mission.missionTitle}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
