import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function FestivalMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const festivalPositions = getGodplaceMarkersByCategory(
    godplaces,
    false,
    'festival',
    // selectedType === 'festival' ? (selectedId ?? undefined) : undefined,
  );
  const festivalMarkerOrigin = { x: 16, y: 440 };

  return (
    <>
      {festivalPositions &&
        festivalPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={festivalMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
