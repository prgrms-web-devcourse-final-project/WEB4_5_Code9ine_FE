import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import markers from '../../../assets/icons/markers.png';
import BookmarkButton from '../common/BookmarkButton';
import { useParams, useRouter } from 'next/navigation';

export default function CustomMarker({
  position,
  markerOrigin,
  type,
  id,
}: {
  position: { lat: number; lng: number };
  markerOrigin: { x: number; y: number };
  type: string;
  id: number | undefined;
}) {
  const router = useRouter();
  const { region } = useParams();
  const markerSize = { width: 30, height: 40 };
  const spriteImageSize = { width: 63, height: 480 };

  const viewSelectedDetails = () => {
    if (type && id)
      router.push(`/godplaces/${region}/detail?type=${type}&id=${id}`);
  };

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
        onClick={viewSelectedDetails}
      />
      <CustomOverlayMap position={position} yAnchor={2.36}>
        <div className="customoverlay">
          {id && (
            <BookmarkButton
              className="cursor-pointer"
              hasWhiteBG={true}
              type={type}
              id={id}
            />
          )}
        </div>
      </CustomOverlayMap>
    </>
  );
}
