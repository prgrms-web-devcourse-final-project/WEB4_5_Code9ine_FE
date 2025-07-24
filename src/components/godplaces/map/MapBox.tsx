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
import { startTransition, useEffect, useState } from 'react';
import { GodplacesDetail } from '@/types/godplaces';
import { getGodplaceDetails } from '@/api/godplaces';
import CustomMarker from './CustomMarker';

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
  const selectedId = searchParams.get('id');
  const selectedType = searchParams.get('type');
  const [details, setDetails] = useState<GodplacesDetail>();
  const mapHeight = isDetail ? 'md:h-[731px]' : 'md:h-[637px]';

  useKaKaoLoader();

  useEffect(() => {
    if (isDetail && selectedId && selectedType) {
      startTransition(async () => {
        try {
          const response = await getGodplaceDetails(selectedType, selectedId);
          if (response.code === '0000') {
            setDetails(response.data);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [selectedId, selectedType, isDetail]);

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
        {!isDetail && (
          <>
            <KoreanRestaurantMarkers />
            <ChineseRestaurantMarkers />
            <JapaneseRestaurantMarkers />
            <WesternRestaurantMarkers />
            <LibraryMarkers />
            <BeautySalonMarkers />
            <LaundryMarkers />
            <HotelMarkers />
            <FestivalMarkers />
          </>
        )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '한식' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 0 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '중식' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 55 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '일식' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 110 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '양식' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 165 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail && details && details.type === 'library' && (
          <CustomMarker
            position={{
              lat: Number(details.latitude),
              lng: Number(details.longitude),
            }}
            markerOrigin={{ x: 16, y: 220 }}
            type={details.type}
            id={details.libraryId}
          />
        )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '미용업' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 275 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '세탁업' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 330 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail &&
          details &&
          details.type === 'store' &&
          details.category === '숙박업' && (
            <CustomMarker
              position={{
                lat: Number(details.latitude),
                lng: Number(details.longitude),
              }}
              markerOrigin={{ x: 16, y: 385 }}
              type={details.type}
              id={details.storeId}
            />
          )}

        {isDetail && details && details.type === 'festival' && (
          <CustomMarker
            position={{
              lat: Number(details.latitude),
              lng: Number(details.longitude),
            }}
            markerOrigin={{ x: 16, y: 440 }}
            type={details.type}
            id={details.festivalId}
          />
        )}
      </Map>
    </>
  );
}
