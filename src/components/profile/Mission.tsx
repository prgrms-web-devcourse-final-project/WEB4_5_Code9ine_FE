'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import missionsData from '@/assets/missionData.json';
import { PiFlowerFill } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import Tabs from './Tabs';

export default function MissionSwiperTabs() {
  const [selectedTab, setSelectedTab] = useState<
    'daily' | 'weekly' | 'monthly' | 'community'
  >('daily');
  const [reset, setReset] = useState(0);

  const missions = missionsData[selectedTab];
  const showSwiper = missions.length > 2;

  const groups = [];
  for (let i = 0; i < missions.length; i += 2) {
    groups.push(missions.slice(i, i + 2));
  }

  useEffect(() => {
    setReset(0);
  }, [selectedTab]);

  const MissionCard = ({
    des,
    missionTitle,
  }: {
    des: string;
    missionTitle: string;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-[10px] bg-white p-[10px] shadow-md">
      <p className="mt-[10px] text-center text-[16px] whitespace-pre-line">
        {des}
      </p>
      <p className="text-[18px] font-semibold">{missionTitle}</p>
      <PiFlowerFill size={47} color="#FFFAC5" />
      <button className="mt-[5px] h-[30px] w-[60px] rounded-[10px] bg-[var(--main-color-1)]">
        <p className="text-center text-[16px] font-semibold">0 / 3</p>
      </button>
    </div>
  );

  return (
    <div className="w-full px-[10px]">
      {/* 탭 메뉴 */}
      <Tabs selectedTab={selectedTab} onChange={setSelectedTab} />

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
              des={item.des}
              missionTitle={item.missionTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
