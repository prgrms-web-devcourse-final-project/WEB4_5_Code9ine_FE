import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function LaundryMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const laundryPositions = getGodplacePositions(godplaces, true, '세탁업');
  const laundryMarkerOrigin = { x: 16, y: 330 };

  return (
    <>
      {laundryPositions &&
        laundryPositions.map((position) => (
          <div key={`laundry-${position.lat},${position.lng}`}>
            <CustomMarker
              position={position}
              markerOrigin={laundryMarkerOrigin}
            />
          </div>
        ))}
    </>
  );
}
