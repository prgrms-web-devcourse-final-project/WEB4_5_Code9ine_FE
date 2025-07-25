import { patchBookmark } from '../../../api/godplaces';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { startTransition, useOptimistic } from 'react';
import toast from 'react-hot-toast';
import { BsStar, BsStarFill } from 'react-icons/bs';

export default function BookmarkButton({
  className,
  hasWhiteBG = false,
  type,
  id,
}: {
  className: string;
  hasWhiteBG?: boolean;
  type: string;
  id: string;
}) {
  const bookmarked = useGodplacesStore((state) => state.bookmarked);
  const setBookmarked = useGodplacesStore((state) => state.setBookmarked);
  const [optimisticMyBookmarked, addOptimisticMyBookmarked] = useOptimistic<
    { type: string; id: number }[],
    { type: string; id: number }
  >(bookmarked, (bookmarks, value) => [...bookmarks, value]);

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
      addOptimisticMyBookmarked({ type: type, id: Number(id) });
    });

    try {
      const message = await patchBookmark(type, Number(id));

      if (message.code === '0000') {
        toast.success('북마크 완료');
        console.log(message);
        startTransition(() => {
          setBookmarked([{ type: type, id: Number(id) }]);
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
            (bookmark) => bookmark.type === type && bookmark.id === Number(id),
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
          (bookmark) => bookmark.type === type && bookmark.id === Number(id),
        ) ? (
          <BsStarFill className={className} />
        ) : (
          <BsStar className={className} />
        )}
      </button>
    </>
  );
}
