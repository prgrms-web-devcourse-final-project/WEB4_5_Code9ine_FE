import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function ChineseRestaurantMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const chineseRestaurantPositions = getGodplacePositions(
    godplaces,
    true,
    '중식',
  );
  const chineseRestaurantMarkerOrigin = { x: 16, y: 55 };

  return (
    <>
      {chineseRestaurantPositions &&
        chineseRestaurantPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={chineseRestaurantMarkerOrigin}
            key={`cnRestaurant-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
