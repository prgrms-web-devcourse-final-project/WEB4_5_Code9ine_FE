'use client';

import { format, parseISO } from 'date-fns';
import { AiFillStar } from 'react-icons/ai';
import {
  FaHeart,
  FaRegCommentDots,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import { PostRes } from '../../types/boardType';
import { boardApi } from '@/api/boardApi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import defaultProfile from '../../assets/profile.png';

interface PostItemProps {
  post: PostRes;
  onDelete?: (postId: number) => void;
  onEdit?: (postId: number) => void;
}

export default function PostItem({ post, onDelete, onEdit }: PostItemProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [myMemberId, setMyMemberId] = useState<number | null>(null);

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await boardApi.getMyInfo();
        setMyMemberId(me.memberId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, []);

  const isMine = myMemberId === post.memberId;

  const handleToggleLike = async () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await boardApi.toggleLike(post.postId);
    } catch (err) {
      console.error(err);
      toast.error('좋아요에 실패했어요');

      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const handleToggleBookmark = async () => {
    setIsBookmarked((prev) => !prev);

    try {
      await boardApi.toggleBookmark(post.postId);
    } catch (err) {
      console.error(err);
      toast.error('북마크에 실패했어요');

      setIsBookmarked((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await boardApi.deletePost(post.postId);
      toast.success('게시글이 삭제되었어요!');
      onDelete?.(post.postId);
    } catch (err) {
      console.error(err);
      toast.error('게시글 삭제에 실패했어요');
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative flex flex-col items-start gap-3 rounded-[10px] bg-[var(--background)] p-6 text-[var(--text-color-white)] shadow md:flex-row md:gap-6">
      <Link
        href={`/profile/${post.memberId}`}
        className="flex min-w-[90px] flex-col flex-row items-center md:flex-col"
      >
        <Image
          src={post.writerProfileImage || defaultProfile}
          alt="프로필"
          width={70}
          height={70}
          className="h-[30px] w-[30px] rounded-full border-2 border-[var(--main-color-2)] object-cover md:h-[70px] md:w-[70px]"
        />
        <div className="flex flex-row items-baseline gap-1 whitespace-nowrap md:flex-col md:items-center">
          <div className="ml-[4px] text-center text-[18px] leading-none md:text-[20px]">
            {post.writerNickname}
          </div>
          <div className="text-center text-[12px] leading-none text-[var(--text-color-2)] md:text-[16px]">
            {post.writerTitle}
          </div>
        </div>
      </Link>

      <div className="absolute top-0 right-0 mt-[24px] mr-[24px]">
        <div className="flex items-center md:gap-1">
          <span className="text-[12px] text-[var(--text-color-2)] md:text-[16px]">
            {format(parseISO(post.createdAt), 'yy.MM.dd')}
          </span>

          <button
            onClick={handleToggleBookmark}
            className="ml-[0px] text-[14px]"
          >
            <AiFillStar
              size={22}
              className={
                'ml-[0px] cursor-pointer transition-colors ' +
                (isBookmarked ? 'text-[#FFD600]' : 'text-gray-400') +
                ' md:ml-1'
              }
            />
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[20px] font-bold md:text-[24px]">
              {post.title}
            </div>
            <div className="mt-1 text-[18px] text-[var(--text-color-white)]">
              {post.content}
              {post.category}
              {post.challengeCategory}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          {canScrollPrev && (
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="absolute top-1/2 left-[-24px] z-10 -translate-y-1/2 md:left-[-32px]"
              aria-label="이전"
            >
              <FaChevronLeft
                size={28}
                style={{ color: 'var(--main-color-2)' }}
              />
            </button>
          )}
          {canScrollNext && (
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="absolute top-1/2 right-[-24px] z-10 -translate-y-1/2 md:right-[-32px]"
              aria-label="다음"
            >
              <FaChevronRight
                size={28}
                style={{ color: 'var(--main-color-2)' }}
              />
            </button>
          )}

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6 px-1">
              {post.imageUrls.map((img, idx) => (
                <div
                  key={idx}
                  className="flex h-[200px] w-[150px] flex-shrink-0 items-center justify-center rounded-xl bg-gray-200"
                >
                  <Image
                    src={img}
                    alt={`이미지${idx + 1}`}
                    width={130}
                    height={230}
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleLike}
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[var(--point-color-1)] md:text-[16px]"
              aria-label="좋아요"
            >
              <FaHeart
                size={17}
                className={
                  'transition-colors ' +
                  (isLiked ? 'text-[var(--point-color-2)]' : 'text-gray-400')
                }
              />
              {likeCount}
            </button>

            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[var(--main-color-2)] transition hover:text-[var(--main-color-1)] md:text-[16px]"
              aria-label="댓글"
              onClick={() => setCommentsOpen((open) => !open)}
            >
              <FaRegCommentDots size={16} /> {commentCount}
            </button>
          </div>

          {isMine && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(post.postId)}
                className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--main-color-2)] md:text-[16px]"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--point-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--point-color-2)] md:text-[16px]"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        {commentsOpen && (
          <CommentList
            postId={post.postId}
            myMemberId={myMemberId}
            onAddComment={() => setCommentCount((prev) => prev + 1)}
            onDeleteComment={() =>
              setCommentCount((prev) => Math.max(prev - 1, 0))
            }
          />
        )}
      </div>
    </div>
  );
}
