import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function JapaneseRestaurantMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const japaneseRestaurantPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '일식',
    // selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const japaneseRestaurantMarkerOrigin = { x: 16, y: 110 };

  return (
    <>
      {japaneseRestaurantPositions &&
        japaneseRestaurantPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={japaneseRestaurantMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
