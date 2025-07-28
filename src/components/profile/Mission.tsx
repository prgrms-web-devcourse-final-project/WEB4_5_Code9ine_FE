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
import MissionSkeleton from './MissionSkeleton';

type MissionType = 'daily' | 'monthly' | 'community';

interface MissionProps {
  challengeList: Challenge[];
}

export default function MissionSwiperTabs({ challengeList }: MissionProps) {
  const [selectedTab, setSelectedTab] = useState<MissionType>('daily');
  const typeMap = {
    daily: '일일',
    monthly: '월간',
    community: '커뮤니티',
  } as const;

  if (!challengeList || challengeList.length === 0) {
    return (
      <div className="w-full px-[10px]">
        <h1 className="flex items-center justify-center p-[20px] text-[20px] font-semibold">
          챌린지
        </h1>
        <div className="flex flex-col gap-[10px]">
          {[...Array(2)].map((_, index) => (
            <MissionSkeleton key={index} />
          ))}
        </div>
      </div>
    );
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
  }) => {
    const achievementRate = total > 0 ? progress / total : 0;
    let flowerColor = '#FFFAC5';
    let statusText = `${progress} / ${total}`;
    const isCompleted = achievementRate >= 1;

    if (achievementRate >= 1) {
      flowerColor = '#FF8585';
      statusText = '🎉 달성 🎉';
    } else if (achievementRate >= 0.75) {
      flowerColor = '#FFAA00';
    } else if (achievementRate >= 0.5) {
      flowerColor = '#FFE100';
    } else if (achievementRate >= 0.25) {
      flowerColor = '#FDF090';
    }

    const buttonClass = `mt-[5px] h-[30px] w-[100px] rounded-[10px] ${
      isCompleted ? 'bg-[var(--main-color-2)]' : 'bg-[var(--main-color-1)]'
    }`;

    return (
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
        <PiFlowerFill
          size={47}
          color={flowerColor}
          className={isCompleted ? 'flower-spin' : ''}
        />
        <button className={buttonClass}>
          <p className="text-center text-[16px] font-semibold dark:text-[#2b2e34]">
            {statusText}
          </p>
        </button>
      </div>
    );
  };

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
            onSlideChange={() => {}}
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
