'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './SignupButton';
import { login, LoginPayload } from '@/services/authService';
import toast from 'react-hot-toast';
// import { useAccountData } from '@/stores/accountStore';
import { getGoogleLoginRedirect } from '@/services/authService';

export default function LoginBox() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // const { setIsLogin } = useAccountData();

  const handleLogin = async () => {
    let valid = true;
    // setServerError('');

    if (!email.trim()) {
      setEmailError('아이디를 입력해주세요');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      const payload: LoginPayload = { email, password };
      const { data, message } = await login(payload);

      // localStorage.setItem('accessToken', data.accessToken);
      console.log(data.accessToken);
      // setIsLogin(true);
      toast.success(message);

      router.push('/');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      // setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  //카카오로그인
  const handleKakaoLogin = () => {
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  // 구글로그인
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
    const scope = 'email profile';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 overflow-y-auto rounded-[20px] bg-[var(--background)] p-8 md:h-auto md:w-[500px] md:overflow-hidden">
      <p className="mb-[10px] self-center text-[20px] font-semibold md:text-[24px]">
        <span className="text-[var(--main-color-3)]">티태</span>에 오신 것을
        <br className="block md:hidden" />
        환영합니다!
      </p>

      {/* 서버 에러
      {serverError && (
        <p className="mb-2 text-center text-[var(--point-color-2)]">
          {serverError}
        </p>
      )} */}

      {/* 이메일 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디를 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            emailError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {emailError || '\u00A0'}
        </p>
      </div>

      {/* 비밀번호 입력 */}
      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            passwordError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {passwordError || '\u00A0'}
        </p>
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-4 mb-[15px] flex flex-col gap-[20px] self-center md:gap-[30px]">
        <Button
          onClick={handleLogin}
          disabled={loading}
          className={`h-[35px] w-[195px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px] ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? '로그인 중...' : '로그인 하기'}
        </Button>
        <Button
          onClick={getGoogleLoginRedirect}
          className="h-[35px] w-[195px] bg-[#FFFFFF] text-[16px] font-semibold md:w-[300px] md:text-[20px]"
        >
          구글로 로그인 하기
        </Button>
        <Button
          onClick={handleKakaoLogin}
          className="h-[35px] w-[195px] bg-[#FEE500] text-[16px] font-semibold md:w-[300px] md:text-[20px]"
        >
          카카오톡으로 로그인 하기
        </Button>
      </div>

      {/* 회원가입 링크 */}
      <div className="flex flex-col">
        <p className="self-center text-[14px] font-semibold md:text-[18px]">
          아직 계정이 없으신가요?
        </p>
        <p
          onClick={() => router.push('/signup')}
          className="cursor-pointer self-center text-[14px] font-semibold text-[var(--main-color-3)] md:text-[18px]"
        >
          회원가입 하러 가기
        </p>
      </div>
      {/* 아이디 비밀번호찾기 */}
      <div className="flex justify-center gap-4 self-center">
        <p
          onClick={() => router.push('/findid')}
          className="cursor-pointer text-[14px] font-semibold text-[var(--main-color-3)] md:text-[18px]"
        >
          아이디 찾기
        </p>
        <p
          onClick={() => router.push('/findpassword')}
          className="cursor-pointer text-[14px] font-semibold text-[var(--main-color-3)] md:text-[18px]"
        >
          비밀번호 찾기
        </p>
      </div>
    </div>
  );
}
