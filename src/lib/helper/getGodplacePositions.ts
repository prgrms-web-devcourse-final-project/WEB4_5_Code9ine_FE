import { GodplacesSearchList } from '@/types/godplaces';

export function getGodplacePositions(
  godplaces: GodplacesSearchList[] | undefined,
  isCategory: boolean,
  category: string,
) {
  return godplaces
    ?.filter((godplace) =>
      isCategory ? godplace.category === category : godplace.type === category,
    )
    .map((filteredGodplace) => {
      return {
        lat: Number(filteredGodplace.latitude),
        lng: Number(filteredGodplace.longitude),
      };
    });
}
