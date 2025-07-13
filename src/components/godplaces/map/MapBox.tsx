'use client';
import { Map } from 'react-kakao-maps-sdk';
import useKaKaoLoader from './useKaKaoLoader';

export default function MapBox() {
  useKaKaoLoader();

  return (
    <Map
      className="h-[230px] min-w-[330px] rounded-[10px] bg-gray-300 shadow-[var(--shadow-md)] md:h-[629px] md:w-[756px]"
      center={{ lat: 37.5452442, lng: 127.0473267 }}
      level={5}
    ></Map>
  );
}
