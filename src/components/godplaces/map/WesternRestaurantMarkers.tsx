import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function WesternRestaurantMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const westernRestaurantPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '양식',
    // selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const westernRestaurantMarkerOrigin = { x: 16, y: 165 };

  return (
    <>
      {westernRestaurantPositions &&
        westernRestaurantPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={westernRestaurantMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
