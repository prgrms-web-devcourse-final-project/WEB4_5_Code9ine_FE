import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function WesternRestaurantMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const westernRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '양식',
  );
  const westernRestaurantMarkerOrigin = { x: 16, y: 165 };

  return (
    <>
      {westernRestaurantPositions &&
        westernRestaurantPositions.map((position) => (
          <div key={`wRestaurant-${position.lat},${position.lng}`}>
            <CustomMarker
              position={position}
              markerOrigin={westernRestaurantMarkerOrigin}
            />
          </div>
        ))}
    </>
  );
}
