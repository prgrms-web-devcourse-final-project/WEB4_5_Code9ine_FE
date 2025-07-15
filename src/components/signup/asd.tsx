'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../login/SignupButton';
import { signUp, SignUpPayload } from '@/services/authService';

export default function SignupBox() {
  const router = useRouter();
  const [name, setName] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [confirmPwd, setConfirmPwd] = useState(''); // 비밀번호 확인
  const [agree, setAgree] = useState(false); // 약관 동의
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2 || name.length > 6) {
      setError('닉네임은 2~6자여야 합니다.');
      return;
    }
    if (password !== confirmPwd) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agree) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    setError(null);
    setLoading(true);

    const payload: SignUpPayload = { name, email, password };
    try {
      const data = await signUp(payload);
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-auto w-[270px] flex-col gap-4 rounded-[20px] bg-[var(--background)] p-8 pt-[50px] pb-[50px] md:h-[650px] md:w-[500px]"
    >
      {/* 에러 메시지 */}
      {error && (
        <p className="mb-2 text-center text-[var(--point-color-2)]">{error}</p>
      )}

      {/* 닉네임 */}
      <div className="mb-[10px] flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          닉네임
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="2자 이상 6자 이하"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
          maxLength={6}
          minLength={2}
        />
      </div>

      {/* 이메일 */}
      <div className="mb-4 flex w-full flex-col items-start self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 비밀번호 */}
      <div className="mb-[10px] flex flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="mb-[10px] flex flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호 확인
        </p>
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 약관 동의 */}
      <div className="flex h-[100px] self-center overflow-auto rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] p-2 md:w-[300px]">
        <p className="text-[12px] leading-relaxed">
          제 1 조 (목적) 본 약관은 (주)티태(이하 “회사”라 합니다)이 운영하는
          웹사이트 ‘티태’ (www.urbanlaunderette.com) (이하 “웹사이트”라
          합니다)에서 제공하는 온라인 서비스(이하 “서비스”라 한다)를 이용함에
          있어 사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </p>
      </div>
      <div className="flex items-center self-center md:w-[300px]">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          id="agree"
          className="h-[16px] w-[16px] rounded border-[var(--main-color-1)] focus:ring-[var(--main-color-2)]"
        />
        <label htmlFor="agree" className="ml-2 text-[14px]">
          이용약관에 동의합니다.
        </label>
      </div>

      {/* 가입하기 버튼 */}
      <div className="mt-2 flex self-center">
        <Button
          type="submit"
          disabled={loading}
          className="h-[35px] rounded-[10px] bg-[var(--main-color-1)] text-[20px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px]"
        >
          {loading ? '가입 중...' : '가입하기'}
        </Button>
      </div>
    </form>
  );
}
