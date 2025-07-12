'use client';
import Button from './SignupButton';

export default function LoginBox() {
  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 overflow-y-auto rounded-[20px] bg-[var(--background)] p-8 pt-[80px] md:h-[650px] md:w-[500px] md:overflow-hidden">
      <p className="mb-[10px] self-center text-[20px] font-semibold md:text-[24px]">
        <span className="text-[var(--main-color-3)]">티태</span>에 오신 것을
        <br className="block md:hidden" />
        환영합니다!
      </p>

      <div className="mb-[10px] flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <input
          type="email"
          placeholder="아이디를 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
      </div>

      <div className="flex w-[200px] flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호
        </p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="h-[35px] w-[200px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 focus:border-[var(--main-color-2)] focus:outline-none md:w-[300px]"
        />
      </div>

      <div className="mt-4 mb-[15px] flex flex-col gap-[20px] self-center md:gap-[30px]">
        <Button className="h-[35px] w-[195px] rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px] md:text-[20px]">
          로그인 하기
        </Button>
        <Button className="h-[35px] w-[195px] bg-[#FFFFFF] text-[16px] font-semibold md:w-[300px] md:text-[20px]">
          구글로 로그인 하기
        </Button>
        <Button className="h-[35px] w-[195px] bg-[#FEE500] text-[16px] font-semibold md:w-[300px] md:text-[20px]">
          카카오톡으로 로그인 하기
        </Button>
      </div>
      <div className="flex flex-col">
        <p className="self-center text-[14px] font-semibold md:text-[18px]">
          아직 계정이 없으신가요?
        </p>
        <p className="cursor-pointer self-center text-[14px] font-semibold text-[var(--main-color-3)] md:text-[18px]">
          회원가입 하러 가기
        </p>
      </div>
    </div>
  );
}
