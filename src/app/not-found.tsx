import Image from 'next/image';
import Link from 'next/link';
import error from '../assets/404.png';

export default function NotFound() {
  return (
    <div className="mx-auto mt-[-30px] flex h-screen flex-col items-center justify-center">
      {/* 이미지 */}
      <div className="relative mb-[10px] aspect-[4/3] w-[300px] max-w-full md:w-[900px]">
        <Image src={error} alt="에러 이미지" fill className="object-contain" />
      </div>

      <div>
        <p className="tex-[16px] m-[10px] md:text-[32px]">
          페이지를 찾을 수 없어요!
        </p>
      </div>
      {/* 버튼 */}
      <Link href="/">
        <button className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-6 py-3 text-[15px] font-semibold shadow-[var(--shadow-color)] transition duration-300 ease-in-out hover:scale-105 hover:bg-[var(--main-color-3)] active:scale-95 dark:text-[#2b2e34]">
          홈으로 돌아가기
        </button>
      </Link>
    </div>
  );
}
