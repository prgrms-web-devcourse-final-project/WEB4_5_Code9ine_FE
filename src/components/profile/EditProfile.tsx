import { MdCancel, MdEdit } from 'react-icons/md';
import Button from './Button';
import DefaultProfile from './DefaultProfile';
export default function EditProfile({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative h-[600px] w-[350px] items-center justify-center rounded-[10px] bg-[var(--white-color)] p-[25px] shadow-[var(--shadow-md)] select-none">
          <MdCancel
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer text-[30px] text-[var(--gray-color-2)]"
          />
          <h1 className="p-[25px] text-center text-[20px] font-semibold text-[var(--main-color-3)]">
            정보 수정
          </h1>

          <div className="flex items-center justify-center">
            <div className="relative">
              <DefaultProfile />
              <button className="absolute right-0 bottom-0 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[var(--main-color-1)] hover:bg-[var(--main-color-3)]">
                <MdEdit className="flex items-center justify-center text-[30px] text-[var(--white-color)]" />
              </button>
            </div>
          </div>

          <div className="mt-[20px] flex w-[300px] flex-col items-start gap-1 self-center">
            <p className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
              닉네임
            </p>
            <input
              type="text"
              placeholder="2 ~ 6자 이하로 입력해주세요."
              className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
            />
            <div className="flex w-full justify-between">
              <p className="ml-[3px] text-[12px] text-[var(--main-color-3)]">
                사용 가능한 닉네임입니다.
              </p>
              {/* <button className="mr-[3px] cursor-pointer text-[12px] text-[var(--gray-color-2)]">
                중복 확인
              </button> */}
            </div>
          </div>
          <div className="mt-[10px] flex w-[300px] flex-col items-start gap-1 self-center">
            <p className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
              비밀번호 변경
            </p>
            <input
              type="password"
              placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요."
              className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
            />
            <div className="flex w-full justify-between">
              <p className="ml-[3px] text-[12px] text-[var(--main-color-3)]">
                사용 가능한 비밀번호입니다.
              </p>
            </div>
            {/* 불일치 */}
            {/* <input
              type="password"
              placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요."
              className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--point-color-1)] bg-white px-3 text-[12px] focus:outline-none"
            />
            <div className="flex w-full justify-between">
              <p className="ml-[3px] text-[12px] text-[var(--point-color-1)]">
                8자 이상 16자 이하 영어 대소문자와 특수문자를 포함해주세요.
              </p>
            </div> */}
          </div>
          <div className="mt-[10px] flex w-[300px] flex-col items-start gap-1 self-center">
            <p className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
              비밀번호 확인
            </p>
            <input
              type="password"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none"
            />
          </div>

          <div className="mt-[30px] flex justify-between">
            <button className="ml-[10px] cursor-pointer text-[12px] text-[var(--gray-color-2)]">
              회원 탈퇴
            </button>
            <Button
              button={
                <>
                  <button
                    onClick={onClose}
                    className="h-[35px] w-[80px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
                  >
                    수정 완료
                  </button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
