import { GodplacesSearchList } from '@/types/godplaces';

export function getGodplaceMarkersByCategory(
  godplaces: GodplacesSearchList[] | undefined,
  isCategory: boolean,
  category: string,
  // selectedId?: string,
) {
  const getIdByType = (godplace: GodplacesSearchList): string | undefined => {
    switch (godplace.type) {
      case 'store':
        return godplace.storeId;
      case 'library':
        return godplace.libraryId;
      case 'festival':
        return godplace.festivalId;
      default:
        return undefined;
    }
  };

  return (
    godplaces
      ?.filter((godplace) =>
        isCategory
          ? godplace.category === category
          : godplace.type === category,
      )
      // .filter((godplace) => {
      //   const id = getIdByType(godplace);
      //   return selectedId ? id === selectedId : true;
      // })
      .map((filteredGodplace) => {
        return {
          type: filteredGodplace.type,
          id:
            filteredGodplace.storeId ||
            filteredGodplace.libraryId ||
            filteredGodplace.festivalId,
          positions: {
            lat: Number(filteredGodplace.latitude),
            lng: Number(filteredGodplace.longitude),
          },
        };
      })
  );
}
