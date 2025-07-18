import { BookmarkData } from '@/types/userType';
export async function getBookmarkedPlaces(): Promise<BookmarkData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/bookmarks/places`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  );
  if (!res.ok) {
    console.error('fetch 실패:', res.status);
    throw new Error(`error!: ${res.status}`);
  }

  const data = await res.json();

  return data;
}
