import { AiFillStar } from 'react-icons/ai';
import { FaHeart, FaRegCommentDots } from 'react-icons/fa';
import Image from 'next/image';

export default function PostItem() {
  return (
    <div className="flex w-full max-w-[720px] items-center justify-center gap-6 rounded-[16px] bg-white p-6 shadow">
      {/* 프로필 영역 */}
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

      {/* 본문+상단 */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[24px] font-bold">
                다람이 다람이 다람아~!
              </span>
              {/* 즐겨찾기(별) */}
            </div>
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

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[16px] text-[var(--point-color-1)]"
              aria-label="좋아요"
            >
              <FaHeart size={17} />
              35개
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 text-[16px] text-[var(--main-color-2)] transition hover:text-[var(--main-color-1)]"
              aria-label="댓글"
            >
              <FaRegCommentDots size={16} />
              124개
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
      </div>
    </div>
  );
}
