'use client';
import Button from './SignupButton';

export default function LoginBox() {
  return (
    <div className="flex h-[650px] w-[500px] flex-col gap-4 rounded-[20px] bg-[var(--background)] p-8 pt-[80px]">
      <p className="mb-[10px] self-center text-[24px] font-semibold">
        <span className="text-[var(--main-color-3)]">티태</span>에 오신 것을
        환영합니다!
      </p>

      <div className="mb-[10px] flex w-[300px] flex-col items-start gap-1 self-center">
        <p className="text-[20px] font-semibold text-[var(--main-color-3)]">
          이메일
        </p>
        <input
          type="email"
          placeholder="아이디를 입력하세요"
          className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      <div className="flex w-[300px] flex-col items-start gap-1 self-center">
        <p className="text-[20px] font-semibold text-[var(--main-color-3)]">
          비밀번호
        </p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      <div className="mt-4 mb-[15px] flex flex-col gap-[30px] self-center">
        <Button className="h-[35px] w-[300px] rounded-[10px] bg-[var(--main-color-1)] text-[20px] font-semibold hover:bg-[var(--main-color-2)]">
          로그인 하기
        </Button>
        <Button className="h-[35px] w-[300px] bg-[#FFFFFF] font-semibold">
          구글로 로그인 하기
        </Button>
        <Button className="h-[35px] w-[300px] bg-[#FEE500] font-semibold">
          카카오톡으로 로그인 하기
        </Button>
      </div>
      <div className="flex flex-col">
        <p className="self-center text-[18px] font-semibold">
          아직 계정이 없으신가요?
        </p>
        <p className="cursor-pointer self-center text-[18px] font-semibold text-[var(--main-color-3)]">
          회원가입 하러 가기
        </p>
      </div>
    </div>
  );
}
