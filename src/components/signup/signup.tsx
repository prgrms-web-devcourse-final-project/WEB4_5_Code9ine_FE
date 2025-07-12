'use client';
import Button from '../login/SignupButton';

export default function SignupBox() {
  return (
    <div className="flex h-auto w-[270px] flex-col gap-4 rounded-[20px] bg-[var(--background)] p-8 pt-[50px] pb-[50px] md:h-[650px] md:w-[500px]">
      {/* 닉네임 */}
      <div className="mb-[10px] flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          닉네임
        </p>
        <div className="flex w-full min-w-0 items-center gap-2">
          <input
            type="text"
            placeholder="2자 이상 6자 이하"
            className="h-[35px] min-w-0 flex-1 rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none md:w-[218px] md:flex-none"
            maxLength={6}
            minLength={2}
          />
          <Button className="h-[35px] w-[80px] bg-[var(--main-color-1)] text-[14px] font-semibold hover:bg-[var(--main-color-2)] md:w-[100px]">
            중복확인
          </Button>
        </div>
      </div>

      {/* 이메일 */}
      <div className="mb-[10px] flex w-full flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          이메일
        </p>
        <div className="flex w-full min-w-0 items-center gap-2">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="h-[35px] min-w-0 flex-1 rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none md:w-[218px] md:flex-none"
          />
          <Button className="h-[35px] w-[80px] bg-[var(--main-color-1)] text-[14px] font-semibold hover:bg-[var(--main-color-2)] md:w-[100px]">
            인증하기
          </Button>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className="mb-[10px] flex flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="text-[16px] font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호
        </p>
        <input
          type="password"
          placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className="mb-[10px] flex flex-col items-start gap-1 self-center md:w-[300px]">
        <p className="font-semibold text-[var(--main-color-3)] md:text-[20px]">
          비밀번호 확인
        </p>
        <input
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          className="h-[35px] w-full rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 placeholder:text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
        />
      </div>

      {/* 이용약관 */}
      <div className="flex h-[100px] self-center overflow-auto rounded-[10px] border-2 border-[var(--main-color-1)] bg-white p-2 md:w-[300px]">
        <p className="text-[12px] leading-relaxed">
          제 1 조 (목적) 본 약관은 (주)티태(이하 “회사”라 합니다)이 운영하는
          웹사이트 ‘티태’ (www.urbanlaunderette.com) (이하 “웹사이트”라
          합니다)에서 제공하는 온라인 서비스(이하 “서비스”라 한다)를 이용함에
          있어 사이버몰과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </p>
      </div>

      {/* 약관 동의 */}
      <div className="flex items-center self-center md:w-[300px]">
        <input
          type="checkbox"
          id="agree"
          className="h-[16px] w-[16px] rounded border-[var(--main-color-1)] focus:ring-[var(--main-color-2)]"
        />
        <label htmlFor="agree" className="ml-2 text-[14px]">
          이용약관에 동의합니다.
        </label>
      </div>

      {/* 가입하기 버튼 */}
      <div className="mt-2 flex self-center">
        <Button className="h-[35px] rounded-[10px] bg-[var(--main-color-1)] text-[20px] font-semibold hover:bg-[var(--main-color-2)] md:w-[300px]">
          가입하기
        </Button>
      </div>
    </div>
  );
}
