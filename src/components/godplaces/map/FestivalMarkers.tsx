import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function FestivalMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const festivalPositions = getGodplacePositions(godplaces, false, 'festival');
  const festivalMarkerOrigin = { x: 16, y: 440 };

  return (
    <>
      {festivalPositions &&
        festivalPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={festivalMarkerOrigin}
            key={`festival-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
