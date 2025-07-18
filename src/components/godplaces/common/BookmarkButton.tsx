import { patchBookmark } from '@/lib/api/godplaces';
import { startTransition, useOptimistic, useState } from 'react';
import toast from 'react-hot-toast';
import { BsStar, BsStarFill } from 'react-icons/bs';

const PLACEID = '1';

export default function BookmarkButton({
  className,
  hasWhiteBG = false,
}: {
  className: string;
  hasWhiteBG?: boolean;
}) {
  const [myBookmarked, setMyBookmarked] = useState<{ placeId: string }[]>([]);
  const [optimisticMyBookmarked, addOptimisticMyBookmarked] = useOptimistic<
    { placeId: string }[],
    { placeId: string }
  >(myBookmarked, (bookmarks, value) => [...bookmarks, value]);

  // useEffect(() => {
  //   startTransition(async () => {
  //     try {
  //       const myBookmarks = await getBookmarks();
  //       console.log(myBookmarks);
  //     } catch (err) {
  //       console.error('북마크 조회 실패 ', err);
  //     }
  //   });
  // }, []);

  const bookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      addOptimisticMyBookmarked({ placeId: PLACEID });
    });

    try {
      const message = await patchBookmark(1, 'store', 1);

      if (message.code === '0000') {
        toast.success('북마크 완료');
        // console.log(message);
        startTransition(() => {
          setMyBookmarked((state) => [...state, { placeId: PLACEID }]);
        });
        // console.log(myBookmarked);
      } else {
        toast.error('북마크 실패');
      }
    } catch (err) {
      console.error('북마크 실패: ', err);
    }
  };

  if (hasWhiteBG) {
    return (
      <>
        <button onClick={bookmarkHandler} type="button">
          {optimisticMyBookmarked.some(
            (bookmark) => bookmark.placeId === PLACEID,
          ) ? (
            <BsStarFill
              fill="var(--point-color-1)"
              stroke="var(--point-color-1)"
              strokeWidth={1}
              size={20}
              className={className}
            />
          ) : (
            <BsStarFill
              fill="white"
              stroke="var(--point-color-1)"
              strokeWidth={2}
              size={20}
              className={className}
            />
          )}
        </button>
      </>
    );
  }

  return (
    <>
      <button onClick={bookmarkHandler} type="button">
        {optimisticMyBookmarked.some(
          (bookmark) => bookmark.placeId === PLACEID,
        ) ? (
          <BsStarFill className={className} />
        ) : (
          <BsStar className={className} />
        )}
      </button>
    </>
  );
}
