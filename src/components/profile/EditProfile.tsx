'use client';
import { MdCancel, MdEdit } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Button from './Button';
import DefaultProfile from './DefaultProfile';
import { checkNickname } from '@/services/authService';
import toast from 'react-hot-toast';
import { changeInfo, deleteProfile } from '@/api/profile';
import Modal from '../common/Modal';
import { useRouter } from 'next/navigation';

export default function EditProfile({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (pwd: string): boolean =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/.test(
      pwd,
    );

  useEffect(() => {
    let isCancelled = false;

    if (nickname.trim().length < 2 || nickname.trim().length > 6) {
      setNicknameError('2~6자 닉네임을 입력하세요.');
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const { available } = await checkNickname({ nickname });

        if (!isCancelled) {
          setNicknameError(
            available
              ? '사용 가능한 닉네임입니다.'
              : '이미 사용 중인 닉네임입니다.',
          );
        }
      } catch {
        if (!isCancelled) {
          setNicknameError('닉네임 중복 확인 실패');
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(handler);
    };
  }, [nickname]);

  useEffect(() => {
    if (!password) {
      setPasswordError('');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('8~16자, 대문자와 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('사용 가능한 비밀번호입니다.');
    }
  }, [password]);

  useEffect(() => {
    if (!confirmPwd || !password) {
      setConfirmPwdError('');
      return;
    }

    if (password !== confirmPwd) {
      setConfirmPwdError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPwdError('비밀번호가 일치합니다.');
    }
  }, [password, confirmPwd]);

  const submitUserData = async () => {
    let valid = true;

    if (nickname.trim().length < 2 || nickname.trim().length > 6) {
      setNicknameError('2~6자 닉네임을 입력하세요.');
      valid = false;
    }

    if (!password) {
      setPasswordError('');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('8~16자, 대문자와 특수문자를 포함해야 합니다.');
      valid = false;
    } else {
      setPasswordError('사용 가능한 비밀번호입니다.');
    }

    if (password !== confirmPwd) {
      setConfirmPwdError('비밀번호가 일치하지 않습니다.');
      valid = false;
    } else {
      setConfirmPwdError('비밀번호가 일치합니다.');
    }

    if (!valid) return;

    // try {
    //   await updateProfile({ nickname, password });
    //   toast.success('프로필이 수정되었습니다.');
    //   onClose();
    // } catch {
    //   toast.error('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    // }
  };

  const submitHandler = async () => {
    try {
      await changeInfo(nickname, '', password);
      toast.success('수정 완료!');

      if (password) {
        router.push('/login');
      } else {
        onClose();
      }
    } catch (err) {
      console.log('프로필 정보 수정 실패', err);
      toast.error('수정 실패');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative h-[640px] w-[350px] items-center justify-center rounded-[10px] bg-[var(--white-color)] p-[25px] shadow-[var(--shadow-md)] select-none">
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitUserData();
            }}
          >
            <div className="mt-[20px] flex w-[300px] flex-col items-start gap-1 self-center">
              <label className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitUserData();
                  }
                }}
                placeholder="2 ~ 6자 이하로 입력해주세요."
                className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none dark:bg-[var(--white-color)]"
              />
              <div className="flex w-full justify-between">
                <p
                  className={`ml-[3px] text-[12px] ${nicknameError === '사용 가능한 닉네임입니다.' ? 'text-[var(--main-color-3)]' : 'text-[var(--point-color-2)]'}`}
                >
                  {nicknameError || '\u00A0'}
                </p>
                {/* <button className="mr-[3px] cursor-pointer text-[12px] text-[var(--gray-color-2)]">
                중복 확인
              </button> */}
              </div>
            </div>
            <div className="mt-[15px] flex w-[300px] flex-col items-start gap-1 self-center">
              <label className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
                비밀번호 변경
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitUserData();
                  }
                }}
                placeholder="8~16자 영어 대소문자, 특수문자를 포함해주세요."
                className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none dark:bg-[var(--white-color)]"
              />
              <div className="flex w-full justify-between">
                <p
                  className={`ml-[3px] text-[12px] ${passwordError === '사용 가능한 비밀번호입니다.' ? 'text-[var(--main-color-3)]' : 'text-[var(--point-color-2)]'}`}
                >
                  {passwordError || '\u00A0'}
                </p>
              </div>
            </div>
            <div className="mt-[15px] flex w-[300px] flex-col items-start gap-1 self-center">
              <p className="ml-[5px] text-[20px] font-semibold text-[var(--main-color-3)]">
                비밀번호 확인
              </p>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitUserData();
                  }
                }}
                placeholder="비밀번호를 한번 더 입력해 주세요."
                className="h-[35px] w-[300px] rounded-[10px] border-2 border-[var(--main-color-1)] bg-white px-3 text-[12px] focus:border-[var(--main-color-2)] focus:outline-none dark:bg-[var(--white-color)]"
              />
              <div className="flex w-full justify-between">
                <p
                  className={`ml-[3px] text-[12px] ${confirmPwdError === '비밀번호가 일치합니다.' ? 'text-[var(--main-color-3)]' : 'text-[var(--point-color-2)]'}`}
                >
                  {confirmPwdError || '\u00A0'}
                </p>
              </div>
            </div>

            <div className="mt-[30px] flex justify-between">
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="ml-[10px] cursor-pointer text-[12px] text-[var(--gray-color-2)]"
              >
                회원 탈퇴
              </button>

              {showConfirm && (
                <Modal
                  title="정말 탈퇴하시겠어요..?"
                  onClose={() => setShowConfirm(false)}
                  buttons={
                    <>
                      <button
                        // 회원 탈퇴
                        onClick={async () => {
                          try {
                            await deleteProfile();
                            toast.success('탈퇴 완료. 다음에 또 만나요..');
                            setShowConfirm(false);
                            onClose();
                          } catch {
                            toast.error('탈퇴 실패. 다시 시도해주세요.');
                          }
                        }}
                        className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-4 py-1 hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
                      >
                        네
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="cursor-pointer rounded-[10px] bg-[var(--point-color-1)] px-4 py-1 hover:bg-[var(--point-color-1)] dark:text-[#2b2e34]"
                      >
                        아니요
                      </button>
                    </>
                  }
                />
              )}

              <Button
                button={
                  <>
                    <button
                      onClick={submitHandler}
                      type="submit"
                      className="h-[35px] w-[80px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] text-[16px] font-semibold hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
                    >
                      수정 완료
                    </button>
                  </>
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
