'use client';
import DefaultProfile from './DefaultProfile';
// import Title from './Title';
import ProgressBar from '../common/ProgressBar';
import Button from './Button';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { UserData } from '@/types/userType';
import { getMyPage } from '@/api/getMyPage';
import Modal from '../common/Modal';

export default function Profile({
  isPersonal = false,
}: {
  isPersonal?: boolean;
}) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  useEffect(() => {
    getMyPage()
      .then((data) => {
        console.log('성공:', data);
        setUserData(data);
        console.log(userData);
      })
      .catch((err) => console.log('마이페이지 에러', err));
  }, []);

  // if (!userData) return <div>loading</div>;
  return (
    <>
      <div className="my-[20px] flex w-full flex-col items-center justify-center">
        {userData ? (
          <>
            <DefaultProfile />
            <p className="mt-[10px] text-[20px] font-semibold text-[var(--main-color-3)]">
              {userData.name}{' '}
              <span className="text-[16px] font-normal text-[var(--gray-color-2)]">
                {userData.level}
              </span>{' '}
            </p>
            <p className="mt-[5px] mb-[7px] text-[16px] font-semibold">
              절약왕
            </p>
            <span className="ml-[120px] text-[12px] text-[var(--gray-color-2)]">
              다음 레벨까지
            </span>
            <ProgressBar
              completed={70}
              width="200px"
              height="20px"
              bgColor="var(--main-color-3)"
              baseBgColor="var(--white-color)"
              labelVisible={true}
            />
          </>
        ) : (
          <p>불러오는 중</p>
        )}

        {!isPersonal && (
          <div className="mt-[10px] flex items-center gap-[10px] text-[16px]">
            <Button
              button={
                <>
                  <button
                    onClick={() => setIsEditProfile(true)}
                    className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-2)] dark:text-[#2b2e34]"
                  >
                    프로필 수정하기
                  </button>
                </>
              }
            />
            <Button
              button={
                <>
                  <button
                    onClick={() => setShowCopyModal(true)}
                    className="h-[40px] w-[150px] cursor-pointer rounded-[10px] bg-[var(--main-color-1)] hover:bg-[var(--main-color-2)] dark:text-[#2b2e34]"
                  >
                    내 초대 코드 복사
                  </button>
                </>
              }
            />
          </div>
        )}
        {isEditProfile && (
          <EditProfile onClose={() => setIsEditProfile(false)}></EditProfile>
        )}

        {showCopyModal && (
          <Modal
            title="초대 코드가 복사되었어요!"
            buttons={
              <button
                onClick={() => setShowCopyModal(false)}
                className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-4 py-1 hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]"
              >
                확인
              </button>
            }
          />
        )}
      </div>
    </>
  );
}
