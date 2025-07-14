'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { missionData } from '@/data/missionData';
import { PiFlowerFill } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import MissionTabs from './MissionTabs';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

export default function MissionSwiperTabs() {
  const [selectedTab, setSelectedTab] = useState<
    'daily' | 'weekly' | 'monthly' | 'community'
  >('daily');
  const [reset, setReset] = useState(0);

  const missions = missionData[selectedTab];
  const showSwiper = missions.length > 2;

  const groups = [];
  for (let i = 0; i < missions.length; i += 2) {
    groups.push(missions.slice(i, i + 2));
  }

  useEffect(() => {
    setReset(0);
  }, [selectedTab]);

  const MissionCard = ({
    icon,
    des,
    missionTitle,
  }: {
    icon: StaticImageData;
    des: string;
    missionTitle: string;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-[10px] p-[10px]">
      <p className="mt-[10px] text-center text-[16px] whitespace-pre-line">
        {des}
      </p>
      <p className="flex text-[18px] font-semibold">
        {icon && (
          <Image
            src={icon}
            alt="미션 아이콘"
            width={25}
            height={25}
            className="mr-[5px]"
          />
        )}
        {missionTitle}
      </p>
      <PiFlowerFill size={47} color="#FFFAC5" />
      <button className="mt-[5px] h-[30px] w-[60px] rounded-[10px] bg-[var(--main-color-1)]">
        <p className="text-center text-[16px] font-semibold dark:text-[#2b2e34]">
          0 / 3
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
        {/* 탭 메뉴 */}
        <MissionTabs selectedTab={selectedTab} onChange={setSelectedTab} />

        {/* 미션*/}
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
                  {group.map((item, i) => (
                    <MissionCard
                      icon={item.icon}
                      key={i}
                      des={item.des}
                      missionTitle={item.missionTitle}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="gap-[10px]">
            {missions.map((item, index) => (
              <MissionCard
                key={index}
                icon={item.icon}
                des={item.des}
                missionTitle={item.missionTitle}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
