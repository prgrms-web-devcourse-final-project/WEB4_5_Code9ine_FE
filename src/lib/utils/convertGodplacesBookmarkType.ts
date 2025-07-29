import type { MyBookmark } from '@/types/godplaces';
import type { BookmarkItem } from '@/types/userType';

export function convertGodplacesBookmarkType(bookmarks: BookmarkItem[]): MyBookmark[] {
  return bookmarks.map((item) => {
    const { type } = item;
    const base = { type } as MyBookmark;

    switch (type) {
      case 'store':
        return { ...base, storeId: Number(item.storeId) };
      case 'festival':
        return { ...base, festivalId: Number(item.festivalId) };
      case 'library':
        return { ...base, libraryId: Number(item.libraryId) };
      default:
        throw new Error(`Unknown bookmark type: ${type}`);
    }
  });
}
