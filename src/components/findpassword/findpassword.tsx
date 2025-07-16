'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { findPassword } from '@/services/authService'; // ← API 함수 임포트

export default function FindPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFindPassword = async () => {
    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요');
      return;
    }

    setEmailError('');
    setLoading(true);

    try {
      const result = await findPassword({ email });
      toast.success(result.message); // "비밀번호 찾기 메일이 발송되었습니다."
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : '요청 중 오류가 발생했습니다.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 overflow-y-auto rounded-[20px] bg-[var(--background)] p-8 pt-[80px] md:h-auto md:w-[500px] md:overflow-hidden">
      <p className="mb-[10px] self-center text-[20px] font-semibold md:text-[24px]">
        <span className="text-[var(--main-color-3)]">비밀번호</span> 찾기
      </p>

      {/* 이메일 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            emailError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {emailError || '\u00A0'}
        </p>
      </div>

      {/* 버튼 */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          className={`h-[35px] w-[195px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold text-white hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px] ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleFindPassword}
          disabled={loading}
        >
          {loading ? '요청 중...' : '비밀번호 찾기'}
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
