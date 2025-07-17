'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../login/SignupButton';
import {
  signUp,
  SignUpPayload,
  checkNickname,
  sendEmailVerification,
  verifyEmailCode,
} from '@/services/authService';
import toast from 'react-hot-toast';

export default function SignupBox() {
  const router = useRouter();

  const [realName, setRealName] = useState('');
  const [realNameError, setRealNameError] = useState('');

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');

  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState('');

  const [loading, setLoading] = useState(false);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (pwd: string): boolean =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/.test(
      pwd,
    );

  function formatPhoneNumber(value: string) {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  }

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
    // 이름 검사
    if (realName.trim().length < 1) {
      setRealNameError('이름을 입력해주세요');
      valid = false;
    } else {
      setRealNameError('');
    }
    // 닉네임 검사
    if (nickname.trim().length < 2 || nickname.trim().length > 6) {
      setNicknameError('2자 이상 6자 이하로 입력해주세요');
      valid = false;
    } else {
      setNicknameError('');
    }

    // 전화번호 검사
    if (!/^\d{10,11}$/.test(phoneNumber.trim())) {
      setPhoneNumberError('전화번호는 숫자만 10~11자리로 입력해주세요');
      valid = false;
    } else {
      setPhoneNumberError('');
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

    // 이메일 인증 여부 검사
    if (!isEmailVerified) {
      setEmailError('이메일 인증을 완료해주세요');
      valid = false;
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

    // TODO: payload 추후에 수정해야함 전화번호,추천코드 등등..
    try {
      setLoading(true);
      const payload: SignUpPayload = { name: nickname, email, password };

      const { message } = await signUp(payload);

      toast.success(message);
      router.push('/login');
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 이메일전송
  const handleSendEmail = async () => {
    setEmailSuccess('');
    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
      return;
    }

    try {
      const res = await sendEmailVerification(email);
      toast.success(res.data.message);
      setEmailError('');
      setEmailSuccess(res.data.message);
      setIsCodeSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '이메일 전송 실패';
      setEmailSuccess('');
      setEmailError(msg);
      toast.error(msg);
    }
  };

  // 이메일인증코드검증
  const handleVerifyEmail = async () => {
    setCodeSuccess('');
    if (!verificationCode.trim()) {
      setCodeError('코드를 입력해주세요');
      return;
    }
    try {
      const res = await verifyEmailCode({ email, code: verificationCode });
      toast.success(res.data.message);
      setCodeError('');
      setCodeSuccess(res.data.message);
      setIsEmailVerified(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '인증 실패';
      setCodeSuccess('');
      setCodeError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex h-auto w-[270px] flex-col gap-[5px] rounded-[20px] bg-[var(--background)] p-8 pt-[50px] pb-[50px] md:h-auto md:w-[500px]">
      {/* 이름 입력 */}
      <div className="flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이름
        </p>
        <input
          type="text"
          value={realName}
          onChange={(e) => {
            setRealName(e.target.value);
            if (realNameError) setRealNameError('');
          }}
          placeholder="실명을 입력해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            realNameError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {realNameError || '\u00A0'}
        </p>
      </div>
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

      {/* 전화번호 입력 */}
      <div className="flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          전화번호
        </p>
        <input
          inputMode="numeric"
          type="tel"
          value={formatPhoneNumber(phoneNumber)}
          onChange={(e) => {
            const raw = e.target.value;
            const onlyDigits = raw.replace(/\D/g, '');
            setPhoneNumber(onlyDigits);
            if (phoneNumberError) setPhoneNumberError('');
          }}
          placeholder="전화번호를 입력해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-[var(--white-color)] px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
        <p
          className={`min-h-[12px] text-[12px] ${
            phoneNumberError ? 'text-[var(--point-color-2)]' : 'invisible'
          }`}
        >
          {phoneNumberError || '\u00A0'}
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
              emailError
                ? 'text-[var(--point-color-2)]'
                : emailSuccess
                  ? 'text-green-500'
                  : 'invisible'
            }`}
          >
            {emailError || emailSuccess || '\u00A0'}
          </p>

          <button
            type="button"
            className="cursor-pointer text-[12px] font-medium text-[var(--text-color)] hover:underline"
            onClick={handleSendEmail}
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
                className={`text-[12px] ${
                  codeError
                    ? 'text-[var(--point-color-2)]'
                    : codeSuccess
                      ? 'text-green-500'
                      : 'invisible'
                }`}
              >
                {codeError || codeSuccess || '\u00A0'}
              </p>
              <button
                type="button"
                className="h-[35px] cursor-pointer rounded-[10px] text-[12px] font-medium text-[var(--text-color)] hover:underline"
                onClick={handleVerifyEmail}
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
          {/* <p
            className={`min-h-[12px] text-[12px] ${confirmPwdError ? 'text-[var(--point-color-2)]' : 'invisible'}`}
          >
            {confirmPwdError || '\u00A0'}
          </p> */}
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
