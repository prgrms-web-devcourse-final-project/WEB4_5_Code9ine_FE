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

const images = [
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
  '/profileTest.png',
];

export default function PostItem() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <div className="flex items-start gap-6 rounded-[16px] bg-[var(--background-full)] p-6 text-[var(--text-color-white)] shadow">
      <div className="flex min-w-[90px] flex-col items-center">
        <Image
          src="/profileTest.png"
          alt="프로필"
          width={70}
          height={70}
          className="rounded-full border-2 border-[var(--main-color-2)]"
        />
        <div className="mt-2 text-[20px]">다람이</div>
        <div className="text-[16px] text-[var(--text-color-2)]">
          노노커피 마스터
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[24px] font-bold">다람이 다람이 다람아~!</div>
            <div className="mt-1 text-[18px] text-[var(--text-color-white)]">
              다람이 다람이 다람아~!
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[16px] text-[var(--text-color-2)]">
              25.07.10
            </span>
            <AiFillStar
              size={22}
              className="ml-1 cursor-pointer text-[#FFD600]"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <button
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            className="absolute top-1/2 left-[-32px] z-10 -translate-y-1/2"
            aria-label="이전"
          >
            <FaChevronLeft size={28} style={{ color: 'var(--main-color-2)' }} />
          </button>
          <button
            onClick={() => emblaApi && emblaApi.scrollNext()}
            className="absolute top-1/2 right-[-32px] z-10 -translate-y-1/2"
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
                    alt={`이미지${idx + 1}`}
                    width={130}
                    height={230}
                    className="h-full w-full rounded-xl object-cover"
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
              className="flex cursor-pointer items-center gap-1 text-[16px] text-[var(--point-color-1)]"
              aria-label="좋아요"
            >
              <FaHeart size={17} /> 35개
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[16px] text-[var(--main-color-2)] transition hover:text-[var(--main-color-1)]"
              aria-label="댓글"
              onClick={() => setCommentsOpen((open) => !open)}
            >
              <FaRegCommentDots size={16} /> 124개
            </button>
          </div>

          <div className="flex gap-2">
            <button className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[16px] transition-colors hover:bg-[var(--main-color-2)]">
              수정
            </button>
            <button className="h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--point-color-1)] text-[16px] transition-colors hover:bg-[var(--point-color-2)]">
              삭제
            </button>
          </div>
        </div>
        {commentsOpen && <CommentList />}
      </div>
    </div>
  );
}
