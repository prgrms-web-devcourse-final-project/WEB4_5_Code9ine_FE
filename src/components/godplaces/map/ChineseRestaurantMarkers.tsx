import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function ChineseRestaurantMarkers() {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type');
  const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const chineseRestaurantPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '중식',
    selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const chineseRestaurantMarkerOrigin = { x: 16, y: 55 };

  return (
    <>
      {chineseRestaurantPositions &&
        chineseRestaurantPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={chineseRestaurantMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
