'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKaKaoLoader from './useKaKaoLoader';
import markers from '../../../assets/icons/markers.png';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';

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
  useKaKaoLoader();

  const markerSize = { width: 30, height: 40 };
  const spriteImageSize = { width: 63, height: 480 };

  const godplacesPositions = godplaces?.map((godplace) => {
    return { lat: Number(godplace.latitude), lng: Number(godplace.longitude) };
  });

  const koreanRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '한식',
  );
  const koreanRestaurantMarkerOrigin = { x: 16, y: 0 };

  const chineseRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '중식',
  );
  const chineseRestaurantMarkerOrigin = { x: 16, y: 55 };

  const japaneseRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '일식',
  );
  const japaneseRestaurantMarkerOrigin = { x: 16, y: 110 };

  const westernRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '양식',
  );
  const westernRestaurantMarkerOrigin = { x: 16, y: 165 };

  const libraryPositions = getGodplacePositions(godplaces, false, 'library');
  const libraryMarkerOrigin = { x: 16, y: 220 };

  const beautySalonPositions = getGodplacePositions(godplaces, true, '미용업');
  const beautySalonMarkerOrigin = { x: 16, y: 275 };

  const laundryPositions = getGodplacePositions(godplaces, true, '세탁업');
  const laundryMarkerOrigin = { x: 16, y: 330 };

  const hotelPositions = getGodplacePositions(godplaces, true, '숙박업');
  const hotelMarkerOrigin = { x: 16, y: 385 };

  const festivalPositions = getGodplacePositions(godplaces, false, 'festival');
  const festivalMarkerOrigin = { x: 16, y: 440 };

  return (
    <Map
      className="h-[230px] min-w-[330px] rounded-[10px] bg-gray-300 shadow-[var(--shadow-md)] md:h-[637px] md:w-[756px]"
      center={
        godplacesPositions && godplacesPositions.length > 0
          ? godplacesPositions[0]
          : dummyCenter
      }
      level={7}
    >
      {koreanRestaurantPositions &&
        koreanRestaurantPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: koreanRestaurantMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {chineseRestaurantPositions &&
        chineseRestaurantPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: chineseRestaurantMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {japaneseRestaurantPositions &&
        japaneseRestaurantPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: japaneseRestaurantMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {westernRestaurantPositions &&
        westernRestaurantPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: westernRestaurantMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {libraryPositions &&
        libraryPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: libraryMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {beautySalonPositions &&
        beautySalonPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: beautySalonMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {laundryPositions &&
        laundryPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: laundryMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {hotelPositions &&
        hotelPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: hotelMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
      {festivalPositions &&
        festivalPositions.map((position) => (
          <MapMarker
            key={`krRestaurant-${position.lat},${position.lng}`}
            position={position}
            image={{
              src: markers.src,
              size: markerSize,
              options: {
                spriteSize: spriteImageSize,
                spriteOrigin: festivalMarkerOrigin,
              },
            }}
          ></MapMarker>
        ))}
    </Map>
  );
}
