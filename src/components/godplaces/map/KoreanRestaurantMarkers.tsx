import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function KoreanRestaurantMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const koreanRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '한식',
  );
  const koreanRestaurantMarkerOrigin = { x: 16, y: 0 };

  return (
    <>
      {koreanRestaurantPositions &&
        koreanRestaurantPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={koreanRestaurantMarkerOrigin}
            key={`krRestaurant-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
