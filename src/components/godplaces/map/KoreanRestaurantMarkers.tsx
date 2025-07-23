import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function KoreanRestaurantMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const koreanRestaurantPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '한식',
    // selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const koreanRestaurantMarkerOrigin = { x: 16, y: 0 };

  return (
    <>
      {koreanRestaurantPositions &&
        koreanRestaurantPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={koreanRestaurantMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
