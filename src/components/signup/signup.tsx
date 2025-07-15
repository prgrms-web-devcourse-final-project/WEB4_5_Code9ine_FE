'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../login/SignupButton';
import { signUp, SignUpPayload, checkNickname } from '@/services/authService';

export default function SignupBox() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');

  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState('');

  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (pwd: string): boolean =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/.test(
      pwd,
    );

  //닉네임 중복검사 로직
  useEffect(() => {
    if (nickname.trim().length < 2) {
      setNicknameError('');
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const { available } = await checkNickname({ nickname });
        setNicknameError(
          available
            ? '사용 가능한 닉네임입니다.'
            : '이미 사용 중인 닉네임입니다.',
        );
      } catch {
        setNicknameError('닉네임 확인에 실패했습니다.');
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [nickname]);

  //가입하기 버튼 함수
  const handleSignup = async () => {
    let valid = true;
    setServerError('');

    // 닉네임 검사
    if (nickname.trim().length < 2 || nickname.trim().length > 6) {
      setNicknameError('2자 이상 6자 이하로 입력해주세요');
      valid = false;
    } else {
      setNicknameError('');
    }

    // 이메일 검사
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
      valid = false;
    } else {
      setEmailError('');
    }

    // 비밀번호 검사
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('비밀번호는 8~16자, 대문자·특수문자 포함');
      valid = false;
    } else {
      setPasswordError('');
    }

    // 비밀번호 확인 검사
    if (confirmPwd !== password) {
      setConfirmPwdError('비밀번호가 일치하지 않습니다');
      valid = false;
    } else {
      setConfirmPwdError('');
    }

    // 약관 동의 검사
    if (!agree) {
      setAgreeError('약관에 동의해주세요');
      valid = false;
    } else {
      setAgreeError('');
    }

    if (!valid) return;

    try {
      setLoading(true);
      const payload: SignUpPayload = { name: nickname, email, password };
      await signUp(payload);
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError('알 수 없는 오류가 발생했습니다');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto w-[270px] flex-col gap-[5px] rounded-[20px] bg-[var(--background)] p-8 pt-[50px] pb-[50px] md:h-auto md:w-[500px]">
      {/* 닉네임 */}
      <div className="flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          닉네임
        </p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            if (nicknameError) setNicknameError('');
          }}
          placeholder="2자 이상 6자 이하"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
          maxLength={6}
        />

        <p
          className={`min-h-[12px] text-[12px] ${
            nicknameError
              ? nicknameError === '사용 가능한 닉네임입니다.'
                ? 'text-green-500'
                : 'text-[var(--point-color-2)]'
              : 'invisible'
          } `}
        >
          {nicknameError || '\u00A0'}
        </p>
      </div>

      {/* 이메일 */}
      <div className="flex w-full flex-col items-start self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          placeholder="example@gmail.com"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <div className="mt-1 flex w-full items-center justify-between">
          <p
            className={`text-[12px] ${
              emailError ? 'text-[var(--point-color-2)]' : 'invisible'
            }`}
          >
            {emailError || '\u00A0'}
          </p>
          <button
            type="button"
            className="cursor-pointer text-[12px] font-medium text-[var(--text-color)] hover:underline"
            onClick={() => setIsCodeSent(true)}
          >
            인증번호 받기
          </button>
        </div>
        {/* 인증번호 입력 & 확인 버튼 (API 없이 토글만) */}
        {isCodeSent && (
          <>
            <div className="mt-2 flex w-full items-center gap-2">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  if (codeError) setCodeError('');
                }}
                placeholder="인증번호 입력"
                className="h-[35px] flex-1 rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <p
                className={`text-[12px] ${codeError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
              >
                {codeError || '\u00A0'}
              </p>
              <button
                type="button"
                className="h-[35px] cursor-pointer rounded-[10px] text-[12px] font-medium text-[var(--text-color)] hover:underline"
                onClick={() => {
                  // 여기서 실제 검증 로직 대신 토글만 할 수도 있고
                  if (!verificationCode) {
                    setCodeError('코드를 입력해주세요');
                  } else {
                    // 검증 성공 처리 (예: 버튼 비활성화)
                    setCodeError('');
                    // setIsCodeSent(false) // 원하면 다시 숨기기
                  }
                }}
              >
                인증하기
              </button>
            </div>
          </>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col items-start self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
          }}
          placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <p
          className={`min-h-[12px] text-[12px] ${passwordError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
        >
          {passwordError || '\u00A0'}
        </p>
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col items-start self-center md:w-[300px]">
        <p className="font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호 확인
        </p>
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => {
            setConfirmPwd(e.target.value);
            if (confirmPwdError) setConfirmPwdError('');
          }}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <p
          className={`min-h-[12px] text-[12px] ${confirmPwdError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
        >
          {confirmPwdError || '\u00A0'}
        </p>
      </div>

      {/* 친구초대 */}
      <div className="flex flex-col items-start self-center md:w-[300px]">
        <p className="font-semibold text-[var(--main-color-3)] md:text-[20px]">
          추천인
        </p>
        <input
          type="text"
          placeholder="추천인 코드를 입력해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <div className="flex w-full items-center justify-between">
          {/* TODO:추천인 api확인시 에러메시지 구현 */}
          <p
            className={`min-h-[12px] text-[12px] ${confirmPwdError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
          >
            {confirmPwdError || '\u00A0'}
          </p>
          <button
            type="button"
            className="h-[35px] cursor-pointer rounded-[10px] text-[12px] font-medium text-[var(--text-color)] hover:underline"
            onClick={() => {
              //TODO:추천인 확인로직 구현
            }}
          >
            추천인 코드 확인
          </button>
        </div>
      </div>

      {/* 이용약관 */}
      <div className="mb-[5px] flex h-[100px] self-center overflow-auto rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] p-2 md:w-[300px]">
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
          id="agree"
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            if (agreeError) setAgreeError('');
          }}
          className="h-[16px] w-[16px] rounded border-[var(--main-color-1)] focus:ring-[var(--main-color-2)]"
        />
        <label htmlFor="agree" className="ml-2 text-[14px]">
          이용약관에 동의합니다.
        </label>
        <p
          className={`ml-2 min-h-[12px] text-[12px] ${agreeError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
        >
          {agreeError || '\u00A0'}
        </p>
      </div>

      {/* 서버 에러 */}
      {serverError && (
        <p className="mt-2 self-center text-[12px] text-[var(--point-color-2)]">
          {serverError}
        </p>
      )}

      {/* 가입하기 버튼 */}
      <div className="mt-2 flex w-full self-center md:w-[300px]">
        <Button
          onClick={handleSignup}
          disabled={loading}
          className={`h-[35px] w-full rounded-[10px] bg-[var(--main-color-1)] text-[20px] font-semibold hover:bg-[var(--main-color-2)] ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? '가입 중...' : '가입하기'}
        </Button>
      </div>
    </div>
  );
}
