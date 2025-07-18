import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import markers from '../../../assets/icons/markers.png';
import BookmarkButton from '../common/BookmarkButton';

export default function CustomMarker({
  position,
  markerOrigin,
}: {
  position: { lat: number; lng: number };
  markerOrigin: { x: number; y: number };
}) {
  const markerSize = { width: 30, height: 40 };
  const spriteImageSize = { width: 63, height: 480 };

  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: markers.src,
          size: markerSize,
          options: {
            spriteSize: spriteImageSize,
            spriteOrigin: markerOrigin,
          },
        }}
      />
      <CustomOverlayMap position={position} yAnchor={2.36}>
        <div className="customoverlay">
          <BookmarkButton className="cursor-pointer" hasWhiteBG={true} />
        </div>
      </CustomOverlayMap>
    </>
  );
}
