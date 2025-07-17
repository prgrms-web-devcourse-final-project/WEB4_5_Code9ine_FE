import { BsStarFill } from 'react-icons/bs';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import markers from '../../../assets/icons/markers.png';

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
      <CustomOverlayMap position={position} yAnchor={2.3}>
        <div className="customoverlay">
          <button className="cursor-pointer">
            <BsStarFill
              fill="white"
              stroke="var(--point-color-1)"
              strokeWidth={2}
              size={20}
            />
          </button>
        </div>
      </CustomOverlayMap>
    </>
  );
}
