'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PiFlowerFill } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import MissionTabs from './MissionTabs';
import Image, { StaticImageData } from 'next/image';
import { Challenge } from '@/types/userType';
import { iconMap } from '@/data/iconMap';
type MissionType = 'daily' | 'monthly' | 'community';

interface MissionProps {
  challengeList: Challenge[];
}

export default function MissionSwiperTabs({ challengeList }: MissionProps) {
  const [selectedTab, setSelectedTab] = useState<MissionType>('daily');
  const [reset, setReset] = useState(0);

  const typeMap = {
    daily: '일일',
    monthly: '월간',
    community: '커뮤니티',
  } as const;

  if (!challengeList) {
    return <div>챌린지 Loading</div>;
  }

  const missions =
    challengeList
      .filter((item) => item.type === typeMap[selectedTab])
      .map((item) => ({
        ...item,
        iconImage: iconMap[item.icon as keyof typeof iconMap],
      })) ?? [];

  const showSwiper = missions.length > 2;

  const groups = [];
  for (let i = 0; i < missions.length; i += 2) {
    groups.push(missions.slice(i, i + 2));
  }

  // 챌린지 데이터
  // useEffect(() => {
  //   const fetchChallenge = async () => {
  //     setReset(0);
  //     try {
  //       const res = await getChallenge();
  //       const mapped = res.data.map((item) => ({
  //         ...item,
  //         iconImage: iconMap[item.icon as keyof typeof iconMap] ?? undefined,
  //       }));
  //       setChallenges(mapped);
  //     } catch (err) {
  //       console.error('챌린지 목록 가져올 때 에러 발생', err);
  //     }
  //   };

  //   fetchChallenge();
  // }, [selectedTab]);

  const MissionCard = ({
    iconImage,
    description,
    name,
    progress,
    total,
  }: {
    iconImage?: StaticImageData;
    description: string;
    name: string;
    progress: number;
    total: number;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-[10px] p-[10px]">
      <p className="mt-[10px] text-center text-[16px] whitespace-pre-line">
        {description}
      </p>
      <p className="flex items-center text-[18px] font-semibold">
        {iconImage && (
          <Image
            src={iconImage}
            alt="미션 아이콘"
            width={25}
            height={25}
            className="mr-[5px]"
          />
        )}
        {name}
      </p>
      <PiFlowerFill size={47} color="#FFFAC5" />
      <button className="mt-[5px] h-[30px] w-[60px] rounded-[10px] bg-[var(--main-color-1)]">
        <p className="text-center text-[16px] font-semibold dark:text-[#2b2e34]">
          {progress} / {total}
        </p>
      </button>
    </div>
  );

  return (
    <>
      <h1 className="flex items-center justify-center p-[20px] text-[20px] font-semibold">
        챌린지
      </h1>
      <div className="w-full px-[10px]">
        <MissionTabs selectedTab={selectedTab} onChange={setSelectedTab} />

        {showSwiper ? (
          <Swiper
            key={selectedTab}
            modules={[Navigation]}
            navigation
            spaceBetween={5}
            initialSlide={0}
            onSlideChange={(swiper) => setReset(swiper.activeIndex)}
          >
            {groups.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="gap-[10px]">
                  {group.map((item) => (
                    <MissionCard
                      key={item.challengeId}
                      iconImage={item.iconImage}
                      description={item.description}
                      name={item.name}
                      progress={item.progress}
                      total={item.total}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="gap-[10px]">
            {missions.map((item) => (
              <MissionCard
                key={item.challengeId}
                iconImage={item.iconImage}
                description={item.description}
                name={item.name}
                progress={item.progress}
                total={item.total}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
