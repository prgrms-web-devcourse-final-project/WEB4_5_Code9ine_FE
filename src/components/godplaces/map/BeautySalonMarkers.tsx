import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function BeautySalonMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const beautySalonPositions = getGodplacePositions(godplaces, true, '미용업');
  const beautySalonMarkerOrigin = { x: 16, y: 275 };

  return (
    <>
      {beautySalonPositions &&
        beautySalonPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={beautySalonMarkerOrigin}
            key={`salon-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
