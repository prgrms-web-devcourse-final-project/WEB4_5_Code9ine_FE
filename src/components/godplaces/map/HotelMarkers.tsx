import { useGodplacesStore } from '@/stores/godplacesStore';
import CustomMarker from './CustomMarker';
import { useSearchParams } from 'next/navigation';
import { getGodplaceMarkersByCategory } from '@/lib/helper/getGodplaceMarkersByCategory';

export default function HotelMarkers() {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type');
  const selectedId = searchParams.get('id');

  const godplaces = useGodplacesStore((state) => state.godplaces);

  const hotelPositions = getGodplaceMarkersByCategory(
    godplaces,
    true,
    '숙박업',
    selectedType === 'store' ? (selectedId ?? undefined) : undefined,
  );
  const hotelMarkerOrigin = { x: 16, y: 385 };

  return (
    <>
      {hotelPositions &&
        hotelPositions.map((markers) => (
          <CustomMarker
            position={markers.positions}
            markerOrigin={hotelMarkerOrigin}
            key={`${markers.type}-${markers.id}`}
            type={markers.type}
            id={markers.id}
          />
        ))}
    </>
  );
}
