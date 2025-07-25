import { patchBookmark } from '@/lib/api/godplaces';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { MyBookmark } from '@/types/godplaces';
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
  const toggleBookmarked = useGodplacesStore((state) => state.toggleBookmarked);
  const [optimisticMyBookmarked, addOptimisticMyBookmarked] = useOptimistic<
    MyBookmark[],
    MyBookmark
  >(bookmarked, (bookmarks, value) => [...bookmarks, value]);

  const bookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      addOptimisticMyBookmarked({ type, [getBookmarkKey(type)]: id });
    });

    try {
      const message = await patchBookmark(type, Number(id));

      console.log(message);
      if (message.code === '0000') {
        if (message.data.activated === true) {
          toast.success('북마크 등록 완료');
        }

        if (message.data.activated === false) {
          toast.success('북마크 해제 완료');
        }

        toggleBookmarked({
          type,
          [getBookmarkKey(type)]: id,
        });
      } else {
        toast.error('북마크 실패');
      }
    } catch (err) {
      console.error('북마크 실패: ', err);
    }
  };

  const getBookmarkKey = (type: string): keyof MyBookmark => {
    return `${type}Id` as keyof MyBookmark;
  };

  const isBookmarked = optimisticMyBookmarked.some(
    (bookmark) =>
      bookmark.type === type && bookmark[getBookmarkKey(type)] === id,
  );

  if (hasWhiteBG) {
    return (
      <>
        <button onClick={bookmarkHandler} type="button">
          {isBookmarked ? (
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
        {isBookmarked ? (
          <BsStarFill className={className} />
        ) : (
          <BsStar className={className} />
        )}
      </button>
    </>
  );
}
