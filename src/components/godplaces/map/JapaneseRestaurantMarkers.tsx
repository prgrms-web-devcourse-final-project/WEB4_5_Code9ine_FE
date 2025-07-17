import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function JapaneseRestaurantMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const japaneseRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '일식',
  );
  const japaneseRestaurantMarkerOrigin = { x: 16, y: 110 };

  return (
    <>
      {japaneseRestaurantPositions &&
        japaneseRestaurantPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={japaneseRestaurantMarkerOrigin}
            key={`jpRestaurant-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
