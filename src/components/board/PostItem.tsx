'use client';

import { format, parseISO } from 'date-fns';
import { BsStar, BsStarFill } from 'react-icons/bs';
import {
  FaHeart,
  FaRegCommentDots,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
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
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../common/Modal';

interface PostItemProps {
  post: PostRes;
  onDelete?: (postId: number) => void;
  onEdit?: (postId: number) => void;
}

const challengeCategoryMap: Record<string, string> = {
  NO_MONEY: '제로 마스터',
  KIND_CONSUMER: '착한 소비러',
  DETECTIVE: '숨.맛.탐',
  MASTER: '노노카페',
  COOK_KING: '냉털 요리왕',
};

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const queryClient = useQueryClient();

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
      toast.success('좋아요에 성공했어요');
    } catch (err) {
      console.error(err);
      toast.error('좋아요에 실패했어요');

      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const handleToggleBookmark = async () => {
    const previousState = isBookmarked;
    setIsBookmarked((prev) => !prev);

    try {
      await boardApi.toggleBookmark(post.postId);

      // 캐시 업데이트
      queryClient.setQueryData(
        ['myThreads'],
        (oldData: { pages?: { data: PostRes[] }[] } | undefined) => {
          if (!oldData?.pages) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((item) =>
                item.postId === post.postId
                  ? { ...item, isBookmarked: !previousState }
                  : item,
              ),
            })),
          };
        },
      );

      // 찜한 글 목록 업데이트
      if (previousState === true) {
        // 북마크 해제 시 찜한 글 목록에서 제거
        toast.success('북마크가 해제되었어요');
        queryClient.setQueryData(
          ['saveThreads'],
          (oldData: { data?: PostRes[] } | undefined) => {
            if (!oldData?.data) return oldData;
            return {
              ...oldData,
              data: oldData.data.filter(
                (item: PostRes) => item.postId !== post.postId,
              ),
            };
          },
        );
      } else {
        toast.success('북마크에 추가되었어요!');
        queryClient.invalidateQueries({ queryKey: ['saveThreads'] });
      }
    } catch (err) {
      console.error(err);
      toast.error('북마크에 실패했어요');
      setIsBookmarked(previousState);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    // if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await boardApi.deletePost(post.postId);
      toast.success('게시글이 삭제되었어요!');
      onDelete?.(post.postId);
    } catch (err) {
      console.error(err);
      toast.error('게시글 삭제에 실패했어요');
    } finally {
      setShowDeleteModal(false);
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
          <div className="ml-[8px] text-center text-[18px] leading-none md:mt-[10px] md:ml-[0px] md:text-[20px]">
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
            {isBookmarked ? (
              <BsStarFill
                strokeWidth={0.5}
                size={18}
                className="ml-[0px] translate-y-[-1px] cursor-pointer text-[#FFD600] transition-colors hover:text-[#FFE680] md:ml-1"
              />
            ) : (
              <BsStar
                stroke="currentColor"
                strokeWidth={0.5}
                size={18}
                className="ml-[0px] translate-y-[-1px] cursor-pointer text-[#FFD600] transition-colors hover:text-[#FFE680] md:ml-1"
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-[20px] font-bold md:text-[24px]">
                {post.title}
              </div>
              {post.category === 'CHALLENGE' && post.challengeCategory && (
                <span className="text-[14px] text-[var(--main-color-2)] md:text-[16px]">
                  {challengeCategoryMap[post.challengeCategory]}
                </span>
              )}
            </div>

            <div className="mt-1 text-[18px] text-[var(--text-color-white)]">
              {post.content}
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
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[var(--point-color-2)] transition-colors hover:text-[var(--point-color-1)] md:text-[16px]"
              aria-label="좋아요"
            >
              {isLiked ? (
                <FaHeart size={17} className="transition-colors" />
              ) : (
                <FaRegHeart size={17} className="transition-colors" />
              )}

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
                onClick={handleDeleteClick}
                className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--point-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--point-color-2)] md:text-[16px]"
              >
                삭제
              </button>
            </div>
          )}
          {showDeleteModal && (
            <Modal
              title="정말 삭제하시겠어요..?"
              description="삭제 후에는 되돌릴 수 없어요"
              buttons={
                <>
                  <button
                    onClick={handleDelete}
                    className="cursor-pointer rounded-[10px] bg-[var(--point-color-1)] px-4 py-1 hover:bg-[var(--point-color-2)]"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-4 py-1 hover:bg-[var(--main-color-2)]"
                  >
                    취소
                  </button>
                </>
              }
              onClose={() => setShowDeleteModal(false)}
            />
          )}
        </div>
        {commentsOpen && (
          <CommentList
            postId={post.postId}
            myMemberId={myMemberId}
            skeletonCount={commentCount}
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
