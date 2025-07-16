'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKaKaoLoader from './useKaKaoLoader';
import markers from '../../../assets/icons/markers.png';
import { useGodplacesStore } from '@/stores/godplacesStore';

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

  const koreanRestaurantPositions = godplaces
    ?.filter((godplace) => godplace.category === '한식')
    .map((krRestaurant) => {
      return {
        lat: Number(krRestaurant.latitude),
        lng: Number(krRestaurant.longitude),
      };
    });
  const koreanRestaurantMarkerOrigin = { x: 16, y: 0 };

  const chineseRestaurantPositions = godplaces
    ?.filter((godplace) => godplace.category === '중식')
    .map((cnRestaurant) => {
      return {
        lat: Number(cnRestaurant.latitude),
        lng: Number(cnRestaurant.longitude),
      };
    });
  const chineseRestaurantMarkerOrigin = { x: 16, y: 55 };

  const japaneseRestaurantPositions = godplaces
    ?.filter((godplace) => godplace.category === '일식')
    .map((jpRestaurant) => {
      return {
        lat: Number(jpRestaurant.latitude),
        lng: Number(jpRestaurant.longitude),
      };
    });
  const japaneseRestaurantMarkerOrigin = { x: 16, y: 110 };

  const westernRestaurantPositions = godplaces
    ?.filter((godplace) => godplace.category === '양식')
    .map((westernRestaurant) => {
      return {
        lat: Number(westernRestaurant.latitude),
        lng: Number(westernRestaurant.longitude),
      };
    });
  const westernRestaurantMarkerOrigin = { x: 16, y: 165 };

  const libraryPositions = godplaces
    ?.filter((godplace) => godplace.type === 'library')
    .map((library) => {
      return {
        lat: Number(library.latitude),
        lng: Number(library.longitude),
      };
    });
  const libraryMarkerOrigin = { x: 16, y: 220 };

  const beautySalonPositions = godplaces
    ?.filter((godplace) => godplace.category === '미용업')
    .map((beautySalon) => {
      return {
        lat: Number(beautySalon.latitude),
        lng: Number(beautySalon.longitude),
      };
    });
  const beautySalonMarkerOrigin = { x: 16, y: 275 };

  const laundryPositions = godplaces
    ?.filter((godplace) => godplace.category === '세탁업')
    .map((laundry) => {
      return {
        lat: Number(laundry.latitude),
        lng: Number(laundry.longitude),
      };
    });
  const laundryMarkerOrigin = { x: 16, y: 330 };

  const hotelPositions = godplaces
    ?.filter((godplace) => godplace.category === '숙박업')
    .map((hotel) => {
      return {
        lat: Number(hotel.latitude),
        lng: Number(hotel.longitude),
      };
    });
  const hotelMarkerOrigin = { x: 16, y: 385 };

  const festivalPositions = godplaces
    ?.filter((godplace) => godplace.type === 'festival')
    .map((festival) => {
      return {
        lat: Number(festival.latitude),
        lng: Number(festival.longitude),
      };
    });
  const festivalMarkerOrigin = { x: 16, y: 440 };

  console.log(godplacesPositions);

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
