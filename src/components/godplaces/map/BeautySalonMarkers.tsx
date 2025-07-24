import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function BeautySalonMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const beautySalonPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '미용업',
    // selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const beautySalonMarkerOrigin = { x: 16, y: 275 };

  return (
    <>
      {beautySalonPositions &&
        beautySalonPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={beautySalonMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
