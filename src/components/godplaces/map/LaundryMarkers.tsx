import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
// import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function LaundryMarkers() {
  // const searchParams = useSearchParams();
  // const selectedType = searchParams.get('type');
  // const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const laundryPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '세탁업',
    // selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const laundryMarkerOrigin = { x: 16, y: 330 };

  return (
    <>
      {laundryPositions &&
        laundryPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={laundryMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
