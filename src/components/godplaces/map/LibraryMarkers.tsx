import { useGodplacesStore } from '@/stores/godplacesStore';
import { getGodplacePositions } from '@/lib/helper/getGodplacePositions';
import CustomMarker from './CustomMarker';

export default function LibraryMarkers() {
  const godplaces = useGodplacesStore((state) => state.godplaces);

  const libraryPositions = getGodplacePositions(godplaces, false, 'library');
  const libraryMarkerOrigin = { x: 16, y: 220 };

  return (
    <>
      {libraryPositions &&
        libraryPositions.map((position) => (
          <CustomMarker
            position={position}
            markerOrigin={libraryMarkerOrigin}
            key={`library-${position.lat},${position.lng}`}
          />
        ))}
    </>
  );
}
