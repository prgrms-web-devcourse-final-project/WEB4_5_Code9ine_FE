import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function LibraryMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const libraryPositions = getGodplaceMarkersByCategory(
    godplaces,
    false,
    'library',
    // selectedType === 'library' ? (selectedId ?? undefined) : undefined,
  );
  const libraryMarkerOrigin = { x: 16, y: 220 };

  return (
    <>
      {libraryPositions &&
        libraryPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={libraryMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
