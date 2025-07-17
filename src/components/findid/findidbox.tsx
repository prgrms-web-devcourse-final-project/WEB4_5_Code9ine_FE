'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { findEmail } from '@/services/authService';
import toast from 'react-hot-toast';

export default function FindIdBox() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emails, setEmails] = useState<string[] | null>(null);
  const [error, setError] = useState('');

  // 전화번호 형식 포맷터
  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  };

  // 아이디(이메일) 찾기 요청
  const handleFindId = async () => {
    if (!name || !phoneNumber) {
      setError('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    try {
      const formatted = phoneNumber.replace(/-/g, '');

      // const res = await findEmail({ name, phoneNumber: formatted });
      const res = {
        emails: ['test@test.com', 'abcdef@test.com'],
      }; //임시 데이터
      setEmails(res.emails);
      setError('');
      toast.success('이메일을 찾았습니다.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '아이디 찾기 실패';
      toast.error(msg);
      setError(msg);
      setEmails(null);
    }
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          placeholder="전화번호를 입력하세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none"
          maxLength={13}
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-2 text-center text-[14px] text-[var(--point-color-2)]">
          {error}
        </p>
      )}

      {/* 결과 출력 */}
      {emails && (
        <div className="mt-2 flex flex-col items-center gap-1">
          <p className="text-[14px] text-[var(--text-color)]">가입된 이메일</p>
          {emails.map((email, i) => (
            <p key={i} className="text-[14px] text-[var(--text-color)]">
              {email}
            </p>
          ))}
        </div>
      )}

      {/* 버튼 */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          className="h-[35px] w-[195px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px]"
          onClick={handleFindId}
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
