'use client';
import { useRouter } from 'next/navigation';

export default function FindIdBox() {
  const router = useRouter();

  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 overflow-y-auto rounded-[20px] bg-[var(--background)] p-8 pt-[80px] md:h-auto md:w-[500px] md:overflow-hidden">
      <p className="mb-[10px] self-center text-[20px] font-semibold md:text-[24px]">
        <span className="text-[var(--main-color-3)]">아이디</span> 찾기
      </p>

      {/* 이름 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이름
        </p>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 전화번호 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          전화번호
        </p>
        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 버튼 */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          className="h-[35px] w-[195px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px]"
          onClick={() => {}}
        >
          아이디 찾기
        </button>
        <button
          className="cursor-pointer text-[14px] font-semibold text-[var(--main-color-3)] md:text-[18px]"
          onClick={() => router.push('/login')}
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
