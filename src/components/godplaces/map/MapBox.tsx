'use client';
import { Map } from 'react-kakao-maps-sdk';
import useKaKaoLoader from './useKaKaoLoader';
import { useGodplacesStore } from '@/stores/godplacesStore';
import KoreanRestaurantMarkers from './KoreanRestaurantMarkers';
import ChineseRestaurantMarkers from './ChineseRestaurantMarkers';
import JapaneseRestaurantMarkers from './JapaneseRestaurantMarkers';
import WesternRestaurantMarkers from './WesternRestaurantMarkers';
import LibraryMarkers from './LibraryMarkers';
import BeautySalonMarkers from './BeautySalonMarkers';
import LaundryMarkers from './LaundryMarkers';
import HotelMarkers from './HotelMarkers';
import FestivalMarkers from './FestivalMarkers';
import { useSearchParams } from 'next/navigation';

const dummyCenter = { lat: 37.5452442, lng: 127.0473267 };
// const dummyData = [
//   {
//     lat: 37.55,
//     lng: 127.05,
//   },
//   {
//     lat: 37.5452442,
//     lng: 127.0473267,
//   },
// ];

export default function MapBox() {
  const godplaces = useGodplacesStore((state) => state.godplaces);
  const searchParams = useSearchParams();
  const isDetail = searchParams.get('id') !== null;
  const mapHeight = isDetail ? 'md:h-[731px]' : 'md:h-[637px]';

  useKaKaoLoader();

  const godplacesPositions = godplaces?.map((godplace) => {
    return { lat: Number(godplace.latitude), lng: Number(godplace.longitude) };
  });

  return (
    <>
      <Map
        className={`h-[230px] min-w-[330px] rounded-[10px] bg-gray-300 shadow-[var(--shadow-md)] md:w-[756px] ${mapHeight}`}
        center={
          godplacesPositions && godplacesPositions.length > 0
            ? godplacesPositions[0]
            : dummyCenter
        }
        level={7}
      >
        <KoreanRestaurantMarkers />
        <ChineseRestaurantMarkers />
        <JapaneseRestaurantMarkers />
        <WesternRestaurantMarkers />
        <LibraryMarkers />
        <BeautySalonMarkers />
        <LaundryMarkers />
        <HotelMarkers />
        <FestivalMarkers />
      </Map>
    </>
  );
}
