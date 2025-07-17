import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function HotelMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const hotelPositions = getGodplacePositions(godplaces, true, '숙박업');
  const hotelMarkerOrigin = { x: 16, y: 385 };

  return (
    <>
      {hotelPositions &&
        hotelPositions.map((position) => (
          <div key={`hotel-${position.lat},${position.lng}`}>
            <CustomMarker
              position={position}
              markerOrigin={hotelMarkerOrigin}
            />
          </div>
        ))}
    </>
  );
}
