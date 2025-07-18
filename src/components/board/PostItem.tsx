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
import { useState } from 'react';
import CommentList from './CommentList';
import { PostRes } from '../../types/boardType';
import { boardApi } from '@/api/boardApi';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface PostItemProps {
  post: PostRes;
}

const images = [
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
];

export default function PostItem({ post }: PostItemProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [commentsOpen, setCommentsOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await boardApi.deletePost(post.postId);
      toast.success('게시글이 삭제되었어요!');
    } catch (err) {
      console.error(err);
      toast.error('게시글 삭제에 실패했어요');
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-3 rounded-[10px] bg-[var(--background)] p-6 text-[var(--text-color-white)] shadow md:flex-row md:gap-6">
      <Link
        href={`/profile/${post.memberId}`}
        className="flex min-w-[90px] flex-col flex-row items-center md:flex-col"
      >
        <Image
          src="/profileTest.png"
          //src=writerProfileImage
          alt="프로필"
          width={70}
          height={70}
          className="h-[30px] w-[30px] rounded-full border-2 border-[var(--main-color-2)] md:h-[70px] md:w-[70px]"
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
          <AiFillStar
            size={22}
            className="ml-[0px] cursor-pointer text-[#FFD600] md:ml-1"
          />
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
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <button
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            className="absolute top-1/2 left-[-24px] z-10 -translate-y-1/2 md:left-[-32px]"
            aria-label="이전"
          >
            <FaChevronLeft size={28} style={{ color: 'var(--main-color-2)' }} />
          </button>
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
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6 px-1">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex h-[200px] w-[150px] flex-shrink-0 items-center justify-center rounded-xl bg-gray-200"
                >
                  <Image
                    src={img}
                    // src = imageUrls
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
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[var(--point-color-1)] md:text-[16px]"
              aria-label="좋아요"
            >
              <FaHeart size={17} /> {post.likeCount}
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[var(--main-color-2)] transition hover:text-[var(--main-color-1)] md:text-[16px]"
              aria-label="댓글"
              onClick={() => setCommentsOpen((open) => !open)}
            >
              <FaRegCommentDots size={16} /> {post.commentCount}
            </button>
          </div>

          <div className="flex gap-2">
            <button className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--main-color-2)] md:text-[16px]">
              수정
            </button>
            <button
              onClick={handleDelete}
              className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--point-color-1)] text-[14px] text-black transition-colors hover:bg-[var(--point-color-2)] md:text-[16px]"
            >
              삭제
            </button>
          </div>
        </div>
        {commentsOpen && <CommentList postId={post.postId} />}
      </div>
    </div>
  );
}
