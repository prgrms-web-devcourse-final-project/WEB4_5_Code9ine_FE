import Image from 'next/image';
import React from 'react';
import boardUploadIcon from '../../assets/board_upload_image.svg';

export default function PostWriteForm() {
  return (
    <div className="flex w-full max-w-[724px] items-start gap-4 rounded-[10px] bg-[var(--white-color)] p-4 text-[20px] text-[var(--text-color-white)] shadow">
      <div className="flex max-w-[120px] min-w-[80px] flex-col items-center justify-center">
        <Image
          src="/profileTest.png"
          alt="프로필"
          width={70}
          height={70}
          className="rounded-full border-2 border-[var(--main-color-2)]"
        />
        <div className="mt-2 text-center text-[20px] font-normal">스펀지밥</div>
        <div className="text-center text-[16px] font-normal text-[var(--text-color-2)]">
          노노커피 마스터
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <input
          className="focus:border-[var(--main-color-2) h-[50px] w-full rounded-[10px] border border-[var(--main-color-1)] p-4 text-[24px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
          placeholder="제목을 입력해 주세요."
        />
        <div className="relative h-[140px] w-full">
          <textarea
            className="absolute inset-0 z-0 h-full w-full resize-none rounded-[10px] border border-[var(--main-color-1)] bg-white p-4 pr-[80px] text-[18px] placeholder:text-[var(--gray-color-2)] focus:border-[var(--main-color-2)] focus:outline-none"
            placeholder="내용을 입력해 주세요."
          />

          <Image
            src={boardUploadIcon}
            alt="이미지 업로드"
            width={24}
            height={24}
            className="absolute top-[10px] right-[10px] z-10 cursor-pointer opacity-70 hover:opacity-100"
          />
          <button className="absolute right-[10px] bottom-[10px] z-10 h-[28px] w-[58px] cursor-pointer rounded-[20px] bg-[var(--main-color-1)] text-[16px] transition-colors hover:bg-[var(--main-color-2)]">
            작성
          </button>
        </div>
      </div>
    </div>
  );
}
