import { useKakaoLoader as useKaKaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKaKaoLoader() {
  useKaKaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY as string,
    libraries: ['clusterer', 'services', 'drawing'],
  });
}
