'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { completeSocialSignup } from '@/services/authService';
import Button from '@/components/login/SignupButton';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLogin } = useAuthStore();

  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';
  const profileImage = searchParams.get('profileImage') || '';

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let valid = true;

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력하세요');
      valid = false;
    } else {
      setNicknameError('');
    }

    if (!phoneNumber.trim()) {
      setPhoneError('전화번호를 입력하세요');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      await completeSocialSignup({
        email,
        name,
        nickname,
        phoneNumber,
        profileImage,
      });

      toast.success('소셜 로그인 완료!');
      setIsLogin(true);
      router.push('/login/googleauth');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '오류가 발생했습니다.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 overflow-y-auto rounded-[20px] bg-[var(--background)] p-8 md:h-auto md:w-[500px] md:overflow-hidden">
      <p className="mb-[10px] self-center text-[20px] font-semibold md:text-[24px]">
        추가 정보를 입력하고 <br className="block md:hidden" />
        <span className="text-[var(--main-color-3)]">티태</span>에 로그인하세요!
      </p>

      {/* 닉네임 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          닉네임
        </p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            nicknameError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {nicknameError || '\u00A0'}
        </p>
      </div>

      {/* 전화번호 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          전화번호
        </p>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호를 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            phoneError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {phoneError || '\u00A0'}
        </p>
      </div>

      {/* 버튼 그룹 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-4 mb-[15px] flex flex-col gap-[20px] self-center md:gap-[30px]"
      >
        <Button
          type="submit"
          disabled={loading}
          className={`h-[35px] w-[195px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px] ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? '처리 중...' : '확인'}
        </Button>
      </form>
    </div>
  );
}
