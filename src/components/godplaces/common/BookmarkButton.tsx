import { patchBookmark } from '../../../api/godplaces';
import { useGodplacesStore } from '@/stores/godplacesStore';
import { MyBookmark } from '@/types/godplaces';
import { useEffect, useState } from 'react';
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
  id: number;
}) {
  const bookmarked = useGodplacesStore((state) => state.bookmarked);
  const toggleBookmarked = useGodplacesStore((state) => state.toggleBookmarked);
  const [optimisticState, setOptimisticState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isMatched = bookmarked.some(
      (bookmark) =>
        bookmark.type === type && Number(bookmark[getBookmarkKey(type)]) === id,
    );
    setOptimisticState(isMatched);
  }, [bookmarked, type, id]);

  const bookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setOptimisticState((prev) => !prev);

    try {
      const message = await patchBookmark(type, Number(id));

      // console.log(message);
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
        setOptimisticState((prev) => !prev);
      }
    } catch (err) {
      console.error('북마크 실패: ', err);
      setOptimisticState((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  const getBookmarkKey = (type: string): keyof MyBookmark => {
    return `${type}Id` as keyof MyBookmark;
  };

  if (hasWhiteBG) {
    return (
      <>
        <button onClick={bookmarkHandler} type="button">
          {optimisticState ? (
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
        {optimisticState ? (
          <BsStarFill className={className} />
        ) : (
          <BsStar className={className} />
        )}
      </button>
    </>
  );
}
