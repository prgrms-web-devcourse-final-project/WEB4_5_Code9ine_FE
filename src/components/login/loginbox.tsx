'use client';
import Button from './SignupButton';

export default function LoginBox() {
  return (
    <div className="radius-[15px] flex h-[364px] w-[805px] flex-col gap-4 bg-[var(--green-color-2)] p-8">
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        className="h-[48px] w-[578px] rounded-[20px] bg-[var(--green-color-1)]"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="h-[48px] w-[578px] rounded-[20px] bg-[var(--green-color-1)]"
      />
      <Button className="h-[48px] w-[578px] rounded-[20px] bg-[#FFFFFF]">
        로그인
      </Button>

      <div className="mt-4 flex gap-2">
        <Button>티태 회원가입</Button>
        <Button className="bg-[#FEE500]">카카오 로그인</Button>
        <Button className="bg-[#FFFFFF]">구글 로그인</Button>
      </div>
    </div>
  );
}
